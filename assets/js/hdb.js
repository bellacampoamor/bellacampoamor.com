/* Bella × HomeDecoBali – productkaarten en productaanvraag
   Data: Supabase edge function website-hdb-products (BellaFlow).
   Aanvraag: Supabase edge function website-contact (met product_id) -> Resend -> info@bellacampoamor.com
   Geen online verkoop: elke kaart opent het aanvraagformulier. */
(function () {
  "use strict";

  var cfg = window.BELLA_CONFIG || {};
  var FEED = cfg.hdbFeed || "https://apmyllgfsqofjyowfbxc.supabase.co/functions/v1/website-hdb-products";
  var home = document.getElementById("hdb-home");
  var bali = document.getElementById("hdb-bali");
  var dlg = document.getElementById("enquiry");
  if (!home && !bali) return;

  var S = {
    es: {
      preorder: "Pre-order",
      eta: "Disponible en {m}",
      etaNone: "Plazo de entrega a consultar",
      stock: "Disponible en tienda",
      ask: "Consultar",
      askAria: "Consultar sobre {n}",
      size: "cm",
      error: "La colección no se puede mostrar en este momento. Contáctenos para más información.",
      dTitle: "Consulta sobre este producto",
      dIntro: "No vendemos online. Envíenos su pregunta y le responderemos con información, disponibilidad y entrega.",
      dMsg: "Hola, me interesa este producto. ¿Podrían darme más información?",
      dPreMsg: "Hola, me interesa este producto (pre-order). ¿Podrían darme más información sobre la entrega?",
      close: "Cerrar"
    },
    en: {
      preorder: "Pre-order",
      eta: "Expected {m}",
      etaNone: "Ask us about delivery time",
      stock: "Available in store",
      ask: "Ask about this",
      askAria: "Ask about {n}",
      size: "cm",
      error: "The collection cannot be shown right now. Please contact us for more information.",
      dTitle: "Ask about this product",
      dIntro: "We do not sell online. Send us your question and we will reply with information, availability and delivery.",
      dMsg: "Hello, I am interested in this product. Could you send me more information?",
      dPreMsg: "Hello, I am interested in this product (pre-order). Could you tell me more about delivery?",
      close: "Close"
    },
    nl: {
      preorder: "Pre-order",
      eta: "Verwacht in {m}",
      etaNone: "Levertijd op aanvraag",
      stock: "Op voorraad in de winkel",
      ask: "Vraag info",
      askAria: "Vraag info over {n}",
      size: "cm",
      error: "De collectie kan nu niet worden getoond. Neem contact met ons op voor meer informatie.",
      dTitle: "Vraag over dit product",
      dIntro: "We verkopen niet online. Stuur ons uw vraag en we antwoorden met informatie, beschikbaarheid en levering.",
      dMsg: "Hallo, ik heb interesse in dit product. Kunt u mij meer informatie sturen?",
      dPreMsg: "Hallo, ik heb interesse in dit product (pre-order). Kunt u mij meer vertellen over de levering?",
      close: "Sluiten"
    }
  };
  var NL_MONTHS = { January: "januari", February: "februari", March: "maart", April: "april", May: "mei", June: "juni", July: "juli", August: "augustus", September: "september", October: "oktober", November: "november", December: "december" };
  var CAT_NL = { furniture: "Meubels", lighting: "Verlichting", mirrors: "Spiegels", wall: "Wanddecoratie", vases: "Vazen & manden", table: "Tafeldecoratie", bowls: "Borden & kommen", kitchen: "Keuken", pillows: "Kussenhoezen", sticks: "Deco sticks", statues: "Beelden & maskers" };

  function lang() { var l = window.BELLA_LANG || document.documentElement.lang || "es"; return S[l] ? l : "es"; }
  function s(k, v) { var x = S[lang()][k] || S.es[k]; return v ? x.replace(/\{(\w)\}/, function (_, n) { return v[n] || ""; }) : x; }
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function img(u, w) { if (!u) return ""; return u + (u.indexOf("?") > -1 ? "&" : "?") + "width=" + w; }
  function money(n) {
    if (n == null) return "";
    var loc = { es: "es-ES", en: "en-IE", nl: "nl-NL" }[lang()];
    return new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);
  }
  function eta(p) {
    if (!p.preorder_eta) return s("etaNone");
    var m = p.preorder_eta;
    if (lang() === "nl") m = m.replace(/[A-Z][a-z]+/, function (w) { return NL_MONTHS[w] || w; });
    return s("eta", { m: m });
  }

  var byId = {};

  function card(p) {
    byId[p.id] = p;
    var meta = [p.material, p.dimensions_cm ? p.dimensions_cm + " " + s("size") : ""].filter(Boolean).join(" · ");
    var name = p.name + (p.variant ? " – " + p.variant : "");
    return '<article class="pcard' + (p.preorder ? " is-pre" : "") + '">' +
      '<button type="button" class="pcard-btn" data-id="' + esc(p.id) + '" aria-label="' + esc(s("askAria", { n: name })) + '">' +
        '<span class="pcard-img"><img src="' + esc(img(p.image, 600)) + '" alt="' + esc(name) + '" width="600" height="600" loading="lazy" decoding="async">' +
          (p.preorder ? '<span class="badge-pre">' + esc(s("preorder")) + '</span>' : "") +
        '</span>' +
        '<span class="pcard-body">' +
          '<span class="pcard-name">' + esc(name) + '</span>' +
          (meta ? '<span class="pcard-meta">' + esc(meta) + '</span>' : "") +
          '<span class="pcard-avail ' + (p.preorder ? "pre" : "stock") + '">' + esc(p.preorder ? eta(p) : s("stock")) + '</span>' +
          '<span class="pcard-foot">' +
            '<span class="pcard-price">' +
              (p.compare_at_price && p.compare_at_price > p.price ? '<s>' + esc(money(p.compare_at_price)) + '</s> ' : "") +
              esc(money(p.price)) +
            '</span>' +
            '<span class="pcard-ask">' + esc(s("ask")) + ' <span aria-hidden="true">→</span></span>' +
          '</span>' +
        '</span>' +
      '</button></article>';
  }

  function feedLang() { return lang() === "es" ? "es" : "en"; }

  function load(mode) {
    return fetch(FEED + "?mode=" + mode + "&lang=" + feedLang(), { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  function fail(el) {
    el.setAttribute("aria-busy", "false");
    el.innerHTML = '<p class="hdb-error">' + esc(s("error")) + "</p>";
  }

  function renderHome() {
    home.setAttribute("aria-busy", "true");
    load("home").then(function (d) {
      var list = (d && d.products) || [];
      if (!list.length) { var sec = home.closest("section"); if (sec) sec.hidden = true; return; }
      home.innerHTML = list.map(card).join("");
      home.setAttribute("aria-busy", "false");
    }).catch(function () { fail(home); });
  }

  function renderBali() {
    bali.setAttribute("aria-busy", "true");
    load("bali").then(function (d) {
      var cats = (d && d.categories) || [];
      if (!cats.length) return fail(bali);
      bali.innerHTML = cats.map(function (c) {
        var title = lang() === "nl" ? (CAT_NL[c.key] || c.title) : c.title;
        return '<section class="hdb-cat" id="cat-' + esc(c.key) + '" aria-labelledby="h-' + esc(c.key) + '">' +
          '<h2 id="h-' + esc(c.key) + '">' + esc(title) + '</h2>' +
          '<div class="pgrid">' + c.products.map(card).join("") + "</div></section>";
      }).join("");
      bali.setAttribute("aria-busy", "false");
    }).catch(function () { fail(bali); });
  }

  function render() { if (home) renderHome(); if (bali) renderBali(); }

  // Productaanvraag (dialog)
  var form = dlg && dlg.querySelector("form");
  var current = null;
  function openEnquiry(p) {
    if (!dlg) return;
    current = p;
    var name = p.name + (p.variant ? " – " + p.variant : "");
    dlg.querySelector(".enq-title").textContent = s("dTitle");
    dlg.querySelector(".enq-intro").textContent = s("dIntro");
    dlg.querySelector(".enq-close").setAttribute("aria-label", s("close"));
    dlg.querySelector(".enq-product").innerHTML =
      '<img src="' + esc(img(p.image, 240)) + '" alt="" width="96" height="96">' +
      '<div><p class="enq-pname">' + esc(name) + '</p>' +
      '<p class="enq-pprice">' + esc(money(p.price)) + (p.preorder ? ' <span class="badge-pre inline">' + esc(s("preorder")) + '</span>' : "") + '</p>' +
      '<p class="enq-pavail">' + esc(p.preorder ? eta(p) : s("stock")) + (p.sku ? " · Ref. " + esc(p.sku) : "") + '</p></div>';
    form.reset();
    form.elements.message.value = p.preorder ? s("dPreMsg") : s("dMsg");
    form.elements.language.value = lang();
    var st = form.querySelector(".form-status"); st.textContent = ""; st.className = "form-status";
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    setTimeout(function () { form.elements.name.focus(); }, 30);
  }
  function closeEnquiry() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".pcard-btn");
    if (b && byId[b.getAttribute("data-id")]) openEnquiry(byId[b.getAttribute("data-id")]);
  });

  if (dlg) {
    dlg.querySelector(".enq-close").addEventListener("click", closeEnquiry);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeEnquiry(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var st = form.querySelector(".form-status");
      var T = { es: ["Rellene su nombre, un e-mail válido y un mensaje, y acepte la política de privacidad.", "Enviando…", "¡Gracias! Le responderemos pronto.", "Algo salió mal. Inténtelo de nuevo o llámenos."],
                en: ["Please fill in your name, a valid e-mail, a message and accept the privacy terms.", "Sending…", "Thank you! We will get back to you soon.", "Something went wrong. Please try again or call us."],
                nl: ["Vul uw naam, een geldig e-mailadres en een bericht in en accepteer de privacyvoorwaarden.", "Bezig met versturen…", "Bedankt! We nemen snel contact met u op.", "Er ging iets mis. Probeer het opnieuw of bel ons."] }[lang()];
      var d = new FormData(form);
      var email = String(d.get("email") || "").trim();
      if (!String(d.get("name") || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !String(d.get("message") || "").trim() || !d.get("privacy")) {
        st.textContent = T[0]; st.className = "form-status error"; return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; st.textContent = T[1]; st.className = "form-status";
      fetch(cfg.contactWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.get("name"), email: email, phone: d.get("phone"), message: d.get("message"),
          language: lang(), website: d.get("website") || "", product_id: current ? current.id : ""
        })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        st.textContent = T[2]; st.className = "form-status ok";
      }).catch(function () {
        st.textContent = T[3]; st.className = "form-status error";
      }).finally(function () { btn.disabled = false; });
    });
  }

  var shuffle = document.getElementById("hdb-shuffle");
  if (shuffle) shuffle.addEventListener("click", function () { render(); var top = document.getElementById("hdb-bali"); if (top) top.scrollIntoView({ behavior: "smooth" }); });

  var lastLang = lang();
  document.addEventListener("bella:lang", function () {
    if (lang() !== lastLang) { lastLang = lang(); render(); }
  });

  render();
})();
