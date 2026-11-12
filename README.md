# BellaCampoamor.com

Informatieve one-page website voor **Bella Furniture & Outdoor**, Dehesa de Campoamor (Orihuela Costa).
Informatief, met een etalage van de HomeDecoBali-collectie (geen online verkoop). Talen: ES (standaard, `/`), EN (`/en/`), NL (`/nl/`) – elke taal een eigen URL voor Google.

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

## Showroom (`assets/js/showroom.js`, `assets/img/showroom/`)
- Sectie **Exposición** (`#exposicion`) onder "Sobre nosotros": fotomozaïek van de showroom in Campoamor met filter (Salones / Comedores / Dormitorios) en lightbox (pijltjestoetsen, swipe).
- **Sfeerband** "Venga a sentarse" tussen "Qué ofrecemos" en de merken.
- Foto's: per foto `naam.webp` + `naam.jpg` (900 px, raster) en `naam-xl.webp` (lightbox), zonder EXIF/GPS. Foto toevoegen: `<li class="sg-item">` kopiëren in `index.html` (`sg-wide` = 2 kolommen, `sg-tall` = 2 rijen), `data-cat` = `salon|comedor|dormitorio`, alt-tekst ES in de HTML en EN/NL als `show.sN` in `main.js`.
- Alleen foto's van de winkel in Campoamor gebruiken.

