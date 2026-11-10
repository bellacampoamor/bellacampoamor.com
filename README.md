# BellaCampoamor.com

Informatieve one-page website voor **Bella Furniture & Outdoor**, Dehesa de Campoamor (Orihuela Costa).
Geen producten/artikelen – puur informatief. Talen: ES (standaard), EN, NL (knop in de header of `?lang=en` / `?lang=nl`).

## Structuur
- `index.html` – de pagina (header, hero, over ons, wat we bieden, bezoek ons, contact, footer)
- `aviso-legal.html`, `privacidad.html` – juridische pagina's (tekst nog aanleveren)
- `assets/css/styles.css`, `assets/js/main.js` (vertalingen + contactformulier)
- `assets/img/bella-logo.png` – **alleen in de header**
- `assets/img/bellaflow-mark.png` – **alleen in de footer**, met "Powered by Bellaflow.es"

## Nog invullen
Zoek op `[[` in de bestanden: adres, openingstijden, telefoon, WhatsApp, e-mail, bedrijfsgegevens voor de juridische pagina's.
Contactformulier: zet de n8n-webhook-URL in `window.BELLA_CONFIG.contactWebhook` onderaan `index.html` (of een e-mailadres in `contactEmail` als fallback).

## Live zetten
GitHub → Settings → Pages → Source: **GitHub Actions**. Elke push naar `main` publiceert de site.
Eigen domein: voeg een bestand `CNAME` toe met `bellacampoamor.com` en zet de DNS bij je domeinprovider.

## Lokaal bekijken
`python3 -m http.server` en open http://localhost:8000

## Contactformulier
Het formulier post naar de Supabase edge function `website-contact` (project BellaFlow, code in `supabase/functions/website-contact/`).
Die slaat het bericht op in tabel `website_messages` en mailt het via Resend naar info@bellacampoamor.com (reply-to = de bezoeker).
Nodig: secret `RESEND_API_KEY` in Supabase en het domein bellacampoamor.com geverifieerd in Resend.
Optioneel: secrets `WEBSITE_FROM` (afzender) en `WEBSITE_TO` (ontvanger).
