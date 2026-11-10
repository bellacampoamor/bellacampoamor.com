// Contactformulier van bellacampoamor.com -> mail via Resend naar de winkel.
// De ontvanger staat vast (WEBSITE_TO), dus de functie is niet als open mailserver te gebruiken.
// Secrets: RESEND_API_KEY (verplicht), optioneel WEBSITE_FROM en WEBSITE_TO.
// Het domein in WEBSITE_FROM (standaard bellacampoamor.com) moet in Resend geverifieerd zijn.
import { createClient } from 'npm:@supabase/supabase-js@2'

const ALLOWED = ['https://bellacampoamor.com', 'https://www.bellacampoamor.com', 'https://bellacampoamor.github.io']
const FROM = Deno.env.get('WEBSITE_FROM') ?? 'Web Bella Furniture & Outdoor <web@bellacampoamor.com>'
const TO = Deno.env.get('WEBSITE_TO') ?? 'info@bellacampoamor.com'

function cors(origin: string | null) {
  const ok = origin && (ALLOWED.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
  return {
    'Access-Control-Allow-Origin': ok ? origin! : ALLOWED[0],
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  }
}
const clean = (v: unknown, max: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max)
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

async function sha(s: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s + (Deno.env.get('SUPABASE_URL') ?? '')))
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

Deno.serve(async (req) => {
  const headers = { ...cors(req.headers.get('Origin')), 'Content-Type': 'application/json' }
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers })
  if (req.method === 'OPTIONS') return new Response('ok', { headers })
  if (req.method !== 'POST') return reply(405, { error: 'method' })

  let d: Record<string, unknown>
  try { d = await req.json() } catch { return reply(400, { error: 'json' }) }

  // Honeypot: bots vullen dit verborgen veld in; doe alsof het gelukt is.
  if (clean(d.website, 200)) return reply(200, { ok: true })

  const name = clean(d.name, 120)
  const email = clean(d.email, 200)
  const phone = clean(d.phone, 40)
  const message = clean(d.message, 5000)
  const language = ['es', 'en', 'nl'].includes(String(d.language)) ? String(d.language) : 'es'
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\n]/.test(name + email)) {
    return reply(400, { error: 'invalid' })
  }

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
  const ip_hash = await sha(ip)

  // Eenvoudige limiet: 5 berichten per uur per IP, 100 per dag in totaal.
  const hourAgo = new Date(Date.now() - 3600e3).toISOString()
  const dayAgo = new Date(Date.now() - 86400e3).toISOString()
  const [{ count: perIp }, { count: perDay }] = await Promise.all([
    db.from('website_messages').select('id', { count: 'exact', head: true }).eq('ip_hash', ip_hash).gte('created_at', hourAgo),
    db.from('website_messages').select('id', { count: 'exact', head: true }).gte('created_at', dayAgo),
  ])
  if ((perIp ?? 0) >= 5 || (perDay ?? 0) >= 100) return reply(429, { error: 'rate' })

  const { data: row, error: insErr } = await db.from('website_messages')
    .insert({ name, email, phone, message, language, ip_hash }).select('id').single()
  if (insErr) return reply(500, { error: 'db' })

  const key = Deno.env.get('RESEND_API_KEY')
  if (!key) {
    await db.from('website_messages').update({ status: 'failed', error: 'RESEND_API_KEY ontbreekt' }).eq('id', row.id)
    return reply(500, { error: 'not_configured' })
  }

  const lang = { es: 'Español', en: 'English', nl: 'Nederlands' }[language]
  const text = `Nuevo mensaje desde bellacampoamor.com\n\nNombre: ${name}\nE-mail: ${email}\nTeléfono: ${phone || '-'}\nIdioma: ${lang}\n\n${message}\n`
  const html = `<p><strong>Nuevo mensaje desde bellacampoamor.com</strong></p>
<table cellpadding="4" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
<tr><td><b>Nombre</b></td><td>${esc(name)}</td></tr>
<tr><td><b>E-mail</b></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
<tr><td><b>Teléfono</b></td><td>${esc(phone || '-')}</td></tr>
<tr><td><b>Idioma</b></td><td>${lang}</td></tr></table>
<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(message)}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Web: mensaje de ${name}`,
      text,
      html,
    }),
  })
  if (!res.ok) {
    const error = `Resend ${res.status}: ${(await res.text()).slice(0, 500)}`
    await db.from('website_messages').update({ status: 'failed', error }).eq('id', row.id)
    return reply(502, { error: 'send' })
  }
  await db.from('website_messages').update({ status: 'sent' }).eq('id', row.id)
  return reply(200, { ok: true })
})
