/* Bella Furniture & Outdoor – menu, talen (ES/EN/NL) en contactformulier */
(function () {
  "use strict";

  var T = {
    en: {
      "skip": "Skip to content",
      "menu": "Menu",
      "nav.about": "About us",
      "nav.offer": "What we offer",
      "nav.visit": "Visit us",
      "nav.contact": "Contact",
      "hero.eyebrow": "Dehesa de Campoamor · Orihuela Costa",
      "hero.title": "Outdoor living, Mediterranean style",
      "hero.lead": "Bella Furniture & Outdoor is your store for outdoor and indoor furniture on the Costa Blanca. Come and see, feel and try in our store.",
      "hero.cta1": "Visit the store",
      "hero.cta2": "Get in touch",
      "about.eyebrow": "About us",
      "about.title": "Your terrace, our passion",
      "about.p1": "At Bella we help you create an outdoor and indoor space you love to be in. From a sunny terrace to a cosy living room: we take the time to give you expert advice.",
      "about.p2": "We are a local store in Dehesa de Campoamor and we know the coastal climate: sun, salt and wind. That is why we recommend materials that last.",
      "offer.eyebrow": "What we offer",
      "offer.title": "Everything for living inside and out",
      "offer.c1.t": "Outdoor furniture",
      "offer.c1.p": "Lounge sets, dining tables and sun loungers for terrace, garden and pool.",
      "offer.c2.t": "Shade",
      "offer.c2.p": "Parasols and shade solutions so you can enjoy the outdoors all day.",
      "offer.c3.t": "Indoor furniture",
      "offer.c3.p": "Furniture with a Mediterranean touch for your house or apartment.",
      "offer.c4.t": "Advice",
      "offer.c4.p": "We help you choose what suits your space, your style and your budget.",
      "visit.eyebrow": "Visit us",
      "visit.title": "Drop by the store",
      "visit.p": "The best way to choose furniture is to see it in person. We look forward to welcoming you in our store in Dehesa de Campoamor.",
      "visit.address": "Address",
      "visit.hours": "Opening hours",
      "visit.route": "Get directions",
      "contact.eyebrow": "Contact",
      "contact.title": "Any questions?",
      "contact.p": "Call us, send a WhatsApp or a message. We reply in Spanish, English or Dutch.",
      "contact.phone": "Phone",
      "form.name": "Name",
      "form.email": "E-mail",
      "form.phone": "Phone (optional)",
      "form.message": "Message",
      "form.privacy": "I agree to my data being used to answer my enquiry.",
      "form.send": "Send",
      "form.sending": "Sending…",
      "form.ok": "Thank you! We will get back to you soon.",
      "form.error": "Please fill in your name, a valid e-mail, a message and accept the privacy terms.",
      "form.fail": "Something went wrong. Please try again or contact us by phone or WhatsApp.",
      "legal.notice": "Legal notice",
      "legal.privacy": "Privacy policy"
    },
    nl: {
      "skip": "Naar de inhoud",
      "menu": "Menu",
      "nav.about": "Over ons",
      "nav.offer": "Wat we bieden",
      "nav.visit": "Bezoek ons",
      "nav.contact": "Contact",
      "hero.eyebrow": "Dehesa de Campoamor · Orihuela Costa",
      "hero.title": "Buiten leven in mediterrane stijl",
      "hero.lead": "Bella Furniture & Outdoor is uw winkel voor buiten- en binnenmeubelen aan de Costa Blanca. Kom kijken, voelen en proberen in onze winkel.",
      "hero.cta1": "Bezoek de winkel",
      "hero.cta2": "Neem contact op",
      "about.eyebrow": "Over ons",
      "about.title": "Uw terras, onze passie",
      "about.p1": "Bij Bella helpen we u een buiten- en binnenruimte te creëren waar u graag bent. Van een zonnig terras tot een gezellige woonkamer: we adviseren u rustig en met kennis van zaken.",
      "about.p2": "We zijn een lokale winkel in Dehesa de Campoamor en kennen het kustklimaat: zon, zout en wind. Daarom raden we materialen aan die tegen een stootje kunnen.",
      "offer.eyebrow": "Wat we bieden",
      "offer.title": "Alles voor binnen en buiten",
      "offer.c1.t": "Buitenmeubelen",
      "offer.c1.p": "Loungesets, eettafels en ligbedden voor terras, tuin en zwembad.",
      "offer.c2.t": "Schaduw",
      "offer.c2.p": "Parasols en schaduwoplossingen om de hele dag buiten te genieten.",
      "offer.c3.t": "Binnenmeubelen",
      "offer.c3.p": "Meubelen met een mediterrane touch voor uw huis of appartement.",
      "offer.c4.t": "Advies",
      "offer.c4.p": "We helpen u kiezen wat past bij uw ruimte, uw stijl en uw budget.",
      "visit.eyebrow": "Bezoek ons",
      "visit.title": "Kom langs in de winkel",
      "visit.p": "Meubelen kiest u het best door ze in het echt te zien. We verwelkomen u graag in onze winkel in Dehesa de Campoamor.",
      "visit.address": "Adres",
      "visit.hours": "Openingstijden",
      "visit.route": "Routebeschrijving",
      "contact.eyebrow": "Contact",
      "contact.title": "Heeft u een vraag?",
      "contact.p": "Bel ons, stuur een WhatsApp of een bericht. We antwoorden in het Spaans, Engels of Nederlands.",
      "contact.phone": "Telefoon",
      "form.name": "Naam",
      "form.email": "E-mail",
      "form.phone": "Telefoon (optioneel)",
      "form.message": "Bericht",
      "form.privacy": "Ik ga akkoord met het gebruik van mijn gegevens om mijn vraag te beantwoorden.",
      "form.send": "Versturen",
      "form.sending": "Bezig met versturen…",
      "form.ok": "Bedankt! We nemen snel contact met u op.",
      "form.error": "Vul uw naam, een geldig e-mailadres en een bericht in en accepteer de privacyvoorwaarden.",
      "form.fail": "Er ging iets mis. Probeer het opnieuw of neem contact op via telefoon of WhatsApp.",
      "legal.notice": "Juridische informatie",
      "legal.privacy": "Privacybeleid"
    },
    es: {
      "form.sending": "Enviando…",
      "form.ok": "¡Gracias! Le responderemos pronto.",
      "form.error": "Rellene su nombre, un e-mail válido y un mensaje, y acepte la política de privacidad.",
      "form.fail": "Algo salió mal. Inténtelo de nuevo o contáctenos por teléfono o WhatsApp."
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
    if (!(k in T.es)) T.es[k] = "Menú";
  });

  var current = "es";
  function t(k) { return (T[current] && T[current][k]) || T.es[k] || ""; }

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
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var hidden = document.querySelector('#contact-form input[name="language"]');
    if (hidden) hidden.value = lang;
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
        message: d.get("message"), language: current, page: location.href
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
