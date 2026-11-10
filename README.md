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
