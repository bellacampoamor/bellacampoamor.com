/**
 * Bella Campoamor – citas web -> Google Calendar
 *
 * Koppeling tussen de edge function `website-appointment` (Supabase) en Google Agenda.
 * - action "create": zet een PROFORMA-afspraak in de agenda "Citas web · Bella Campoamor".
 * - action "busy":   geeft alle afspraken in die agenda terug; die tijden zijn op de website bezet.
 *   Een tijd blokkeren (vakantie, feestdag, andere afspraak)? Zet er een afspraak in deze agenda.
 *   Een PROFORMA-afspraak verwijderen = het tijdslot komt op de website weer vrij.
 *
 * Installatie (eenmalig, ingelogd als hacocampoamor@gmail.com):
 * 1. script.google.com -> Nieuw project -> plak dit bestand -> opslaan (naam: "Bella citas web").
 * 2. Kies bovenaan de functie `setup` -> Uitvoeren -> toestemming geven.
 *    Het logboek toont de SECRET. De agenda "Citas web · Bella Campoamor" wordt aangemaakt.
 * 3. Implementeren -> Nieuwe implementatie -> type "Web-app":
 *    Uitvoeren als: Ik  ·  Wie heeft toegang: Iedereen  -> Implementeren -> kopieer de web-app-URL.
 * 4. Zet in Supabase (project BellaFlow -> Edge Functions -> Secrets):
 *    GOOGLE_SCRIPT_URL = de web-app-URL   en   GOOGLE_SCRIPT_SECRET = de SECRET uit stap 2.
 * De SECRET staat alleen in de scripteigenschappen en in Supabase, nooit in deze repo.
 */
const CAL_NAME = 'Citas web · Bella Campoamor';

function props_() { return PropertiesService.getScriptProperties(); }

function cal_() {
  const id = props_().getProperty('CAL_ID');
  if (id) {
    const c = CalendarApp.getCalendarById(id);
    if (c) return c;
  }
  const found = CalendarApp.getCalendarsByName(CAL_NAME);
  const c = found.length ? found[0] : CalendarApp.createCalendar(CAL_NAME, {
    color: CalendarApp.Color.ORANGE,
    timeZone: 'Europe/Madrid',
    summary: 'Citas solicitadas en bellacampoamor.com. PROFORMA = pendiente de confirmar. Borrar un evento libera la hora en la web.',
  });
  props_().setProperty('CAL_ID', c.getId());
  return c;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return out_({ error: 'json' }); }
  const secret = props_().getProperty('SECRET');
  if (!secret || d.secret !== secret) return out_({ error: 'auth' });

  if (d.action === 'busy') {
    const from = new Date(d.from), to = new Date(d.to);
    if (isNaN(from) || isNaN(to) || to - from > 1000 * 60 * 60 * 24 * 70) return out_({ error: 'range' });
    const busy = [], ids = [];
    cal_().getEvents(from, to).forEach(function (ev) {
      ids.push(ev.getId());
      busy.push({ id: ev.getId(), start: ev.getStartTime().toISOString(), end: ev.getEndTime().toISOString() });
    });
    return out_({ busy: busy, ids: ids });
  }

  if (d.action === 'create') {
    const start = new Date(d.start), end = new Date(d.end);
    if (isNaN(start) || isNaN(end) || end <= start) return out_({ error: 'time' });
    const ev = cal_().createEvent(String(d.title || 'PROFORMA · Cita web').slice(0, 200), start, end, {
      description: String(d.description || '').slice(0, 6000),
      location: String(d.location || '').slice(0, 300),
    });
    ev.setColor(CalendarApp.EventColor.ORANGE);
    ev.setTag('website_appointment_id', String(d.id || ''));
    return out_({ id: ev.getId() });
  }

  return out_({ error: 'action' });
}

/** Eenmalig handmatig uitvoeren: maakt de agenda en de SECRET aan en toont die in het logboek. */
function setup() {
  const c = cal_();
  let s = props_().getProperty('SECRET');
  if (!s) {
    s = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props_().setProperty('SECRET', s);
  }
  Logger.log('Agenda: ' + c.getName() + ' (' + c.getId() + ')');
  Logger.log('GOOGLE_SCRIPT_SECRET = ' + s);
}
