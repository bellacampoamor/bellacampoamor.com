#!/usr/bin/env node
/*
 * Bella Campoamor – taalversies + SEO-head genereren
 *
 *   node tools/build-lang.mjs
 *
 * Bron = de Spaanse pagina's in de root (index.html, bali.html, cita.html).
 * Het script:
 *   1. zet in elke Spaanse pagina het SEO-blok in de <head> (title, description,
 *      canonical, hreflang, Open Graph, JSON-LD) tussen <!-- SEO:START --> en <!-- SEO:END -->;
 *   2. maakt en/<pagina> en nl/<pagina>: dezelfde HTML, met de teksten uit
 *      assets/js/main.js (data-i18n) al ingevuld, zodat Google elke taal op een eigen URL ziet;
 *   3. schrijft sitemap.xml (met hreflang-alternates).
 *
 * Pas teksten dus aan in de Spaanse HTML en/of de vertalingen in main.js
 * en draai daarna dit script. Bewerk en/ en nl/ nooit met de hand.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://bellacampoamor.com";
const LANGS = ["es", "en", "nl"];
const LOCALE = { es: "es_ES", en: "en_GB", nl: "nl_NL" };
const PAGES = ["index.html", "bali.html", "cita.html", "bella-group.html"];
const PLACE_URL = "https://www.google.com/maps/search/?api=1&query=Bella+Furniture+%26+Outdoor&query_place_id=ChIJzQiJHhgGYw0RzR8puSEgpAQ";

/* ---------- Titels en omschrijvingen per pagina en taal ---------- */
const META = {
  "index.html": {
    es: {
      title: "Bella Furniture & Outdoor Campoamor | Muebles de jardín e interior",
      desc: "Bella Outdoor & Furniture en Dehesa de Campoamor, Orihuela Costa: muebles de jardín e interior de Life Outdoor Living y SUNS. Exposición de 2.000 m² y entrega a domicilio.",
      og: "Muebles de exterior e interior en Dehesa de Campoamor, Orihuela Costa. Exposición de 2.000 m² en dos plantas.",
    },
    en: {
      title: "Bella Furniture & Outdoor Campoamor | Garden & Home Furniture",
      desc: "Bella Outdoor & Furniture in Dehesa de Campoamor, Orihuela Costa: garden and indoor furniture by Life Outdoor Living and SUNS. 2,000 m² showroom, home delivery, English spoken.",
      og: "Outdoor and indoor furniture in Dehesa de Campoamor, Orihuela Costa. A 2,000 m² showroom on two floors.",
    },
    nl: {
      title: "Bella Furniture & Outdoor Campoamor | Tuinmeubels & binnenmeubels",
      desc: "Bella tuinmeubels en binnenmeubels in Dehesa de Campoamor, Orihuela Costa: Life Outdoor Living en SUNS. Showroom van 2.000 m², bezorging aan huis, Nederlandstalige service.",
      og: "Buiten- en binnenmeubelen in Dehesa de Campoamor, Orihuela Costa. Showroom van 2.000 m² op twee verdiepingen.",
    },
  },
  "bali.html": {
    es: {
      title: "Colección Bali: decoración y muebles artesanales | Bella Campoamor",
      desc: "Colección Bali de HomeDecoBali en Bella Furniture & Outdoor, Dehesa de Campoamor: decoración, iluminación y muebles hechos a mano en Bali. Consúltenos o visite la tienda.",
      og: "Decoración, iluminación y muebles hechos a mano en Bali, en Dehesa de Campoamor.",
      crumb: "Colección Bali",
    },
    en: {
      title: "Bali Collection: handmade décor & furniture | Bella Campoamor",
      desc: "The HomeDecoBali Bali collection at Bella Furniture & Outdoor, Dehesa de Campoamor: décor, lighting and furniture handmade in Bali. Ask us or visit the store.",
      og: "Décor, lighting and furniture handmade in Bali, in Dehesa de Campoamor.",
      crumb: "Bali collection",
    },
    nl: {
      title: "Bali-collectie: handgemaakte decoratie & meubels | Bella Campoamor",
      desc: "De Bali-collectie van HomeDecoBali bij Bella Furniture & Outdoor, Dehesa de Campoamor: decoratie, verlichting en meubels, handgemaakt op Bali. Vraag ons of kom langs.",
      og: "Decoratie, verlichting en meubels, handgemaakt op Bali, in Dehesa de Campoamor.",
      crumb: "Bali-collectie",
    },
  },
  "cita.html": {
    es: {
      title: "Pida cita: interiorismo personal en Campoamor | Bella",
      desc: "¿Va a amueblar su casa? Reserve una cita personal en Bella Furniture & Outdoor, Dehesa de Campoamor: atención exclusiva, con un café y sin prisas.",
      og: "Una cita personal para amueblar su casa: atención exclusiva, con un café y sin prisas.",
      crumb: "Pida cita",
    },
    en: {
      title: "Book a visit: personal furnishing advice in Campoamor | Bella",
      desc: "Furnishing your home on the Costa Blanca? Book a personal appointment at Bella Furniture & Outdoor, Dehesa de Campoamor: our full attention, with a coffee and no rush.",
      og: "A personal appointment to furnish your home: our full attention, with a coffee and no rush.",
      crumb: "Book a visit",
    },
    nl: {
      title: "Afspraak maken: persoonlijk inrichtingsadvies in Campoamor | Bella",
      desc: "Uw huis aan de Costa Blanca inrichten? Maak een persoonlijke afspraak bij Bella Furniture & Outdoor in Dehesa de Campoamor: alle aandacht, met koffie en zonder haast.",
      og: "Een persoonlijke afspraak om uw huis in te richten: alle aandacht, met koffie en zonder haast.",
      crumb: "Afspraak maken",
    },
  },
  "bella-group.html": {
    es: {
      title: "Bella Group: Bella Furniture, Bella Outdoor y Bella Kitchens | Altea, Rojales, Campoamor",
      desc: "Qué es Bella Group: Bella Furniture, Bella Outdoor (Life, SUNS) y Bella Kitchens, con exposiciones en Altea, Rojales y Dehesa de Campoamor, en la Costa Blanca.",
      og: "Bella Furniture, Bella Outdoor y Bella Kitchens en Altea, Rojales y Campoamor.",
      crumb: "Bella Group",
    },
    en: {
      title: "Bella Group: Bella Furniture, Bella Outdoor & Bella Kitchens | Altea, Rojales, Campoamor",
      desc: "What is Bella Group? Bella Furniture, Bella Outdoor (Life, SUNS) and Bella Kitchens, with showrooms in Altea, Rojales and Dehesa de Campoamor on the Costa Blanca.",
      og: "Bella Furniture, Bella Outdoor and Bella Kitchens in Altea, Rojales and Campoamor.",
      crumb: "Bella Group",
    },
    nl: {
      title: "Bella Group: Bella Furniture, Bella Outdoor & Bella Kitchens | Altea, Rojales, Campoamor",
      desc: "Wat is Bella Group? Bella Furniture, Bella Outdoor (Life, SUNS) en Bella Kitchens, met showrooms in Altea, Rojales en Dehesa de Campoamor aan de Costa Blanca.",
      og: "Bella Furniture, Bella Outdoor en Bella Kitchens in Altea, Rojales en Campoamor.",
      crumb: "Bella Group",
    },
  },
};

