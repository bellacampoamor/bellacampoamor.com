/* Bella Furniture & Outdoor – interactieve extra's
   1. Open/gesloten-status (live, tijdzone Europe/Madrid)
   2. Merk-pop-ups met "Plan uw bezoek" en "Vraag advies"
   3. Reviewcarrousel (losse quotes uit assets/js/reviews.js; sectie blijft verborgen zolang die leeg is)
   4. Sticky knop "Offerte aanvragen" op mobiel
   5. Subtiele scroll-animaties (uit bij prefers-reduced-motion) */
(function () {
  "use strict";

  var L = {
    es: {
      open: "Abierto ahora · hasta las {t}",
      soon: "Cierra pronto · a las {t}",
      today: "Cerrado ahora · abre hoy a las {t}",
      tomorrow: "Cerrado ahora · abre mañana a las {t}",
      day: "Cerrado ahora · abre el {d} a las {t}",
      days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      advice: "Hola, me gustaría recibir asesoramiento sobre {b}. ",
      prev: "Anterior", next: "Siguiente", go: "Ir a la opinión {n}", close: "Cerrar"
    },
    en: {
      open: "Open now · until {t}",
      soon: "Closing soon · at {t}",
      today: "Closed now · opens today at {t}",
      tomorrow: "Closed now · opens tomorrow at {t}",
      day: "Closed now · opens {d} at {t}",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      advice: "Hello, I would like some advice about {b}. ",
      prev: "Previous", next: "Next", go: "Go to review {n}", close: "Close"
    },
    nl: {
      open: "Nu open · tot {t}",
      soon: "Sluit bijna · om {t}",
      today: "Nu gesloten · vandaag open vanaf {t}",
      tomorrow: "Nu gesloten · morgen open vanaf {t}",
      day: "Nu gesloten · {d} open vanaf {t}",
      days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
      advice: "Hallo, ik wil graag advies over {b}. ",
      prev: "Vorige", next: "Volgende", go: "Ga naar review {n}", close: "Sluiten"
    }
  };

  // Merkverhalen (ES/EN/NL)
  var BRANDS = {
    life: {
      name: "Life Outdoor Living", logo: "assets/img/brands/life.png", type: "furniture",
      es: "Conjuntos lounge, de comedor y tumbonas con un diseño atemporal. Materiales elegidos para el uso en exterior y fáciles de mantener.",
      en: "Lounge sets, dining sets and sun loungers with a timeless design. Materials chosen for outdoor use and easy to look after.",
      nl: "Loungesets, diningsets en ligbedden met een tijdloos design. Materialen gekozen voor buitengebruik en makkelijk te onderhouden."
    },
    suns: {
      name: "SUNS", logo: "assets/img/brands/suns.png", type: "furniture",
      es: "Muebles de jardín y lounge con un diseño contemporáneo, para terraza, jardín y piscina. Combinaciones de materiales y colores para cada estilo.",
      en: "Garden and lounge furniture with a contemporary design, for terrace, garden and pool. Combinations of materials and colours for every style.",
      nl: "Tuin- en loungemeubelen met een eigentijds design, voor terras, tuin en zwembad. Combinaties van materialen en kleuren voor elke stijl."
    }
  };
  var POINTS = {
    furniture: {
      es: ["Pruebe la comodidad de los asientos en persona", "Vea y toque los materiales y colores", "Le aconsejamos sobre medidas y combinaciones para su terraza"],
      en: ["Try the seating comfort in person", "See and feel the materials and colours", "We advise you on sizes and combinations for your terrace"],
      nl: ["Test het zitcomfort in het echt", "Bekijk en voel de materialen en kleuren", "We adviseren u over maten en combinaties voor uw terras"]
    }
  };

  function lang() { var l = window.BELLA_LANG || document.documentElement.lang || "es"; return L[l] ? l : "es"; }
  function s(k, v) {
    var x = L[lang()][k];
    return v ? x.replace(/\{(\w)\}/g, function (_, n) { return v[n] == null ? "" : v[n]; }) : x;
  }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Open / gesloten ---------- */
  // dag (0 = zondag) -> [open, dicht] in minuten; null = gesloten
  var HOURS = [null, [600, 1080], [600, 1080], [600, 1080], [600, 1080], [600, 1080], [600, 840]];
  function hhmm(m) { return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }

  function madridNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      return { day: day, min: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) {
      var d = new Date(); return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function status() {
    var n = madridNow(), h = HOURS[n.day];
    if (h && n.min >= h[0] && n.min < h[1]) {
      return { open: true, text: s(h[1] - n.min <= 45 ? "soon" : "open", { t: hhmm(h[1]) }), day: n.day };
    }
    if (h && n.min < h[0]) return { open: false, text: s("today", { t: hhmm(h[0]) }), day: n.day };
    for (var i = 1; i <= 7; i++) {
      var d = (n.day + i) % 7;
      if (HOURS[d]) return { open: false, text: s(i === 1 ? "tomorrow" : "day", { t: hhmm(HOURS[d][0]), d: L[lang()].days[d] }), day: n.day };
    }
  }

  var badges = document.querySelectorAll("[data-open-status]");
  function paintStatus() {
    var st = status(); if (!st) return;
    badges.forEach(function (b) {
      b.hidden = false;
      b.classList.toggle("is-open", st.open);
      b.querySelector(".os-text").textContent = st.text;
    });
    // Vandaag markeren in de tabel met openingstijden
    var row = st.day === 0 ? 2 : st.day === 6 ? 1 : 0;
    document.querySelectorAll(".hours tr").forEach(function (tr, i) { tr.classList.toggle("today", i === row); });
  }
  if (badges.length) { paintStatus(); setInterval(paintStatus, 60000); }

  /* ---------- 2. Merk-pop-ups ---------- */
  var bdlg = document.getElementById("brand-dlg");
  var currentBrand = null;
  function fillBrand() {
    var b = BRANDS[currentBrand]; if (!b || !bdlg) return;
    var l = lang();
    bdlg.querySelector(".bd-logo").innerHTML = '<img src="' + b.logo + '" alt="' + b.name + '" loading="lazy" decoding="async">';
    bdlg.querySelector(".bd-name").textContent = b.name;
    bdlg.querySelector(".bd-text").textContent = b[l];
    bdlg.querySelector(".bd-points").innerHTML = POINTS[b.type][l].map(function (p) { return "<li>" + p + "</li>"; }).join("");
    bdlg.querySelector(".enq-close").setAttribute("aria-label", s("close"));
  }
  function closeBrand() { if (bdlg.close) bdlg.close(); else bdlg.removeAttribute("open"); }
  if (bdlg) {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest("[data-brand]");
      if (!btn) return;
      currentBrand = btn.getAttribute("data-brand");
      fillBrand();
      if (bdlg.showModal) bdlg.showModal(); else bdlg.setAttribute("open", "");
    });
    bdlg.querySelector(".enq-close").addEventListener("click", closeBrand);
    bdlg.addEventListener("click", function (e) { if (e.target === bdlg) closeBrand(); });
    bdlg.querySelector(".bd-visit").addEventListener("click", closeBrand);
    bdlg.querySelector(".bd-advice").addEventListener("click", function () {
      closeBrand();
      var msg = document.querySelector('#contact-form textarea[name="message"]');
      if (msg && currentBrand) {
        var pre = s("advice", { b: BRANDS[currentBrand].name });
        if (msg.value.indexOf(pre) !== 0) msg.value = pre + msg.value;
        setTimeout(function () { msg.focus({ preventScroll: true }); msg.setSelectionRange(msg.value.length, msg.value.length); }, 400);
      }
    });
  }

  /* ---------- 3. Reviews ---------- */
  var rsec = document.getElementById("opiniones");
  var reviews = (window.BELLA_REVIEWS || []).filter(function (r) { return r && r.quote; });
  if (rsec && reviews.length) {
    var track = rsec.querySelector(".rv-track");
    var dots = rsec.querySelector(".rv-dots");
    function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
    track.innerHTML = reviews.map(function (r, i) {
      return '<figure class="review" id="rv-' + i + '"' + (r.lang ? ' lang="' + esc(r.lang) + '"' : "") + '>' +
        '<svg class="rv-mark" viewBox="0 0 32 24" aria-hidden="true"><path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12H19z"/></svg>' +
        "<blockquote><p>" + esc(r.quote) + "</p></blockquote>" +
        "<figcaption><strong>" + esc(r.author || "") + "</strong>" + (r.source ? "<span>" + esc(r.source) + "</span>" : "") + "</figcaption></figure>";
    }).join("");
    rsec.hidden = false;

    var items = track.children;
    function perView() { var w = items[0].getBoundingClientRect().width || 1; return Math.max(1, Math.round(track.clientWidth / w)); }
    function pages() { return Math.max(1, items.length - perView() + 1); }
    function index() { return Math.round(track.scrollLeft / ((items[0].getBoundingClientRect().width || 1) + parseFloat(getComputedStyle(track).columnGap || 0))); }
    function go(i) {
      var n = pages(); i = (i + n) % n;
      track.scrollTo({ left: items[i].offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    }
    function paintDots() {
      var n = pages(), cur = Math.min(index(), n - 1);
      dots.hidden = n < 2;
      rsec.querySelectorAll(".rv-nav button").forEach(function (b) { b.hidden = n < 2; });
      if (dots.children.length !== n) {
        dots.innerHTML = "";
        for (var i = 0; i < n; i++) {
          var b = document.createElement("button");
          b.type = "button"; b.setAttribute("data-i", i);
          dots.appendChild(b);
        }
      }
      Array.prototype.forEach.call(dots.children, function (b, i) {
        b.setAttribute("aria-label", s("go", { n: i + 1 }));
        b.setAttribute("aria-current", i === cur ? "true" : "false");
      });
      rsec.querySelector(".rv-prev").setAttribute("aria-label", s("prev"));
      rsec.querySelector(".rv-next").setAttribute("aria-label", s("next"));
    }
    dots.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { go(+b.getAttribute("data-i")); restart(); } });
    rsec.querySelector(".rv-prev").addEventListener("click", function () { go(index() - 1); restart(); });
    rsec.querySelector(".rv-next").addEventListener("click", function () { go(index() + 1); restart(); });
    var sTimer; track.addEventListener("scroll", function () { clearTimeout(sTimer); sTimer = setTimeout(paintDots, 80); }, { passive: true });
    window.addEventListener("resize", paintDots);
    document.addEventListener("bella:lang", paintDots);
    paintDots();

    // Automatisch doorschuiven; pauze bij hover/focus, als de sectie uit beeld is, of bij reduced motion
    var timer = null, paused = false, visible = false;
    function tick() { if (!paused && visible && !document.hidden) go(index() + 1); }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(tick, 7000); }
    rsec.addEventListener("mouseenter", function () { paused = true; });
    rsec.addEventListener("mouseleave", function () { paused = false; });
    rsec.addEventListener("focusin", function () { paused = true; });
    rsec.addEventListener("focusout", function () { paused = false; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: .4 }).observe(rsec);
    } else visible = true;
    restart();
  }

  /* ---------- 4. Sticky knop (mobiel) ---------- */
  var sticky = document.querySelector(".sticky-cta");
  if (sticky) {
    sticky.hidden = false;
    var contact = document.getElementById("contacto");
    var footer = document.querySelector(".site-footer");
    var blocked = false;
    function paintSticky() {
      var show = window.scrollY > 480 && !blocked;
      sticky.classList.toggle("is-visible", show);
      document.body.classList.toggle("sticky-on", show);
    }
    if ("IntersectionObserver" in window) {
      var seen = new Map();
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) { seen.set(x.target, x.isIntersecting); });
        blocked = Array.from(seen.values()).some(Boolean);
        paintSticky();
      }, { threshold: 0 });
      [contact, footer].forEach(function (el) { if (el) io.observe(el); });
    }
    window.addEventListener("scroll", paintSticky, { passive: true });
    paintSticky();
  }

  /* ---------- 5. Scroll-animaties ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    var sel = [
      ".section .eyebrow", ".section h2", ".section .prose", ".card", ".brand-card", ".brands-note",
      ".map", ".info > div", ".storefront", "#contacto .form", ".rv-track", ".bali-head .btn",
      ".sg-item", ".sg-filters", ".band-inner"
    ].join(",");
    var els = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) { return !el.closest(".hero, dialog"); });
    var rv = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        var el = x.target;
        el.classList.add("is-in"); rv.unobserve(el);
        // Na de animatie de klassen weghalen, zodat hover-effecten weer hun eigen (snelle) transitie hebben
        setTimeout(function () { el.classList.remove("reveal", "is-in"); el.style.removeProperty("--d"); }, 900 + (parseInt(el.style.getPropertyValue("--d"), 10) || 0));
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    els.forEach(function (el) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      if (el.matches(".card, .brand-card, .info > div, .sg-item")) el.style.setProperty("--d", Math.min(sib, 5) * 90 + "ms");
      el.classList.add("reveal");
      rv.observe(el);
    });
  }

  document.addEventListener("bella:lang", function () {
    if (badges.length) paintStatus();
    if (bdlg && bdlg.open) fillBrand();
  });
})();
