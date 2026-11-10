/* Bella Furniture & Outdoor – menu, talen (ES/EN/NL) en contactformulier */
(function () {
  "use strict";

  var T = {
    en: {
      "skip": "Skip to content",
      "menu": "Menu",
      "status.hours": "Mon–Fri 10:00–18:00 · Sat 10:00–14:00",
      "nav.offer": "What we offer",
      "nav.showroom": "The store",
      "nav.faq": "FAQ",
      "nav.visit": "Visit us",
      "nav.contact": "Contact",
      "hero.eyebrow": "Dehesa de Campoamor · Orihuela Costa",
      "hero.title": "Outdoor living, Mediterranean style",
      "hero.lead": "Outdoor and indoor furniture across 1,400 m² on two floors. Come and see, feel and try: we take the time to advise you, in your language.",
      "hero.cta1": "Visit the store",
      "hero.cta2": "Look inside the store",
      "hero.badge": "of showroom on two floors",
      "trust.label": "Why Bella",
      "trust.1t": "1,400 m²", "trust.1p": "on two floors",
      "trust.2t": "See and try", "trust.2p": "before you buy",
      "trust.3t": "Home", "trust.3p": "delivery",
      "trust.4t": "ES · EN · NL", "trust.4p": "we speak your language",
      "offer.eyebrow": "What we offer",
      "offer.title": "Everything for living inside and out",
      "offer.p": "Everything you see here is on display in our store. Come and sit down, feel the fabrics and compare.",
      "offer.out": "Outdoor",
      "offer.in": "Indoor",
      "offer.o1.t": "Lounge sets", "offer.o1.p": "Modular sofas, armchairs and coffee tables for your terrace or garden.",
      "offer.o2.t": "Outdoor dining", "offer.o2.p": "Tables and chairs for eating outdoors, from Sunday paella to dinner with friends.",
      "offer.o3.t": "Sunbeds & parasols", "offer.o3.p": "For pool and terrace: relax in the sun, with shade whenever you need it.",
      "offer.i1.t": "Sofas & armchairs", "offer.i1.p": "Comfortable seating with a Mediterranean touch for your living room.",
      "offer.i2.t": "Bedroom", "offer.i2.p": "Beds and mattresses for a good night's sleep, in your holiday home too.",
      "offer.i3.t": "Dining & decoration", "offer.i3.p": "Tables, chairs, lamps and accessories that give your home character.",
      "about.eyebrow": "About us",
      "about.title": "Your terrace, our passion",
      "about.p1": "At Bella we help you create an outdoor and indoor space you love to be in. From a sunny terrace to a cosy living room: we take the time to give you expert advice.",
      "about.p2": "Tamara Verschoor and her team welcome you in the store, in Spanish, English or Dutch.",
      "usp.1t": "Materials made for the coast", "usp.1p": "Sun, salt and wind: we recommend frames, fabrics and finishes that last, and explain how to look after them.",
      "usp.2t": "See, feel and try", "usp.2p": "No buying blind: across 1,400 m² you can sit on every sofa and compare colours in daylight.",
      "usp.3t": "Home delivery", "usp.3p": "We deliver your furniture to Campoamor, Orihuela Costa, La Zenia, Torrevieja and the surrounding area.",
      "usp.4t": "Personal advice", "usp.4p": "We help you choose what suits your space, your style and your budget.",
      "show.eyebrow": "The store",
      "show.title": "Take a walk through the store",
      "show.p": "One minute inside our store in Dehesa de Campoamor: the outdoor floor, the living-room corners and the bedroom department.",
      "show.video": "Video: a walk through the Bella store in Dehesa de Campoamor",
      "show.play": "Watch the video (1 min)",
      "rev.eyebrow": "Reviews",
      "rev.title": "What our customers say",
      "rev.1": "“Stylish, different furniture and very friendly personal service.”",
      "rev.2": "“Beautiful, quality furniture and excellent service!”",
      "rev.src": "Google review",
      "rev.more": "All reviews on Google",
      "faq.eyebrow": "Frequently asked questions",
      "faq.title": "Good to know",
      "faq.p": "Can't find your question? Call or write to us.",
      "faq.q1": "Do you deliver to my home?", "faq.a1": "Yes. We deliver your furniture to Dehesa de Campoamor, Orihuela Costa, La Zenia, Torrevieja and the surrounding area. Ask us about the conditions for your address.",
      "faq.q2": "Can I see and try the furniture before buying?", "faq.a2": "Yes. In our 1,400 m² store on two floors you can sit down, feel the materials and compare colours in person.",
      "faq.q3": "Do I need an appointment to visit?", "faq.a3": "No. You are welcome without an appointment Monday to Friday 10:00–18:00 and Saturday 10:00–14:00.",
      "faq.q4": "Which materials withstand the coastal climate?", "faq.a4": "Sun, salt and wind call for the right materials. In the store we explain which frames, fabrics and finishes hold up best on your terrace, and how to maintain them.",
      "faq.q5": "Which languages do you speak?", "faq.a5": "We help you in Spanish, English and Dutch – in the store, by phone and by e-mail.",
      "about.map": "Map: Bella Furniture & Outdoor, Polígono A-2 La Regía Oeste, Dehesa de Campoamor",
      "about.mapLink": "View larger map",
      "hours.mf": "Monday to Friday",
      "hours.sat": "Saturday",
      "hours.sun": "Sunday",
      "hours.closed": "Closed",
      "visit.eyebrow": "Visit us",
      "visit.title": "Drop by the store",
      "visit.p": "The best way to choose furniture is to see it in person. We look forward to welcoming you in Dehesa de Campoamor, close to La Zenia and Torrevieja.",
      "visit.address": "Address",
      "visit.hours": "Opening hours",
      "visit.route": "Get directions",
      "visit.call": "Call the store",
      "visit.photo": "Storefront of Bella Outdoor & Furniture in Dehesa de Campoamor",
      "contact.eyebrow": "Contact",
      "contact.title": "Any questions?",
      "contact.p": "Call us or send us a message. We reply in Spanish, English or Dutch.",
      "contact.phone": "Phone",
      "form.name": "Name",
      "form.email": "E-mail",
      "form.phone": "Phone (optional)",
      "form.topic": "Subject",
      "form.t1": "Advice", "form.t2": "Quote", "form.t3": "Home delivery", "form.t4": "Store visit", "form.t5": "Other question",
      "form.message": "Message",
      "form.privacy": "I agree to my data being used to answer my enquiry.",
      "form.send": "Send",
      "form.sending": "Sending…",
      "form.ok": "Thank you! We will get back to you soon.",
      "form.error": "Please fill in your name, a valid e-mail, a message and accept the privacy terms.",
      "form.fail": "Something went wrong. Please try again or contact us by phone.",
      "bar.label": "Quick actions", "bar.call": "Call", "bar.route": "Directions", "bar.mail": "Message",
      "legal.notice": "Legal notice",
      "legal.privacy": "Privacy policy",
      "img.hero": "Outdoor living corner with white sofas and wicker lamps in the Bella store in Dehesa de Campoamor",
      "img.lounge": "Light-coloured outdoor lounge set", "img.dining": "Outdoor dining tables and chairs",
      "img.shade": "Large parasol over an outdoor lounge set", "img.sofas": "Upholstered armchair with cushion and round mirror",
      "img.bedroom": "Beds and bedside lamps in the bedroom department", "img.indoor": "Indoor dining table with upholstered chairs and decoration",
      "img.g1": "Outdoor floor with lounge sets, dining sets and plants", "img.g2": "Warm corner with wicker lamps and white armchairs",
      "img.g3": "Green and white outdoor sofas under a parasol", "img.g4": "Lamps, cushions and decoration on the indoor floor",
      "open.now": "Open now · until {t}", "open.later": "Closed · opens today at {t}", "open.next": "Closed · opens {d} at 10:00",
      "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "tomorrow": "tomorrow",
      "topic": "Subject"
    },
    nl: {
      "skip": "Naar de inhoud",
      "menu": "Menu",
      "status.hours": "Ma–vr 10:00–18:00 · Za 10:00–14:00",
      "nav.offer": "Wat we bieden",
      "nav.showroom": "De winkel",
      "nav.faq": "Vragen",
      "nav.visit": "Bezoek ons",
      "nav.contact": "Contact",
      "hero.eyebrow": "Dehesa de Campoamor · Orihuela Costa",
      "hero.title": "Buiten leven in mediterrane stijl",
      "hero.lead": "Buiten- en binnenmeubelen op 1.400 m², verdeeld over twee verdiepingen. Kom kijken, voelen en proberen: we adviseren u rustig, in uw eigen taal.",
      "hero.cta1": "Bezoek de winkel",
      "hero.cta2": "Kijk in de winkel",
      "hero.badge": "showroom op twee verdiepingen",
      "trust.label": "Waarom Bella",
      "trust.1t": "1.400 m²", "trust.1p": "op twee verdiepingen",
      "trust.2t": "Zien en proberen", "trust.2p": "voordat u koopt",
      "trust.3t": "Bezorging", "trust.3p": "aan huis",
      "trust.4t": "ES · EN · NL", "trust.4p": "we spreken uw taal",
      "offer.eyebrow": "Wat we bieden",
      "offer.title": "Alles voor binnen en buiten",
      "offer.p": "Alles wat u hier ziet, staat in onze winkel. Kom zitten, voel de stoffen en vergelijk.",
      "offer.out": "Buiten",
      "offer.in": "Binnen",
      "offer.o1.t": "Loungesets", "offer.o1.p": "Modulaire banken, fauteuils en salontafels voor uw terras of tuin.",
      "offer.o2.t": "Buiten eten", "offer.o2.p": "Tafels en stoelen om buiten te eten, van de paella op zondag tot een diner met vrienden.",
      "offer.o3.t": "Ligbedden en parasols", "offer.o3.p": "Voor zwembad en terras: relaxen in de zon, met schaduw wanneer u wilt.",
      "offer.i1.t": "Banken en fauteuils", "offer.i1.p": "Comfortabele zitmeubelen met een mediterrane touch voor uw woonkamer.",
      "offer.i2.t": "Slaapkamer", "offer.i2.p": "Bedden en matrassen om goed te slapen, ook in uw vakantiewoning.",
      "offer.i3.t": "Eetkamer en decoratie", "offer.i3.p": "Tafels, stoelen, lampen en accessoires die uw huis karakter geven.",
      "about.eyebrow": "Over ons",
      "about.title": "Uw terras, onze passie",
      "about.p1": "Bij Bella helpen we u een buiten- en binnenruimte te creëren waar u graag bent. Van een zonnig terras tot een gezellige woonkamer: we adviseren u rustig en met kennis van zaken.",
      "about.p2": "Tamara Verschoor en haar team heten u welkom in de winkel, in het Spaans, Engels of Nederlands.",
      "usp.1t": "Materialen voor de kust", "usp.1p": "Zon, zout en wind: we raden frames, stoffen en afwerkingen aan die lang meegaan, en leggen uit hoe u ze onderhoudt.",
      "usp.2t": "Zien, voelen en proberen", "usp.2p": "Niet blind kopen: op 1.400 m² zit u op elke bank en vergelijkt u kleuren bij daglicht.",
      "usp.3t": "Bezorging aan huis", "usp.3p": "We bezorgen uw meubelen in Campoamor, Orihuela Costa, La Zenia, Torrevieja en omgeving.",
      "usp.4t": "Persoonlijk advies", "usp.4p": "We helpen u kiezen wat past bij uw ruimte, uw stijl en uw budget.",
      "show.eyebrow": "De winkel",
      "show.title": "Wandel door de winkel",
      "show.p": "Eén minuut door onze winkel in Dehesa de Campoamor: de buitenverdieping, de zithoeken en de slaapkamerafdeling.",
      "show.video": "Video: een wandeling door de Bella-winkel in Dehesa de Campoamor",
      "show.play": "Bekijk de video (1 min)",
      "rev.eyebrow": "Reviews",
      "rev.title": "Wat onze klanten zeggen",
      "rev.1": "“Stijlvolle, andere meubelen en een heel vriendelijke, persoonlijke service.”",
      "rev.2": "“Mooie meubelen van goede kwaliteit en een uitstekende service!”",
      "rev.src": "Google-review",
      "rev.more": "Alle reviews op Google",
      "faq.eyebrow": "Veelgestelde vragen",
      "faq.title": "Goed om te weten",
      "faq.p": "Staat uw vraag er niet bij? Bel of mail ons.",
      "faq.q1": "Bezorgen jullie aan huis?", "faq.a1": "Ja. We bezorgen uw meubelen in Dehesa de Campoamor, Orihuela Costa, La Zenia, Torrevieja en omgeving. Vraag ons naar de voorwaarden voor uw adres.",
      "faq.q2": "Kan ik de meubelen zien en proberen voordat ik koop?", "faq.a2": "Ja. In onze winkel van 1.400 m² op twee verdiepingen kunt u zitten, de materialen voelen en kleuren in het echt vergelijken.",
      "faq.q3": "Moet ik een afspraak maken?", "faq.a3": "Nee. U bent zonder afspraak welkom van maandag t/m vrijdag 10:00–18:00 en op zaterdag 10:00–14:00.",
      "faq.q4": "Welke materialen kunnen tegen het kustklimaat?", "faq.a4": "Zon, zout en wind vragen om de juiste materialen. In de winkel leggen we uit welke frames, stoffen en afwerkingen het best standhouden op uw terras, en hoe u ze onderhoudt.",
      "faq.q5": "In welke talen kunnen jullie me helpen?", "faq.a5": "We helpen u in het Spaans, Engels en Nederlands – in de winkel, telefonisch en per e-mail.",
      "about.map": "Kaart: Bella Furniture & Outdoor, Polígono A-2 La Regía Oeste, Dehesa de Campoamor",
      "about.mapLink": "Grotere kaart bekijken",
      "hours.mf": "Maandag t/m vrijdag",
      "hours.sat": "Zaterdag",
      "hours.sun": "Zondag",
      "hours.closed": "Gesloten",
      "visit.eyebrow": "Bezoek ons",
      "visit.title": "Kom langs in de winkel",
      "visit.p": "Meubelen kiest u het best door ze in het echt te zien. We verwelkomen u graag in Dehesa de Campoamor, vlak bij La Zenia en Torrevieja.",
      "visit.address": "Adres",
      "visit.hours": "Openingstijden",
      "visit.route": "Routebeschrijving",
      "visit.call": "Bel de winkel",
      "visit.photo": "Gevel van de winkel Bella Outdoor & Furniture in Dehesa de Campoamor",
      "contact.eyebrow": "Contact",
      "contact.title": "Heeft u een vraag?",
      "contact.p": "Bel ons of stuur een bericht. We antwoorden in het Spaans, Engels of Nederlands.",
      "contact.phone": "Telefoon",
      "form.name": "Naam",
      "form.email": "E-mail",
      "form.phone": "Telefoon (optioneel)",
      "form.topic": "Onderwerp",
      "form.t1": "Advies", "form.t2": "Offerte", "form.t3": "Bezorging aan huis", "form.t4": "Winkelbezoek", "form.t5": "Andere vraag",
      "form.message": "Bericht",
      "form.privacy": "Ik ga akkoord met het gebruik van mijn gegevens om mijn vraag te beantwoorden.",
      "form.send": "Versturen",
      "form.sending": "Bezig met versturen…",
      "form.ok": "Bedankt! We nemen snel contact met u op.",
      "form.error": "Vul uw naam, een geldig e-mailadres en een bericht in en accepteer de privacyvoorwaarden.",
      "form.fail": "Er ging iets mis. Probeer het opnieuw of neem telefonisch contact op.",
      "bar.label": "Snelle acties", "bar.call": "Bellen", "bar.route": "Route", "bar.mail": "Bericht",
      "legal.notice": "Juridische informatie",
      "legal.privacy": "Privacybeleid",
      "img.hero": "Buitenzithoek met witte banken en rieten lampen in de Bella-winkel in Dehesa de Campoamor",
      "img.lounge": "Lichte loungeset voor buiten", "img.dining": "Buitentafels en -stoelen",
      "img.shade": "Grote parasol boven een loungeset", "img.sofas": "Beklede fauteuil met kussen en ronde spiegel",
      "img.bedroom": "Bedden en nachtlampjes op de slaapkamerafdeling", "img.indoor": "Eettafel voor binnen met beklede stoelen en decoratie",
      "img.g1": "Buitenverdieping met loungesets, eethoeken en planten", "img.g2": "Warme hoek met rieten lampen en witte fauteuils",
      "img.g3": "Groen-witte buitenbanken onder een parasol", "img.g4": "Lampen, kussens en decoratie op de binnenverdieping",
      "open.now": "Nu open · tot {t}", "open.later": "Gesloten · vandaag open om {t}", "open.next": "Gesloten · {d} open om 10:00",
      "days": ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"], "tomorrow": "morgen",
      "topic": "Onderwerp"
    },
    es: {
      "form.sending": "Enviando…",
      "form.ok": "¡Gracias! Le responderemos pronto.",
      "form.error": "Rellene su nombre, un e-mail válido y un mensaje, y acepte la política de privacidad.",
      "form.fail": "Algo salió mal. Inténtelo de nuevo o contáctenos por teléfono.",
      "open.now": "Abierto ahora · hasta las {t}", "open.later": "Cerrado · abrimos hoy a las {t}", "open.next": "Cerrado · abrimos el {d} a las 10:00",
      "days": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], "tomorrow": "mañana",
      "topic": "Asunto"
    }
  };

  // Spaanse teksten staan in de HTML: bewaar ze als origineel
  var nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in T.es)) T.es[k] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-aria");
    if (!(k in T.es)) T.es[k] = el.getAttribute("aria-label") || "Menú";
  });
  var titles = document.querySelectorAll("[data-i18n-title]");
  titles.forEach(function (el) {
    var k = el.getAttribute("data-i18n-title");
    if (!(k in T.es)) T.es[k] = el.getAttribute("title");
  });
  var alts = document.querySelectorAll("[data-i18n-alt]");
  alts.forEach(function (el) {
    var k = el.getAttribute("data-i18n-alt");
    if (!(k in T.es)) T.es[k] = el.getAttribute("alt");
  });

  var current = "es";
  function t(k) { return (T[current] && T[current][k]) || T.es[k] || ""; }

  // Open/gesloten (tijdzone Madrid). Feestdagen worden niet meegenomen.
  var SCHED = { 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 18], 6: [10, 14] };
  function madridNow() {
    try {
      var p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: wd, h: (+o.hour % 24) + (+o.minute) / 60 };
    } catch (e) { var n = new Date(); return { d: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  function updateOpen() {
    var box = document.getElementById("open-status");
    if (!box) return;
    var now = madridNow(), today = SCHED[now.d], txt, open = false;
    if (today && now.h >= today[0] && now.h < today[1]) { open = true; txt = t("open.now").replace("{t}", today[1] + ":00"); }
    else if (today && now.h < today[0]) { txt = t("open.later").replace("{t}", today[0] + ":00"); }
    else {
      var n = (now.d + 1) % 7; while (!SCHED[n]) n = (n + 1) % 7;
      var label = n === (now.d + 1) % 7 ? t("tomorrow") : t("days")[n];
      txt = t("open.next").replace("{d}", label);
      if (current === "es" && n === (now.d + 1) % 7) txt = txt.replace("el " + label, label);
    }
    box.classList.toggle("is-open", open);
    box.classList.toggle("is-closed", !open);
    box.querySelector(".status-text").textContent = txt;
    document.querySelectorAll(".hours tr[data-days]").forEach(function (tr) {
      var r = tr.getAttribute("data-days").split("-").map(Number);
      var hit = r.length > 1 ? now.d >= r[0] && now.d <= r[1] : now.d === r[0];
      tr.classList.toggle("today", hit);
    });
  }

  function setLang(lang) {
    if (!T[lang]) lang = "es";
    current = lang;
    document.documentElement.lang = lang;
    nodes.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    titles.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-title"));
      if (v) el.setAttribute("title", v);
    });
    alts.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-alt"));
      if (v) el.setAttribute("alt", v);
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var hidden = document.querySelector('#contact-form input[name="language"]');
    if (hidden) hidden.value = lang;
    updateOpen();
    try { localStorage.setItem("bella-lang", lang); } catch (e) {}
    try {
      var url = new URL(location.href);
      if (lang === "es") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch (e) {}
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  var initial = "es";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    var stored = localStorage.getItem("bella-lang");
    if (q && T[q]) initial = q;
    else if (stored && T[stored]) initial = stored;
  } catch (e) {}
  setLang(initial);

  // Mobiel menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  // Header compact bij scrollen
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Video: pas laden bij klikken
  var vbox = document.getElementById("video");
  if (vbox) {
    var v = vbox.querySelector("video"), vb = vbox.querySelector(".video-play");
    v.removeAttribute("controls");
    vb.addEventListener("click", function () {
      vbox.classList.add("playing"); v.setAttribute("controls", ""); v.play();
    });
    v.addEventListener("play", function () { vbox.classList.add("playing"); });
  }

  // Actieve sectie in het menu
  if ("IntersectionObserver" in window) {
    var links = {};
    document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var a = links[e.target.id]; if (!a) return;
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
          a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  // Jaartal
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Contactformulier
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var cfg = window.BELLA_CONFIG || {};
    function show(msg, cls) { status.textContent = msg; status.className = "form-status " + (cls || ""); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var email = String(d.get("email") || "").trim();
      if (!String(d.get("name") || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          !String(d.get("message") || "").trim() || !d.get("privacy")) {
        show(t("form.error"), "error");
        return;
      }
      var data = {
        name: d.get("name"), email: email, phone: d.get("phone"),
        message: "[" + t("topic") + ": " + (form.querySelector('select[name="topic"] option:checked') || {}).textContent + "]\n\n" + d.get("message"),
        language: current, website: d.get("website") || ""
      };

      if (cfg.contactWebhook) {
        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        show(t("form.sending"));
        fetch(cfg.contactWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          show(t("form.ok"), "ok");
        }).catch(function () {
          show(t("form.fail"), "error");
        }).finally(function () { btn.disabled = false; });
      } else if (cfg.contactEmail) {
        var body = data.message + "\n\n" + data.name + "\n" + data.email + (data.phone ? "\n" + data.phone : "");
        location.href = "mailto:" + cfg.contactEmail +
          "?subject=" + encodeURIComponent("Consulta web – " + data.name) +
          "&body=" + encodeURIComponent(body);
      } else {
        show(t("form.fail"), "error");
      }
    });
  }
})();