const STORE_DESC = {
  es: "Tienda de muebles de exterior e interior con una exposición de 2.000 m² en dos plantas en Dehesa de Campoamor, Orihuela Costa. Entrega a domicilio.",
  en: "Outdoor and indoor furniture store with a 2,000 m² showroom on two floors in Dehesa de Campoamor, Orihuela Costa. Home delivery.",
  nl: "Winkel in buiten- en binnenmeubelen met een showroom van 2.000 m² op twee verdiepingen in Dehesa de Campoamor, Orihuela Costa. Bezorging aan huis.",
};
const HOME_CRUMB = { es: "Inicio", en: "Home", nl: "Home" };

/* ---------- Vertalingen uit main.js halen ---------- */
const mainJs = fs.readFileSync(path.join(ROOT, "assets/js/main.js"), "utf8");
const tStart = mainJs.indexOf("var T = {");
const tEnd = mainJs.indexOf("\n  };", tStart);
if (tStart < 0 || tEnd < 0) throw new Error("Kon het vertaalobject T niet vinden in main.js");
const T = new Function("return " + mainJs.slice(tStart + 8, tEnd + 4))();

/* ---------- Helpers ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const pageUrl = (lang, page) => SITE + "/" + (lang === "es" ? "" : lang + "/") + (page === "index.html" ? "" : page);

const SEO_RE = /\n?[ \t]*<!-- SEO:START[\s\S]*?<!-- SEO:END -->[ \t]*\n?/;

/** Haalt de oude losse SEO-tags weg (alleen nodig bij de eerste keer) */
function stripLegacyHead(html) {
  return html
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\n?/, "")
    .replace(/[ \t]*<meta name="(description|twitter:[^"]+)"[^>]*>\n?/g, "")
    .replace(/[ \t]*<meta property="og:[^"]+"[^>]*>\n?/g, "")
    .replace(/[ \t]*<link rel="(canonical|alternate)"[^>]*>\n?/g, "")
    .replace(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, "");
}

