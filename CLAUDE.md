# BellaCampoamor.com – werkafspraken

- Statische site (GitHub Pages). Spaanse pagina's in de root zijn de bron; `en/` en `nl/` worden gegenereerd.
- Na elke wijziging aan `index.html`, `bali.html`, `cita.html` of de vertalingen in `assets/js/main.js`: draai `node tools/build-lang.mjs` en commit `en/`, `nl/` en `sitemap.xml` mee. Bewerk `en/` en `nl/` nooit direct, en ook niet het blok tussen `<!-- SEO:START -->` en `<!-- SEO:END -->`.
- Paden in JavaScript naar bestanden in `assets/` absoluut maken (`/assets/...`), anders breken ze in `/en/` en `/nl/`.
- Zie README.md voor de rest (formulieren, Bali-collectie, afspraken, merkregels).
