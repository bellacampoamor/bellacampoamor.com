# BellaCampoamor.com

Informatieve one-page website voor **Bella Furniture & Outdoor**, Dehesa de Campoamor (Orihuela Costa).
Informatief, met een etalage van de HomeDecoBali-collectie (geen online verkoop). Talen: ES (standaard), EN, NL (knop in de header of `?lang=en` / `?lang=nl`).

## Structuur
- `index.html` – de pagina (header, hero, over ons, wat we bieden, Bali-collectie (4 willekeurige producten), bezoek ons, contact, footer)
- `bali.html` – Bali-collectie: per categorie 4 willekeurige HomeDecoBali-producten
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

## Bali-collectie (HomeDecoBali)
- Data: Supabase edge function `website-hdb-products` (code in `supabase/functions/website-hdb-products/`), leest `supplier_hdb_items` uit BellaFlow.
  `?mode=home` = 4 willekeurige producten, `?mode=bali` = per categorie (11 vaste categorieën) 4 willekeurige producten; `lang=es|en` (NL gebruikt de Engelse productteksten).
  Er gaan geen inkoopprijzen, voorraadaantallen of ruwe data naar de website.
- Front-end: `assets/js/hdb.js`. Pre-orderproducten krijgen een duidelijk "Pre-order"-label met de verwachte maand.
- Klik op een product opent een aanvraagformulier; dat post naar `website-contact` met `product_id`. De functie haalt naam, ref., prijs en pre-orderstatus zelf uit de database en mailt via Resend naar info@bellacampoamor.com. Opgeslagen in `website_messages` (kolommen `product_id`, `product_label`).

## Interactieve onderdelen (`assets/js/extras.js`)
- **Open/gesloten-badge** in de hero en bij "Bezoek ons": live op basis van de openingstijden (tijdzone Europe/Madrid), markeert ook de dag van vandaag in de tabel. Openingstijden aanpassen: `HOURS` bovenin `extras.js` (en de tabel + JSON-LD in `index.html`). Feestdagen worden niet meegenomen.
- **Merk-pop-ups**: "Meer informatie" op elke merkkaart opent een pop-up met korte tekst, wat je in de showroom ziet, en de knoppen "Plan uw bezoek" / "Vraag advies" (vult het contactformulier voor met het merk). Teksten: `BRANDS` en `POINTS` in `extras.js`.
- **Reviews**: carrousel met losse quotes uit `assets/js/reviews.js`. Zolang die lijst leeg is, is de sectie onzichtbaar. Alleen echte quotes toevoegen.
- **Sticky knop "Offerte aanvragen"** + belknop op mobiel (≤ 760 px); verdwijnt zodra het contactformulier of de footer in beeld is.
- **Scroll-animaties**: subtiele fade-ins; staan uit bij "verminderde beweging" in het besturingssysteem.

## Quick view producten (`assets/js/hdb.js`)
Klik op een product opent een quick view met fotogalerij (max. 6 foto's), omschrijving, materiaal/maten en het aanvraagformulier. Bij hover toont de kaart de tweede foto. De feed `website-hdb-products` levert hiervoor `images` en `description`.

## Reviews vragen
- Blok "¿Ya nos conoce?" (`#resena`) op de homepage, vóór het contactformulier: knop naar het Google-reviewvenster, op desktop ook een QR-code (`assets/img/qr-review.svg`). Link "Escriba una reseña" in de footer van beide pagina's.
- Korte links voor bonnen, mails en folders: **bellacampoamor.com/review** en **bellacampoamor.com/resena** sturen direct door naar het Google-reviewvenster (Google place ID `ChIJzQiJHhgGYw0RzR8puSEgpAQ`).