function faqEntities(html, lang) {
  const out = [];
  for (let i = 1; i <= 30; i++) {
    const qk = "faq.q" + i, ak = "faq.a" + i;
    if (!html.includes(`data-i18n="${qk}"`)) continue;
    const q = translate(qk, lang, html), a = translate(ak, lang, html);
    if (q && a) out.push({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } });
  }
  return out;
}

/** Spaanse tekst staat in de HTML; EN/NL in main.js */
function esText(key, html) {
  const m = new RegExp(`data-i18n="${key.replace(/\./g, "\\.")}"[^>]*>([^<]*)<`).exec(html);
  return m ? decode(m[1]).trim() : "";
}
function translate(key, lang, esHtml) {
  if (lang === "es") return (T.es && T.es[key]) || esText(key, esHtml);
  return (T[lang] && T[lang][key]) || "";
}

function store(lang) {
  return {
    "@type": "FurnitureStore",
    "@id": SITE + "/#store",
    name: "Bella Furniture & Outdoor",
    alternateName: ["Bella", "Bella Outdoor", "Bella Furniture", "Bella Outdoor & Furniture", "Bella Outdoor and Furniture", "Bella Campoamor", "Bella Outside", "Haco Bella"],
    legalName: "Haco Invest SL",
    parentOrganization: { "@id": GROUP_ID },
    description: STORE_DESC[lang],
    url: pageUrl(lang, "index.html"),
    logo: SITE + "/assets/img/bella-logo.png",
    image: [SITE + "/assets/img/og-image.jpg", SITE + "/assets/img/gevel.jpg", SITE + "/assets/img/showroom/exposicion.jpg"],
    telephone: "+34865776925",
    email: "info@bellacampoamor.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Polígono A-2 La Regía Oeste",
      postalCode: "03189",
      addressLocality: "Dehesa de Campoamor, Orihuela Costa",
      addressRegion: "Alicante",
      addressCountry: "ES",
    },
    geo: { "@type": "GeoCoordinates", latitude: 37.9113721, longitude: -0.7436499 },
    hasMap: PLACE_URL,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
    ],
    areaServed: ["Dehesa de Campoamor", "Orihuela Costa", "Campoamor", "La Zenia", "Cabo Roig", "Playa Flamenca", "Torrevieja", "Pilar de la Horadada", "Costa Blanca"].map((n) => ({ "@type": "Place", name: n })),
    knowsLanguage: ["es", "en", "nl", "da", "de"],
    brand: [
      { "@type": "Brand", name: "Life Outdoor Living", alternateName: "LIFE" },
      { "@type": "Brand", name: "SUNS", alternateName: "Suns by Bella" },
      { "@type": "Brand", name: "HomeDecoBali" },
    ],
    employee: { "@type": "Person", name: "Tamara", jobTitle: lang === "es" ? "Directora de tienda" : lang === "nl" ? "Winkelmanager" : "Store manager" },
  };
}

