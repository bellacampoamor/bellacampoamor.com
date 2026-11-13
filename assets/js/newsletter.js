/* Bella Furniture & Outdoor – nieuwsbrief-pop-up (e-mailadressen verzamelen voor marketing)
   Post naar Supabase edge function website-subscribe -> tabel website_subscribers.
   Teksten staan hier (ES/EN/NL, taal = <html lang>), omdat de pop-up alleen via JS bestaat.
   Wanneer: na 20 s, of na 50 % scrollen, of bij "exit intent" (muis naar boven, desktop),
   maar nooit in de eerste 6 s, niet als er al een dialoog open is of iemand een formulier invult.
   Wegklikken = 21 dagen rust; ingeschreven = nooit meer. Altijd opnieuw te openen via de footerlink. */
(function () {
  "use strict";

  var ENDPOINT = "https://apmyllgfsqofjyowfbxc.supabase.co/functions/v1/website-subscribe";
  var KEY = "bella-newsletter";
  var SNOOZE_DAYS = 21;
  var IMG = "/assets/img/team/bella-wijst-u";

  var T = {
    es: {
      title: "¿Quiere ser el primero en enterarse?",
      text: "Suscríbase a nuestro boletín y descubra antes que nadie nuestras nuevas colecciones, ofertas y consejos para su casa y su terraza.",
      ph: "Su e-mail",
      consent: "Acepto recibir e-mails de Bella Furniture & Outdoor. Puedo darme de baja en cualquier momento.",
      privacy: "Privacidad",
      btn: "Suscribirme",
      busy: "Un momento…",
      okT: "¡Gracias, ya está suscrito!",
      okP: "Pronto recibirá nuestras novedades. ¿Y si viene a vernos mientras tanto? Le esperamos en Dehesa de Campoamor.",
      okBtn: "Cerrar",
      errMail: "Introduzca un e-mail válido.",
      errConsent: "Marque la casilla para poder suscribirse.",
      err: "No se ha podido guardar. Inténtelo de nuevo o escríbanos a info@bellacampoamor.com.",
      close: "Cerrar",
      footer: "Boletín",
      footerA: "Suscríbase",
      footerB: " a nuestro boletín y reciba novedades y ofertas en su e-mail.",
    },
    en: {
      title: "Always the first to know?",
      text: "Sign up for our newsletter and be the first to discover our new collections, offers and tips for your home and terrace.",
      ph: "Your e-mail",
      consent: "I agree to receive e-mails from Bella Furniture & Outdoor. I can unsubscribe at any time.",
      privacy: "Privacy",
      btn: "Sign me up",
      busy: "One moment…",
      okT: "Thank you, you're subscribed!",
      okP: "You'll hear from us soon. And in the meantime, why not drop by? We look forward to seeing you in Dehesa de Campoamor.",
      okBtn: "Close",
      errMail: "Please enter a valid e-mail address.",
      errConsent: "Please tick the box to subscribe.",
      err: "Something went wrong. Please try again or write to info@bellacampoamor.com.",
      close: "Close",
      footer: "Newsletter",
      footerA: "Sign up",
      footerB: " for our newsletter and get news and offers in your inbox.",
    },
    nl: {
      title: "Altijd als eerste op de hoogte?",
      text: "Schrijf u in voor onze nieuwsbrief en ontdek als eerste onze nieuwe collecties, acties én tips voor uw huis en terras.",
      ph: "E-mailadres",
      consent: "Ik wil e-mails van Bella Furniture & Outdoor ontvangen. Afmelden kan altijd.",
      privacy: "Privacy",
      btn: "Inschrijven",
      busy: "Even geduld…",
      okT: "Bedankt, u bent ingeschreven!",
      okP: "U hoort snel van ons. Kom intussen gerust eens langs – we zien u graag in Dehesa de Campoamor.",
      okBtn: "Sluiten",
      errMail: "Vul een geldig e-mailadres in.",
      errConsent: "Vink het vakje aan om u in te schrijven.",
      err: "Opslaan is niet gelukt. Probeer het opnieuw of mail naar info@bellacampoamor.com.",
      close: "Sluiten",
      footer: "Nieuwsbrief",
      footerA: "Schrijf u in",
      footerB: " voor onze nieuwsbrief en ontvang nieuws en acties in uw mailbox.",
    },
  };

  var lang = (document.documentElement.lang || "es").slice(0, 2);
  if (!T[lang]) lang = "es";
  var t = T[lang];

  function get() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- Dialoog opbouwen ---------- */
  var dlg = document.createElement("dialog");
  dlg.className = "nl-dlg";
  dlg.setAttribute("aria-labelledby", "nl-title");
  var colors = ["#D57054", "#8A3F2B", "#E7B04B", "#111111", "#EFE4D6", "#ffffff"];
  var confetti = "";
  for (var i = 0; i < 34; i++) {
    var shape = i % 3 === 0 ? "nl-c nl-c-round" : (i % 3 === 1 ? "nl-c nl-c-bar" : "nl-c");
    // Rechterhelft vrij verspreid; links alleen langs boven- en onderrand, zodat de tekst leesbaar blijft
    var x = i < 22 ? 50 + Math.random() * 47 : 3 + Math.random() * 47;
    var y = i < 22 ? 3 + Math.random() * 90 : (i % 2 ? 2 + Math.random() * 9 : 89 + Math.random() * 8);
    confetti += '<i class="' + shape + '" style="left:' + x.toFixed(1) + "%;top:" + y.toFixed(1) +
      "%;background:" + colors[i % colors.length] + ";transform:rotate(" + Math.round(Math.random() * 180) + "deg);animation-delay:-" + (Math.random() * 6).toFixed(1) + 's"></i>';
  }
  dlg.innerHTML =
    '<div class="nl-head"><p class="nl-title" id="nl-title">' + esc(t.title) + '</p>' +
    '<button type="button" class="nl-x" aria-label="' + esc(t.close) + '">×</button></div>' +
    '<div class="nl-body">' +
      '<div class="nl-confetti" aria-hidden="true">' + confetti + '</div>' +
      '<div class="nl-main">' +
        '<form class="nl-form" novalidate>' +
          '<p class="nl-text">' + esc(t.text) + '</p>' +
          '<label class="nl-sr" for="nl-email">' + esc(t.ph) + '</label>' +
          '<input id="nl-email" name="email" type="email" autocomplete="email" inputmode="email" required placeholder="' + esc(t.ph) + '">' +
          '<label class="nl-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>' +
          '<label class="nl-check"><input type="checkbox" name="consent" required> <span>' + esc(t.consent) +
            ' <a href="/privacidad.html" target="_blank" rel="noopener">' + esc(t.privacy) + '</a></span></label>' +
          '<button class="nl-btn" type="submit">' + esc(t.btn) + '</button>' +
          '<p class="nl-status" role="status" aria-live="polite"></p>' +
        '</form>' +
        '<div class="nl-done" hidden><p class="nl-done-t">' + esc(t.okT) + '</p><p>' + esc(t.okP) + '</p>' +
          '<button type="button" class="nl-btn nl-done-btn">' + esc(t.okBtn) + '</button></div>' +
      '</div>' +
      '<div class="nl-art" aria-hidden="true">' +
        '<img src="' + IMG + '.webp" srcset="' + IMG + '-sm.webp 207w, ' + IMG + '.webp 379w" sizes="(max-width: 640px) 200px, 320px" width="379" height="1100" alt="" decoding="async">' +
      '</div>' +
    '</div>';
  document.body.appendChild(dlg);

  var form = dlg.querySelector(".nl-form");
  var email = dlg.querySelector("#nl-email");
  var status = dlg.querySelector(".nl-status");
  var btn = dlg.querySelector(".nl-btn");
  var done = dlg.querySelector(".nl-done");
  var subscribed = false;

  function open(manual) {
    if (dlg.open) return;
    if (!manual && document.querySelector("dialog[open]")) return;
    try { sessionStorage.setItem(KEY, "shown"); } catch (e) {}
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    dlg.classList.add("nl-in");
    if (manual) setTimeout(function () { email.focus(); }, 50);
  }
  function close() {
    if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
  }
  dlg.addEventListener("close", function () {
    dlg.classList.remove("nl-in");
    if (!subscribed && !get().subscribed) set({ snoozed: Date.now() });
  });
  dlg.querySelector(".nl-x").addEventListener("click", close);
  dlg.querySelector(".nl-done-btn").addEventListener("click", close);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); }); // klik op achtergrond

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { status.textContent = t.errMail; email.focus(); return; }
    if (!form.consent.checked) { status.textContent = t.errConsent; form.consent.focus(); return; }
    btn.disabled = true; btn.textContent = t.busy; status.textContent = "";
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: v, language: lang, source: location.pathname, consent: true, website: form.website.value }),
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      subscribed = true;
      set({ subscribed: Date.now() });
      form.hidden = true; done.hidden = false;
      dlg.querySelector(".nl-done-btn").focus();
    }).catch(function () {
      status.textContent = t.err;
    }).finally(function () { btn.disabled = false; btn.textContent = t.btn; });
  });

  /* ---------- Footerlink (altijd beschikbaar), in de kolom "¿Nos sigue?" ---------- */
  var ffol = document.querySelector(".site-footer .footer-follow");
  if (ffol) {
    var np = document.createElement("p");
    np.className = "footer-nl";
    var a = document.createElement("a");
    a.href = "#boletin"; a.textContent = t.footerA || t.footer;
    a.addEventListener("click", function (e) { e.preventDefault(); open(true); });
    np.appendChild(a);
    np.appendChild(document.createTextNode(t.footerB || ""));
    ffol.appendChild(np);
  }
  if (location.hash === "#boletin" || location.hash === "#newsletter") open(true);

  /* ---------- Automatisch tonen ---------- */
  var s = get();
  var snoozed = s.snoozed && Date.now() - s.snoozed < SNOOZE_DAYS * 864e5;
  var seen = false;
  try { seen = sessionStorage.getItem(KEY) === "shown"; } catch (e) {}
  if (s.subscribed || snoozed || seen || /[?&]nopopup\b/.test(location.search)) return;

  var start = Date.now(), fired = false, pending = false;
  function busy() {
    var el = document.activeElement;
    return el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) && !dlg.contains(el);
  }
  function trigger() {
    if (fired) return;
    if (Date.now() - start < 6000 || busy() || document.querySelector("dialog[open]")) { pending = true; return; }
    fired = true;
    cleanup();
    open(false);
  }
  var timer = setInterval(function () { if (pending || Date.now() - start >= 20000) trigger(); }, 1000);
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h > 0 && scrollY / h > 0.5) trigger();
  }
  function onLeave(e) { if (!e.relatedTarget && e.clientY <= 0) trigger(); }
  function cleanup() {
    clearInterval(timer);
    removeEventListener("scroll", onScroll);
    document.removeEventListener("mouseout", onLeave);
  }
  addEventListener("scroll", onScroll, { passive: true });
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) document.addEventListener("mouseout", onLeave);
})();
