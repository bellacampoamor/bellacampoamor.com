// Afspraken via bellacampoamor.com/cita.html ("Pida cita").
// GET  -> vrije tijden binnen de openingstijden (komende weken), per dag de bezette blokken.
// POST -> afspraakverzoek: opslaan in website_appointments, PROFORMA-afspraak in Google Agenda
//         (via Google Apps Script) en e-mail via Resend naar info@bellacampoamor.com (met .ics-bijlage).
// Eén klant per tijdslot: de winkel neemt alle tijd voor deze klant.
// Secrets: RESEND_API_KEY (verplicht); optioneel WEBSITE_FROM, WEBSITE_TO,
//          GOOGLE_SCRIPT_URL + GOOGLE_SCRIPT_SECRET (agenda; zonder deze alleen mail + .ics).
import { createClient } from 'npm:@supabase/supabase-js@2'

const ALLOWED = ['https://bellacampoamor.com', 'https://www.bellacampoamor.com', 'https://bellacampoamor.github.io']
const FROM = Deno.env.get('WEBSITE_FROM') ?? 'Web Bella Furniture & Outdoor <web@bellacampoamor.com>'
const TO = Deno.env.get('WEBSITE_TO') ?? 'info@bellacampoamor.com'
const SCRIPT_URL = Deno.env.get('GOOGLE_SCRIPT_URL') ?? ''
const SCRIPT_SECRET = Deno.env.get('GOOGLE_SCRIPT_SECRET') ?? ''
const TZ = 'Europe/Madrid'
const LOCATION = 'Bella Furniture & Outdoor, Polígono A-2 La Regía Oeste, 03189 Dehesa de Campoamor (Alicante)'

// Openingstijden in minuten na middernacht (0 = zondag). Gelijk houden met extras.js / index.html.
const HOURS: Record<number, [number, number]> = { 1: [600, 1080], 2: [600, 1080], 3: [600, 1080], 4: [600, 1080], 5: [600, 1080], 6: [600, 840] }
const DURATIONS = [60, 120, 180]
const STEP = 30 // starttijden per half uur
const MIN_DAYS = 1 // vroegst morgen
const MAX_DAYS = 42 // zes weken vooruit

const SCOPES: Record<string, string> = {
  casa: 'Amueblar una casa completa',
  varias: 'Varias estancias',
  exterior: 'Terraza / jardín / exterior',
  otro: 'Otro',
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
const clean = (v: unknown, max: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max)
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

async function sha(s: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s + (Deno.env.get('SUPABASE_URL') ?? '')))
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