/* Bella Group: op elke pagina (onzichtbaar) als moederorganisatie; op bella-group.html uitgebreid */
const GROUP_ID = SITE + "/bella-group.html#group";
function group(full) {
  const g = {
    "@type": "Organization",
    "@id": GROUP_ID,
    name: "Bella Group",
    alternateName: ["BellaGroup", "Bella Group Costa Blanca"],
    url: "https://bellagroup.es",
    foundingDate: "2005",
  };
  if (!full) return g;
  const shop = (name, street, pc, town, extra) => ({ "@type": "Store", name, address: { "@type": "PostalAddress", streetAddress: street, postalCode: pc, addressLocality: town, addressRegion: "Alicante", addressCountry: "ES" }, ...extra });
  g.subOrganization = [
    { "@id": SITE + "/#store" },
    shop("Bella Altea", "Partida el Planet, 180", "03590", "Altea", { alternateName: ["Bella Furniture & Outdoor Altea", "Bella Kitchens Altea", "Suns by Bella Altea"] }),
    shop("Bella Rojales", "Ctra. Almoradí, km 17,5", "03160", "Rojales", { alternateName: ["Bella Outdoor Rojales", "Bella Kitchens Rojales"] }),
    shop("Bella Rojales – interior", "Av. de los Álamos, 10", "03170", "Rojales", { alternateName: "Bella Furniture Rojales" }),
    { "@type": "Organization", name: "Bella Kitchens", alternateName: ["Belle Kitchens", "Bella Group Kitchens"], url: "https://bellagroup.es/en/areas/kitchens/" },
  ];
  return g;
}

function headBlock(page, lang, esHtml) {
  const m = META[page][lang];
  const url = pageUrl(lang, page);
  const L = [];
  L.push(`<!-- SEO:START – gegenereerd door tools/build-lang.mjs, niet met de hand aanpassen -->`);
  L.push(`<title>${esc(m.title)}</title>`);
  L.push(`<meta name="description" content="${escAttr(m.desc)}">`);
  L.push(`<link rel="canonical" href="${url}">`);
  for (const l of LANGS) L.push(`<link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}">`);
  L.push(`<link rel="alternate" hreflang="x-default" href="${pageUrl("es", page)}">`);
  L.push(`<meta name="theme-color" content="#D57054">`);
  L.push(`<meta property="og:type" content="website">`);
  L.push(`<meta property="og:site_name" content="Bella Furniture &amp; Outdoor">`);
  L.push(`<meta property="og:locale" content="${LOCALE[lang]}">`);
  for (const l of LANGS) if (l !== lang) L.push(`<meta property="og:locale:alternate" content="${LOCALE[l]}">`);
  L.push(`<meta property="og:title" content="${escAttr(m.title)}">`);
  L.push(`<meta property="og:description" content="${escAttr(m.og)}">`);
  L.push(`<meta property="og:url" content="${url}">`);
  L.push(`<meta property="og:image" content="${SITE}/assets/img/og-image.jpg">`);
  L.push(`<meta property="og:image:width" content="1200">`);
  L.push(`<meta property="og:image:height" content="630">`);
  L.push(`<meta property="og:image:alt" content="Bella Furniture &amp; Outdoor · Dehesa de Campoamor">`);
  L.push(`<meta name="twitter:card" content="summary_large_image">`);

  const graph = [store(lang), group(page === "bella-group.html")];
  if (page === "index.html") {
    graph.push({ "@type": "WebSite", "@id": SITE + "/#website", url: SITE + "/", name: "Bella Furniture & Outdoor", inLanguage: LANGS, publisher: { "@id": SITE + "/#store" } });
    const faq = faqEntities(esHtml, lang);
    if (faq.length) graph.push({ "@type": "FAQPage", "@id": url + "#preguntas", inLanguage: lang, mainEntity: faq });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: HOME_CRUMB[lang], item: pageUrl(lang, "index.html") },
        { "@type": "ListItem", position: 2, name: m.crumb, item: url },
      ],
    });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
  L.push(`<script type="application/ld+json">\n${json}\n</script>`);
  L.push(`<!-- SEO:END -->`);
  return L.map((x) => "  " + x).join("\n");
}

