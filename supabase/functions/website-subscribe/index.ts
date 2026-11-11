// Nieuwsbrief-inschrijving van bellacampoamor.com (pop-up).
// POST {email, language, source, consent: true}  -> opslaan in website_subscribers (status active)
// GET  ?unsubscribe=<token>                       -> uitschrijven (link voor onderaan marketingmails)
// Geen mail; alleen opslag. Zelfde e-mail opnieuw = consent vernieuwd, geen dubbele rij.
import { createClient } from 'npm:@supabase/supabase-js@2'

const ALLOWED = ['https://bellacampoamor.com', 'https://www.bellacampoamor.com', 'https://bellacampoamor.github.io']
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const CONSENT: Record<string, string> = {
  es: 'Acepto recibir por e-mail novedades, ofertas y consejos de Bella Furniture & Outdoor (Haco Invest SL). Puedo darme de baja en cualquier momento.',
  en: 'I agree to receive news, offers and tips from Bella Furniture & Outdoor (Haco Invest SL) by e-mail. I can unsubscribe at any time.',
  nl: 'Ik ga akkoord met het ontvangen van nieuws, aanbiedingen en tips van Bella Furniture & Outdoor (Haco Invest SL) per e-mail. Ik kan me altijd afmelden.',
}

function cors(origin: string | null) {
  const ok = origin && (ALLOWED.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
  return {
    'Access-Control-Allow-Origin': ok ? origin! : ALLOWED[0],
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
  }
}
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]/g, '').trim().slice(0, max)

async function sha(s: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s + (Deno.env.get('SUPABASE_URL') ?? '')))
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

function page(title: string, text: string) {
  return new Response(`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title>
<body style="margin:0;font-family:system-ui,sans-serif;background:#FAF6F1;color:#111;display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px">
<div><h1 style="font-size:22px">${title}</h1><p style="max-width:440px;line-height:1.5">${text}</p>
<p><a href="https://bellacampoamor.com" style="color:#8A3F2B">bellacampoamor.com</a></p></div></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

Deno.serve(async (req) => {
  const headers = { ...cors(req.headers.get('Origin')), 'Content-Type': 'application/json' }
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers })
  if (req.method === 'OPTIONS') return new Response('ok', { headers })

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  // Uitschrijven via link
  if (req.method === 'GET') {
    const token = new URL(req.url).searchParams.get('unsubscribe') ?? ''
    if (!UUID.test(token)) return page('Enlace no válido', 'Este enlace de baja no es válido. Escríbanos a info@bellacampoamor.com.')
    await db.from('website_subscribers')
      .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('unsubscribe_token', token)
    return page('Baja confirmada · Unsubscribed · Afgemeld',
      'Ya no recibirá nuestros e-mails. · You will no longer receive our e-mails. · U ontvangt onze e-mails niet meer.')
  }
  if (req.method !== 'POST') return reply(405, { error: 'method' })

  let d: Record<string, unknown>
  try { d = await req.json() } catch { return reply(400, { error: 'json' }) }

  // Honeypot
  if (clean(d.website, 200)) return reply(200, { ok: true })

  const email = clean(d.email, 200).toLowerCase()
  const language = ['es', 'en', 'nl'].includes(String(d.language)) ? String(d.language) : 'es'
  const source = clean(d.source, 120)
  if (!EMAIL.test(email) || d.consent !== true) return reply(400, { error: 'invalid' })

  const ip_hash = await sha((req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim())

  // Limiet: 5 per uur per IP, 300 per dag in totaal
  const hourAgo = new Date(Date.now() - 3600e3).toISOString()
  const dayAgo = new Date(Date.now() - 86400e3).toISOString()
  const [{ count: perIp }, { count: perDay }] = await Promise.all([
    db.from('website_subscribers').select('id', { count: 'exact', head: true }).eq('ip_hash', ip_hash).gte('updated_at', hourAgo),
    db.from('website_subscribers').select('id', { count: 'exact', head: true }).gte('updated_at', dayAgo),
  ])
  if ((perIp ?? 0) >= 5 || (perDay ?? 0) >= 300) return reply(429, { error: 'rate' })

  const now = new Date().toISOString()
  const { error } = await db.from('website_subscribers').upsert({
    email, language, source, status: 'active', consent_at: now, consent_text: CONSENT[language],
    ip_hash, unsubscribed_at: null, updated_at: now,
  }, { onConflict: 'email' })
  if (error) return reply(500, { error: 'db' })
  return reply(200, { ok: true })
})