// ---------- tijdzone Europe/Madrid ----------
const fmtParts = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
function madridParts(ms: number) {
  const p: Record<string, number> = {}
  for (const x of fmtParts.formatToParts(new Date(ms))) if (x.type !== 'literal') p[x.type] = Number(x.value)
  return p
}
function offsetMs(ms: number) {
  const p = madridParts(ms)
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000
}
// lokale Madrid-tijd -> UTC ms
function toUtc(date: string, min: number) {
  const [y, m, d] = date.split('-').map(Number)
  const guess = Date.UTC(y, m - 1, d, Math.floor(min / 60), min % 60)
  let res = guess - offsetMs(guess)
  const o2 = offsetMs(res)
  if (guess - o2 !== res) res = guess - o2
  return res
}
function todayMadrid() {
  const p = madridParts(Date.now())
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`
}
function addDays(date: string, n: number) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10)
}
const weekday = (date: string) => new Date(date + 'T12:00:00Z').getUTCDay()
const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

// ---------- Google Agenda via Apps Script ----------
type Busy = { start: number; end: number; id?: string }
let cache: { at: number; key: string; data: { busy: Busy[]; ids: Set<string> } | null } | null = null

async function callScript(body: Record<string, unknown>) {
  if (!SCRIPT_URL || !SCRIPT_SECRET) return null
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 8000)
  try {
    const r = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...body, secret: SCRIPT_SECRET }),
      redirect: 'follow',
      signal: ctl.signal,
    })
    if (!r.ok) return null
    const j = await r.json()
    return j && !j.error ? j : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

// Bezette tijden uit de agenda "Citas web · Bella Campoamor". null = agenda niet bereikbaar.
async function googleBusy(fromMs: number, toMs: number, fresh = false) {
  const key = `${fromMs}-${toMs}`
  if (!fresh && cache && cache.key === key && Date.now() - cache.at < 60_000) return cache.data
  const j = await callScript({ action: 'busy', from: new Date(fromMs).toISOString(), to: new Date(toMs).toISOString() })
  const data = j && Array.isArray(j.busy)
    ? {
      busy: j.busy.map((b: any) => ({ start: Date.parse(b.start), end: Date.parse(b.end), id: b.id ? String(b.id) : undefined }))
        .filter((b: Busy) => b.end > b.start),
      ids: new Set<string>((j.ids ?? []).map(String)),
    }
    : null
  cache = { at: Date.now(), key, data }
  return data
}

// Alle blokkades in een periode. Als de agenda bereikbaar is, is die leidend:
// is een PROFORMA-afspraak daar verwijderd, dan komt het tijdslot weer vrij.
async function blocks(db: any, fromMs: number, toMs: number, fresh = false) {
  const { data: rows } = await db.from('website_appointments')
    .select('id,starts_at,ends_at,calendar_event_id')
    .neq('status', 'cancelled')
    .lt('starts_at', new Date(toMs).toISOString())
    .gt('ends_at', new Date(fromMs).toISOString())
  const g = await googleBusy(fromMs, toMs, fresh)
  const out: Busy[] = []
  for (const r of rows ?? []) {
    if (g && r.calendar_event_id && !g.ids.has(r.calendar_event_id)) {
      // in Google verwijderd -> ook hier vrijgeven
      await db.from('website_appointments').update({ status: 'cancelled', error: 'evento eliminado en Google Calendar' }).eq('id', r.id)
      continue
    }
    out.push({ start: Date.parse(r.starts_at), end: Date.parse(r.ends_at) })
  }
  if (g) out.push(...g.busy)
  return { busy: out, calendar: !!g }
}

function dayInfo(date: string, busy: Busy[]) {
  const h = HOURS[weekday(date)]
  if (!h) return null
  const dayStart = toUtc(date, h[0]), dayEnd = toUtc(date, h[1])
  const b: [number, number][] = []
  for (const x of busy) {
    if (x.end <= dayStart || x.start >= dayEnd) continue
    const s = Math.max(h[0], h[0] + Math.floor((x.start - dayStart) / 60000))
    const e = Math.min(h[1], h[0] + Math.ceil((x.end - dayStart) / 60000))
    b.push([s, e])
  }
  b.sort((a, c) => a[0] - c[0])
  return { date, open: h[0], close: h[1], busy: b }
}

function slotFree(info: { open: number; close: number; busy: [number, number][] }, start: number, dur: number) {
  if (start < info.open || start + dur > info.close || (start - info.open) % STEP) return false
  return !info.busy.some(([s, e]) => start < e && start + dur > s)
}

// ---------- .ics ----------
function icsText(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}
function fold(line: string) {
  const enc = new TextEncoder()
  let out = '', cur = ''
  for (const ch of line) {
    if (enc.encode(cur + ch).length > 73) { out += cur + '\r\n '; cur = '' }
    cur += ch
  }
  return out + cur
}
const icsDate = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
function buildIcs(id: string, start: number, end: number, title: string, desc: string) {
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bella Campoamor//Citas web//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', `UID:${id}@bellacampoamor.com`, `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsText(title)}`, `DESCRIPTION:${icsText(desc)}`, `LOCATION:${icsText(LOCATION)}`,
    'STATUS:TENTATIVE', 'TRANSP:OPAQUE', 'END:VEVENT', 'END:VCALENDAR',
  ].map(fold).join('\r\n') + '\r\n'
}
const b64 = (s: string) => {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  for (const x of bytes) bin += String.fromCharCode(x)
  return btoa(bin)
}

Deno.serve(async (req) => {
  const headers = { ...cors(req.headers.get('Origin')), 'Content-Type': 'application/json' }
  const reply = (status: number, body: unknown, extra: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } })
  if (req.method === 'OPTIONS') return new Response('ok', { headers })

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const today = todayMadrid()
  const first = addDays(today, MIN_DAYS)
  const last = addDays(today, MAX_DAYS)
  const rangeFrom = toUtc(first, 0), rangeTo = toUtc(addDays(last, 1), 0)

  // ---------- beschikbaarheid ----------
  if (req.method === 'GET') {
    const { busy, calendar } = await blocks(db, rangeFrom, rangeTo)
    const days = []
    for (let d = first; d <= last; d = addDays(d, 1)) {
      const info = dayInfo(d, busy)
      if (info) days.push(info)
    }
    return reply(200, { tz: TZ, step: STEP, durations: DURATIONS, calendar, days }, { 'Cache-Control': 'no-store' })
  }
  if (req.method !== 'POST') return reply(405, { error: 'method' })

  // ---------- afspraakverzoek ----------
  let d: Record<string, unknown>
  try { d = await req.json() } catch { return reply(400, { error: 'json' }) }
  if (clean(d.website, 200)) return reply(200, { ok: true }) // honeypot

  const name = clean(d.name, 120)
  const email = clean(d.email, 200)
  const phone = clean(d.phone, 40)
  const message = clean(d.message, 3000)
  const area = clean(d.area, 200)
  const scopeKey = clean(d.scope, 20)
  const scope = SCOPES[scopeKey] ?? ''
  const people = Math.min(10, Math.max(1, parseInt(String(d.people ?? '1'), 10) || 1))
  const language = ['es', 'en', 'nl'].includes(String(d.language)) ? String(d.language) : 'es'
  const date = clean(d.date, 10)
  const time = clean(d.time, 5)
  const duration = Number(d.duration)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, '').length < 6 || /[\n]/.test(name + email + phone) ||
    !scope || !DURATIONS.includes(duration) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return reply(400, { error: 'invalid' })
  }
  if (date < first || date > last) return reply(409, { error: 'slot' })
  const startMin = Number(time.slice(0, 2)) * 60 + Number(time.slice(3))

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
  const ip_hash = await sha(ip)
  const hourAgo = new Date(Date.now() - 3600e3).toISOString()
  const dayAgo = new Date(Date.now() - 86400e3).toISOString()
  const [{ count: perIp }, { count: perDay }] = await Promise.all([
    db.from('website_appointments').select('id', { count: 'exact', head: true }).eq('ip_hash', ip_hash).gte('created_at', hourAgo),
    db.from('website_appointments').select('id', { count: 'exact', head: true }).gte('created_at', dayAgo),
  ])
  if ((perIp ?? 0) >= 3 || (perDay ?? 0) >= 30) return reply(429, { error: 'rate' })

  // Tijdslot opnieuw controleren (verse agendagegevens)
  const dayFrom = toUtc(date, 0), dayTo = toUtc(addDays(date, 1), 0)
  const { busy } = await blocks(db, dayFrom, dayTo, true)
  const info = dayInfo(date, busy)
  if (!info || !slotFree(info, startMin, duration)) return reply(409, { error: 'slot' })

  const startsAt = toUtc(date, startMin)
  const endsAt = startsAt + duration * 60000
  const { data: row, error: insErr } = await db.from('website_appointments').insert({
    starts_at: new Date(startsAt).toISOString(), ends_at: new Date(endsAt).toISOString(), duration_min: duration,
    name, email, phone, language, people, scope, area, message, ip_hash,
  }).select('id').single()
  if (insErr) return reply(insErr.code === '23P01' ? 409 : 500, { error: insErr.code === '23P01' ? 'slot' : 'db' })
  cache = null

  const lang = { es: 'Español', en: 'English', nl: 'Nederlands' }[language]!
  const when = new Intl.DateTimeFormat('es-ES', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(startsAt))
  const slot = `${hhmm(startMin)} – ${hhmm(startMin + duration)}`
  const durTxt = `${duration / 60} h`
  const title = `PROFORMA · Cita ${name} · ${scope}`
  const fields: [string, string][] = [
    ['Fecha', when], ['Hora', `${slot} (${durTxt})`], ['Nombre', name], ['E-mail', email], ['Teléfono', phone],
    ['Idioma', lang], ['Personas', String(people)], ['Qué desea amueblar', scope], ['Zona / vivienda', area || '-'],
  ]
  const desc = `SOLICITUD DE CITA – PROFORMA (pendiente de confirmar)\n` +
    `Solicitada vía bellacampoamor.com. Confirme la cita con el cliente y quite "PROFORMA" del título.\n` +
    `Si no es posible: borre este evento y el horario vuelve a quedar libre en la web.\n\n` +
    fields.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMensaje:\n${message || '-'}\n\nRef.: ${row.id}`

  // 1) Google Agenda (PROFORMA)
  let eventId: string | null = null
  const ev = await callScript({ action: 'create', id: row.id, title, description: desc, location: LOCATION, start: new Date(startsAt).toISOString(), end: new Date(endsAt).toISOString() })
  if (ev?.id) eventId = String(ev.id)
  await db.from('website_appointments').update({ calendar_event_id: eventId, error: eventId || !SCRIPT_URL ? '' : 'Google Calendar no disponible' }).eq('id', row.id)

  // 2) E-mail naar de winkel
  const key = Deno.env.get('RESEND_API_KEY')
  let mailOk = false
  if (key) {
    const calNote = eventId
      ? 'La cita ya está en Google Calendar como <b>PROFORMA</b>.'
      : 'No se pudo poner en Google Calendar automáticamente: abra el archivo .ics adjunto para añadirla.'
    const html = `<div style="font-family:sans-serif;font-size:14px;color:#111">
<p style="display:inline-block;background:#D57054;color:#111;font-weight:700;letter-spacing:.08em;padding:6px 10px;border-radius:4px;margin:0 0 12px">PROFORMA · SOLICITUD DE CITA</p>
<p style="font-size:18px;margin:0 0 4px"><b>${esc(when)}</b></p>
<p style="font-size:16px;margin:0 0 14px">${esc(slot)} (${durTxt})</p>
<table cellpadding="5" style="border-collapse:collapse;font-size:14px;background:#faf6f1">
${fields.slice(2).map(([k, v]) => `<tr><td style="vertical-align:top"><b>${esc(k)}</b></td><td>${k === 'E-mail' ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : k === 'Teléfono' ? `<a href="tel:${esc(v.replace(/[^\d+]/g, ''))}">${esc(v)}</a>` : esc(v)}</td></tr>`).join('\n')}
</table>
<p style="white-space:pre-wrap;margin:14px 0">${esc(message || '-')}</p>
<p style="color:#555">${calNote}<br>Confirme la cita con el cliente (responder a este e-mail le escribe directamente). Si no es posible, borre el evento en Google Calendar y el horario vuelve a quedar libre en la web.</p>
<p style="color:#888;font-size:12px">Ref.: ${row.id}</p></div>`
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `PROFORMA cita web: ${name} – ${when}, ${hhmm(startMin)}`,
        text: desc,
        html,
        attachments: [{ filename: 'cita-bella.ics', content: b64(buildIcs(row.id, startsAt, endsAt, title, desc)), content_type: 'text/calendar' }],
      }),
    })
    mailOk = res.ok
    const err = res.ok ? '' : `Resend ${res.status}: ${(await res.text()).slice(0, 400)}`
    await db.from('website_appointments').update({ mail_status: res.ok ? 'sent' : 'failed', ...(err ? { error: err } : {}) }).eq('id', row.id)
  } else {
    await db.from('website_appointments').update({ mail_status: 'failed', error: 'RESEND_API_KEY ontbreekt' }).eq('id', row.id)
  }

  if (!eventId && !mailOk) {
    // Niemand weet van dit verzoek: tijdslot niet blokkeren, bezoeker laten bellen.
    await db.from('website_appointments').update({ status: 'cancelled' }).eq('id', row.id)
    return reply(502, { error: 'send' })
  }
  return reply(200, { ok: true, calendar: !!eventId, date, time: hhmm(startMin), end: hhmm(startMin + duration) })
})