function insertHead(html, block) {
  html = SEO_RE.test(html) ? html.replace(SEO_RE, "\n") : stripLegacyHead(html);
  // direct na de viewport-meta
  return html.replace(/(<meta name="viewport"[^>]*>\n)/, `$1${block}\n`);
}

/** Taalkeuze als echte links (crawlbaar) i.p.v. knoppen */
function langSwitch(html, page, lang) {
  const rel = (to) => {
    const file = page === "index.html" ? "" : page;
    if (lang === "es") return to === "es" ? (file || "./") : `${to}/${file}`;
    return to === "es" ? `../${file}` : to === lang ? (file || "./") : `../${to}/${file}`;
  };
  return html.replace(/(<div class="lang"[^>]*>)[\s\S]*?(<\/div>)/, (_, open, close) => {
    const a = LANGS.map((l) =>
      `<a href="${rel(l)}" hreflang="${l}" lang="${l}" data-lang="${l}"${l === lang ? ' aria-current="true"' : ""}>${l.toUpperCase()}</a>`
    ).join("\n          ");
    return `${open}\n          ${a}\n        ${close}`;
  });
}

function translateBody(html, lang, missing) {
  if (lang === "es") return html;
  const tr = (k) => {
    const v = T[lang] && T[lang][k];
    if (!v) missing.add(k);
    return v;
  };
  // tekst
  html = html.replace(/(<([a-z0-9]+)\b[^>]*?\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/gi, (all, open, tag, key, text, close) => {
    const v = tr(key);
    return v ? open + esc(v) + close : all;
  });
  // attributen
  const attr = (dataAttr, real) => {
    html = html.replace(new RegExp(`<[a-z0-9]+\\b[^>]*\\s${dataAttr}="([^"]+)"[^>]*>`, "gi"), (tag, key) => {
      const v = tr(key);
      if (!v) return tag;
      const re = new RegExp(`(\\s${real}=")[^"]*(")`);
      return re.test(tag) ? tag.replace(re, `$1${escAttr(v)}$2`) : tag.replace(/\s*\/?>$/, (end) => ` ${real}="${escAttr(v)}"${end}`);
    });
  };
  attr("data-i18n-alt", "alt");
  attr("data-i18n-aria", "aria-label");
  attr("data-i18n-title", "title");
  attr("data-i18n-ph", "placeholder");
  html = html.replace(/<html lang="es">/, `<html lang="${lang}">`);
  html = html.replace(/(<input type="hidden" name="language" value=")es(")/g, `$1${lang}$2`);
  return html;
}

/** Paden voor pagina's in /en/ en /nl/ */
function rebase(html) {
  return html
    .replace(/((?:src|href|poster|data-full|srcset)=")assets\//g, "$1../assets/")
    .replace(/(,\s*)assets\//g, "$1../assets/")
    .replace(/(href=")(aviso-legal\.html|privacidad\.html)/g, "$1../$2");
}

/* ---------- Bouwen ---------- */
const missing = new Set();
for (const page of PAGES) {
  const file = path.join(ROOT, page);
  let es = fs.readFileSync(file, "utf8");
  es = es.replace(/href="index\.html(#|")/g, (_, c) => `href="./${c === '"' ? '"' : c}`);
  const esOut = langSwitch(insertHead(es, headBlock(page, "es", es)), page, "es");
  fs.writeFileSync(file, esOut);

  for (const lang of ["en", "nl"]) {
    let h = translateBody(esOut, lang, missing);
    h = insertHead(h, headBlock(page, lang, esOut));
    h = langSwitch(h, page, lang);
    h = rebase(h);
    fs.mkdirSync(path.join(ROOT, lang), { recursive: true });
    fs.writeFileSync(path.join(ROOT, lang, page), h);
  }
}

/* ---------- sitemap.xml ---------- */
const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const page of PAGES) {
  for (const lang of LANGS) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl("es", page)}"/>`).join("\n");
    urls.push(`  <url>\n    <loc>${pageUrl(lang, page)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`);
  }
}
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);

if (missing.size) console.warn("Let op – geen vertaling in main.js voor:", [...missing].sort().join(", "));
console.log(`Klaar: ${PAGES.length} pagina's × ${LANGS.length} talen + sitemap.xml`);
