/* Bella Furniture & Outdoor – afspraak maken (cita.html)
   Haalt de vrije tijden op bij de edge function website-appointment (binnen de openingstijden,
   minus bestaande afspraken en blokkades in Google Agenda) en verstuurt het afspraakverzoek.
   De winkel krijgt een PROFORMA-afspraak in Google Agenda en een e-mail op info@bellacampoamor.com. */
(function () {
  "use strict";

  var cfg = window.BELLA_CONFIG || {};
  var API = cfg.appointmentApi;
  var root = document.getElementById("appt-cal");
  var form = document.getElementById("appt-form");
  if (!root || !form || !API) return;

  var L = {
    es: {
      free: "{n} libres", full: "Completo", none: "No quedan horas libres este día. Pruebe otro día o llámenos.",
      week: "Sin horas libres esta semana. Mire la semana siguiente.",
      loadFail: "No se pudo cargar la agenda. Llámenos al +34 865 77 69 25 o inténtelo más tarde.",
      pickFirst: "Elija primero un día y una hora en la agenda (paso 2).",
      error: "Rellene su nombre, un e-mail válido y un teléfono, y acepte la política de privacidad.",
      sending: "Enviando…", taken: "Lo sentimos, esta hora acaba de reservarse. Elija otra hora, por favor.",
      rate: "Ya ha enviado varias solicitudes. Llámenos al +34 865 77 69 25.",
      fail: "Algo salió mal. Inténtelo de nuevo o llámenos al +34 865 77 69 25.",
      slot: "{t1} – {t2}", h: "h", pick: "Elija un día y una hora"
    },
    en: {
      free: "{n} free", full: "Full", none: "No free times left on this day. Try another day or give us a call.",
      week: "No free times this week. Have a look at next week.",
      loadFail: "The calendar could not be loaded. Call us on +34 865 77 69 25 or try again later.",
      pickFirst: "First choose a day and time in the calendar (step 2).",
      error: "Please fill in your name, a valid e-mail and a phone number, and accept the privacy terms.",
      sending: "Sending…", taken: "Sorry, this time has just been booked. Please choose another time.",
      rate: "You have already sent several requests. Please call us on +34 865 77 69 25.",
      fail: "Something went wrong. Please try again or call us on +34 865 77 69 25.",
      slot: "{t1} – {t2}", h: "h", pick: "Choose a day and time"
    },
    nl: {
      free: "{n} vrij", full: "Vol", none: "Geen vrije tijden meer op deze dag. Kies een andere dag of bel ons.",
      week: "Geen vrije tijden deze week. Kijk bij de volgende week.",
      loadFail: "De agenda kon niet worden geladen. Bel ons op +34 865 77 69 25 of probeer het later opnieuw.",
      pickFirst: "Kies eerst een dag en tijd in de agenda (stap 2).",
      error: "Vul uw naam, een geldig e-mailadres en een telefoonnummer in en accepteer de privacyvoorwaarden.",
      sending: "Bezig met versturen…", taken: "Sorry, dit tijdstip is net geboekt. Kies een ander tijdstip.",
      rate: "U heeft al meerdere aanvragen verstuurd. Bel ons op +34 865 77 69 25.",
      fail: "Er ging iets mis. Probeer het opnieuw of bel ons op +34 865 77 69 25.",
      slot: "{t1} – {t2}", h: "u", pick: "Kies een dag en tijd"
    }
  };
  var LOC = { es: "es-ES", en: "en-GB", nl: "nl-NL" };
  function lang() { return L[window.BELLA_LANG] ? window.BELLA_LANG : (L[document.documentElement.lang] ? document.documentElement.lang : "es"); }
  function tr(k, v) {
    var s = L[lang()][k] || L.es[k] || "";
    if (v) Object.keys(v).forEach(function (x) { s = s.replace("{" + x + "}", v[x]); });
    return s;
  }

  var dayRow = root.querySelector(".day-row");
  var grid = root.querySelector(".slot-grid");
  var wkLabel = root.querySelector(".wk-label");
  var prevBtn = root.querySelector(".wk-prev");
  var nextBtn = root.querySelector(".wk-next");
  var durBtns = root.querySelectorAll(".dur");
  var summary = form.querySelector(".as-val");
  var status = form.querySelector(".form-status");
  var done = document.getElementById("appt-done");

  var data = null, byDate = {}, weeks = [];
  var state = { dur: 120, week: 0, day: null, time: null };

  // ---------- datumhulpjes (datums als "YYYY-MM-DD", tijden in minuten) ----------
  function d2(date) { return new Date(date + "T12:00:00Z"); }
  function addDays(date, n) { var x = d2(date); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); }
  function monday(date) { var wd = d2(date).getUTCDay(); return addDays(date, wd === 0 ? -6 : 1 - wd); }
  function hhmm(m) { return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }
  function fmt(date, opts) { return new Intl.DateTimeFormat(LOC[lang()], Object.assign({ timeZone: "UTC" }, opts)).format(d2(date)); }

  function freeStarts(day, dur) {
    var out = [];
    if (!day) return out;
    for (var s = day.open; s + dur <= day.close; s += data.step) {
      var clash = day.busy.some(function (b) { return s < b[1] && s + dur > b[0]; });
      if (!clash) out.push(s);
    }
    return out;
  }

  // ---------- tekenen ----------
  function render() {
    if (!data) return;
    var wk = weeks[state.week];
    prevBtn.disabled = state.week === 0;
    nextBtn.disabled = state.week >= weeks.length - 1;
    wkLabel.textContent = fmt(wk, { day: "numeric", month: "short" }) + " – " + fmt(addDays(wk, 5), { day: "numeric", month: "short", year: "numeric" });

    dayRow.innerHTML = "";
    var firstFree = null;
    for (var i = 0; i < 6; i++) {
      var date = addDays(wk, i);
      var day = byDate[date];
      var n = freeStarts(day, state.dur).length;
      if (n && !firstFree) firstFree = date;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "day";
      b.setAttribute("role", "tab");
      b.dataset.date = date;
      b.disabled = !n;
      b.setAttribute("aria-selected", String(date === state.day));
      b.innerHTML = '<span class="dy-w"></span><span class="dy-n"></span><span class="dy-m"></span><span class="dy-f"></span>';
      b.querySelector(".dy-w").textContent = fmt(date, { weekday: "short" });
      b.querySelector(".dy-n").textContent = fmt(date, { day: "numeric" });
      b.querySelector(".dy-m").textContent = fmt(date, { month: "short" });
      b.querySelector(".dy-f").textContent = day ? (n ? tr("free", { n: n }) : tr("full")) : "–";
      b.setAttribute("aria-label", fmt(date, { weekday: "long", day: "numeric", month: "long" }) + " · " + (n ? tr("free", { n: n }) : tr("full")));
      dayRow.appendChild(b);
    }

    // geselecteerde dag moet in deze week liggen en vrij zijn
    var inWeek = state.day && state.day >= wk && state.day <= addDays(wk, 5);
    if (!inWeek || !freeStarts(byDate[state.day], state.dur).length) {
      state.day = firstFree;
      dayRow.querySelectorAll(".day").forEach(function (x) { x.setAttribute("aria-selected", String(x.dataset.date === state.day)); });
    }

    grid.innerHTML = "";
    if (!state.day) {
      grid.innerHTML = '<p class="slot-msg"></p>';
      grid.firstChild.textContent = tr("week");
    } else {
      var starts = freeStarts(byDate[state.day], state.dur);
      if (state.time !== null && starts.indexOf(state.time) < 0) state.time = null;
      if (!starts.length) {
        grid.innerHTML = '<p class="slot-msg"></p>';
        grid.firstChild.textContent = tr("none");
      }
      starts.forEach(function (s) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "slot";
        b.dataset.min = s;
        b.textContent = hhmm(s);
        b.title = tr("slot", { t1: hhmm(s), t2: hhmm(s + state.dur) });
        b.setAttribute("aria-pressed", String(s === state.time));
        grid.appendChild(b);
      });
    }
    paintSummary();
  }

  function paintSummary() {
    var box = form.querySelector(".appt-summary");
    if (state.day && state.time !== null) {
      summary.removeAttribute("data-i18n");
      summary.textContent = fmt(state.day, { weekday: "long", day: "numeric", month: "long" }) + " · " +
        tr("slot", { t1: hhmm(state.time), t2: hhmm(state.time + state.dur) }) + " (" + state.dur / 60 + " " + tr("h") + ")";
      box.classList.add("is-set");
    } else {
      summary.textContent = tr("pick");
      box.classList.remove("is-set");
    }
  }

  // ---------- interactie ----------
  durBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      state.dur = Number(b.dataset.dur);
      durBtns.forEach(function (x) { x.setAttribute("aria-checked", String(x === b)); });
      render();
    });
  });
  prevBtn.addEventListener("click", function () { if (state.week > 0) { state.week--; state.day = null; render(); } });
  nextBtn.addEventListener("click", function () { if (state.week < weeks.length - 1) { state.week++; state.day = null; render(); } });
  dayRow.addEventListener("click", function (e) {
    var b = e.target.closest(".day");
    if (!b || b.disabled) return;
    state.day = b.dataset.date;
    state.time = null;
    render();
  });
  grid.addEventListener("click", function (e) {
    var b = e.target.closest(".slot");
    if (!b) return;
    state.time = Number(b.dataset.min);
    grid.querySelectorAll(".slot").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    paintSummary();
    if (window.matchMedia("(max-width: 900px)").matches) {
      form.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  });
  document.addEventListener("bella:lang", function () { render(); });

  // ---------- data laden ----------
  function load(keepSelection) {
    grid.setAttribute("aria-busy", "true");
    return fetch(API, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (j) {
      data = j;
      byDate = {};
      j.days.forEach(function (d) { byDate[d.date] = d; });
      weeks = [];
      j.days.forEach(function (d) { var m = monday(d.date); if (weeks.indexOf(m) < 0) weeks.push(m); });
      if (!keepSelection) {
        // eerste week met een vrije tijd
        state.week = 0;
        for (var w = 0; w < weeks.length; w++) {
          var any = false;
          for (var i = 0; i < 6 && !any; i++) any = freeStarts(byDate[addDays(weeks[w], i)], state.dur).length > 0;
          if (any) { state.week = w; break; }
        }
      }
      render();
    }).catch(function () {
      grid.innerHTML = '<p class="slot-msg error"></p>';
      grid.firstChild.textContent = tr("loadFail");
    }).finally(function () { grid.removeAttribute("aria-busy"); });
  }

  // ---------- versturen ----------
  function show(msg, cls) { status.textContent = msg; status.className = "form-status " + (cls || ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(form);
    if (!state.day || state.time === null) { show(tr("pickFirst"), "error"); root.scrollIntoView({ block: "start" }); return; }
    var email = String(f.get("email") || "").trim();
    if (!String(f.get("name") || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        String(f.get("phone") || "").replace(/\D/g, "").length < 6 || !f.get("privacy")) {
      show(tr("error"), "error");
      return;
    }
    var body = {
      date: state.day, time: hhmm(state.time), duration: state.dur,
      name: f.get("name"), email: email, phone: f.get("phone"),
      scope: f.get("scope"), people: f.get("people"), area: f.get("area"),
      message: f.get("message"), language: lang(), website: f.get("website") || ""
    };
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    show(tr("sending"));
    fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j }; });
      })
      .then(function (res) {
        if (res.status === 200 && res.j.ok) {
          var when = fmt(state.day, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " · " +
            tr("slot", { t1: hhmm(state.time), t2: hhmm(state.time + state.dur) });
          done.querySelector(".ad-when").textContent = when;
          form.hidden = true;
          done.hidden = false;
          done.focus();
          load(true);
          return;
        }
        if (res.status === 409) { show(tr("taken"), "error"); state.time = null; load(true); return; }
        if (res.status === 429) { show(tr("rate"), "error"); return; }
        if (res.status === 400) { show(tr("error"), "error"); return; }
        show(tr("fail"), "error");
      })
      .catch(function () { show(tr("fail"), "error"); })
      .finally(function () { btn.disabled = false; });
  });

  // ---------- voorkeuze via ?alcance=casa|varias (paneel op de homepage) ----------
  (function () {
    var m = /[?&]alcance=(casa|varias|exterior|otro)\b/.exec(location.search);
    if (!m) return;
    var r = form.querySelector('input[name="scope"][value="' + m[1] + '"]');
    if (r) r.checked = true;
    var d = { casa: 120, varias: 60 }[m[1]];
    if (d) {
      state.dur = d;
      durBtns.forEach(function (x) { x.setAttribute("aria-checked", String(Number(x.dataset.dur) === d)); });
    }
  })();

  // Bella-video naast het formulier: stil bij 'minder beweging'
  var bv = document.querySelector(".bg-citaform");
  if (bv && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { bv.removeAttribute("autoplay"); bv.pause(); }

  load(false);
})();