## Afspraak maken (`cita.html`, `assets/js/cita.js`)
- Menu-item **Pida cita / Book a visit / Afspraak maken** (op alle pagina's, ook in de footer en bij "Visítenos").
- Klant kiest duur (1, 2 of 3 uur), dag en starttijd. Alleen tijden binnen de openingstijden (ma–vr 10–18, za 10–14), vanaf morgen tot zes weken vooruit, per half uur. Eén klant per tijdslot.
- Edge function `website-appointment` (code in `supabase/functions/website-appointment/`):
  `GET` = vrije tijden, `POST` = verzoek. Opslag in tabel `website_appointments` (overlap onmogelijk door een exclusion constraint).
- Bij een verzoek: **PROFORMA**-afspraak in Google Agenda (agenda hacocampoamor@gmail.com) en een e-mail via Resend naar info@bellacampoamor.com met alle gegevens en een `.ics`-bijlage. Reply-to = de klant.
- Google Agenda-koppeling via n8n-workflow **"BellaFlow: Website afspraken → Google Agenda"** (webhook `https://bellaflow.app.n8n.cloud/webhook/bella-citas`, agenda hacocampoamor@gmail.com). Secrets in Supabase: `CALENDAR_HOOK_URL`, `CALENDAR_HOOK_SECRET` (zelfde sleutel als in de Switch-node van de workflow). Werkt de agenda niet, dan gaat alles door met alleen mail + `.ics`.
- In Google Agenda blokkeert alleen een afspraak met in de titel PROFORMA, Cita, Cerrado, Vacaciones, Festivo, Gesloten, Bloqueado of "Sin citas" de website; leveringen en andere afspraken tellen niet mee. Een PROFORMA-afspraak verwijderen = tijdslot weer vrij. Na bevestiging met de klant "PROFORMA" uit de titel halen (laat "Cita" staan, anders komt het tijdslot vrij).
- Openingstijden wijzigen: `HOURS` in de edge function (en in `extras.js` / `index.html`).

## Bella-medewerker (decoratieve foto's, `assets/img/team/`)
- Uitgeknipte AI-foto's (Higgsfield) van één vaste "verkoopster" in vijftien poses: `bella-<pose>.webp` (1100 px hoog) en `bella-<pose>-sm.webp` (600 px), transparante achtergrond.
- Poses: brochure, koffie, duim, tweeduims, verbaasd, presenteert, wijst-links, wijst-rechts, basis, ligt (liggend, wijst omhoog; liggend formaat 1100 px breed), schaal (Balinese houten schaal, frangipani in het haar), stoffen (stoffenwaaier), tablet, wijst-u (wijst naar de kijker), profiel (van opzij, wijst naar rechts).
- Regel: elke foto maar op één plek op de hele site (ook de nieuwsbrief-pop-up telt mee). `basis` is op dit moment ongebruikt (reserve).
- Gebruik: `<img class="bella-gal bg-…">`, puur decoratief (`alt=""`, `aria-hidden`). Plaatsing per sectie staat onderaan `styles.css` (blok "Bella-medewerker"). Klasse `fade` laat haar onderaan vervagen waar ze niet op een rand staat.
- Huidige plekken: hero (brochure), Exposición (verbaasd), Interiorismo-paneel (koffie, alleen ≥ 1200 px), sfeerband (wijst-links), Bali-blok (presenteert), Visítenos (duim), FAQ (ligt), review-blok (tweeduims, verborgen < 860 px), Contacto (wijst-rechts), bali.html kop (schaal), bali.html terra-blok "¿Busca algo en concreto?" (tablet, alleen > 1180 px), cita.html kop (stoffen), cita.html naast het formulier (video `bella-profiel-video.mp4` met poster `.webp`: wijst van opzij naar het formulier en draait dan naar de bezoeker; links/rechts strak bijgesneden en iets onder de formulierkaart geschoven zodat haar vingertop tegen de kaart staat; achtergrond ingekleurd in `--bg` #FAF6F1, heen-en-terug zodat de loop naadloos is; alleen > 900 px, staat stil bij 'minder beweging'). Losse foto `profiel` is nu reserve, nieuwsbrief-pop-up (wijst-u). Op mobiel zijn een paar verborgen of kleiner.

## Talen en SEO (`tools/build-lang.mjs`)
- **Bron = de Spaanse pagina's** in de root (`index.html`, `bali.html`, `cita.html`). Vertalingen staan in `T.en` / `T.nl` in `assets/js/main.js`.
- Na elke wijziging aan die pagina's of aan de vertalingen: **`node tools/build-lang.mjs`** draaien en het resultaat meecommitten. Het script
  - schrijft `en/` en `nl/` (vooraf vertaalde HTML, zodat Google elke taal ziet) – **nooit met de hand bewerken**;
  - zet in elke pagina het SEO-blok in de `<head>` tussen `<!-- SEO:START -->` en `<!-- SEO:END -->`: title, description, canonical, hreflang (es/en/nl/x-default), Open Graph en JSON-LD (FurnitureStore, WebSite, FAQPage uit de FAQ-teksten, BreadcrumbList);
  - schrijft `sitemap.xml` met hreflang-alternates.
- Titels/omschrijvingen per pagina en taal: `META` bovenin het script.
- Taalknoppen zijn gewone links; een eerder gekozen taal (localStorage) en oude `?lang=en`-links sturen door naar de juiste URL.
- Nieuwe pagina in alle talen? Voeg hem toe aan `PAGES` en `META` in het script.
- Na livegang: sitemap indienen in Google Search Console (`https://bellacampoamor.com/sitemap.xml`).
- **Zoekwoorden/merknamen**: titels en omschrijvingen beginnen met "Bella Furniture & Outdoor". In de JSON-LD staan `alternateName` (Bella, Bella Outdoor, Bella Furniture, Bella Outdoor & Furniture, Bella Campoamor, Bella Outside, Haco Bella), `legalName` Haco Invest SL, merken (Life/LIFE, SUNS/Suns by Bella) en Bella Group als `parentOrganization` (onzichtbaar op de gewone pagina's).

## Bella Group-pagina (`bella-group.html`)
- Korte uitleg over Bella Group (Bella Furniture, Bella Outdoor, Bella Kitchens, Bella House) en de showrooms Campoamor, Altea en Rojales, met link naar bellagroup.es. Niet in het hoofdmenu: bereikbaar via de links "Altea" en "Rojales" in de footer (`#altea`, `#rojales`).
- Teksten: `grp.*` in `main.js`; JSON-LD van de groep: functie `group()` in `tools/build-lang.mjs`.

## Nieuwsbrief-pop-up (`assets/js/newsletter.js`)
- Pop-up "¿Quiere ser el primero en enterarse?" met Bella (pose wijst-links) en confetti, op `index.html` en `bali.html` (alle talen; niet op `cita.html` en de juridische pagina's). Teksten ES/EN/NL staan in `newsletter.js` zelf (taal = `<html lang>`).
- Verschijnt na 20 s, na 50 % scrollen of bij exit intent (desktop), nooit in de eerste 6 s, niet als er al een dialoog open is of de bezoeker een formulier invult. Eén keer per sessie; wegklikken = 21 dagen rust; ingeschreven = nooit meer (localStorage `bella-newsletter`). Testen zonder pop-up: `?nopopup`.
- Altijd te openen via de footerlink "Boletín / Newsletter / Nieuwsbrief" of `#boletin` in de URL.
- Verplicht vinkje (uitdrukkelijke toestemming, RGPD/LSSI). Edge function `website-subscribe` slaat op in tabel **`website_subscribers`** (e-mail uniek en in kleine letters, taal, bronpagina, `consent_at`, `consent_text`, `status`). Zelfde adres opnieuw = toestemming vernieuwd, geen dubbele rij. Limiet 5/uur per IP.
- **Voor marketingmails alleen `status = 'active'` gebruiken.** Elke mail moet een afmeldlink bevatten:
  `https://apmyllgfsqofjyowfbxc.supabase.co/functions/v1/website-subscribe?unsubscribe=<unsubscribe_token>` (zet status op `unsubscribed`).
- Exporteren: `select email, language, created_at from website_subscribers where status = 'active' order by created_at;`
