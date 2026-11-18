/* Social-lint "Síganos" (#siganos): laatste Instagram-posts + knoppen Instagram/Facebook.
   Data: Supabase edge function website-social (tabel website_social_feed),
   elk uur gevuld door de n8n-workflow "BellaCampoamor.com: Instagram feed → website".
   Foto's komen uit Cloudinary (map "Website Instagram"). Geen posts = sectie blijft verborgen.
   Teksten in de kop: data-i18n "social.*" in main.js; dynamische teksten hieronder (taal = <html lang>). */
(function () {
  var sec = document.getElementById("siganos");
  var strip = document.getElementById("so-strip");
  if (!sec || !strip) return;

  var cfg = window.BELLA_CONFIG || {};
  var FEED = cfg.socialFeed || "https://apmyllgfsqofjyowfbxc.supabase.co/functions/v1/website-social";
  // Volgers pas tonen vanaf dit aantal; daaronder de accountnaam
  var MIN_FOLLOWERS = 100;

  var L = {
    es: { followers: "seguidores", video: "Vídeo", album: "Álbum", open: "Ver en Instagram", post: "Publicación de Instagram de Bella Furniture & Outdoor", more: "Ver más en Instagram", page: "Página de Facebook" },
    en: { followers: "followers", video: "Video", album: "Album", open: "View on Instagram", post: "Instagram post by Bella Furniture & Outdoor", more: "See more on Instagram", page: "Facebook page" },
    nl: { followers: "volgers", video: "Video", album: "Album", open: "Bekijk op Instagram", post: "Instagram-post van Bella Furniture & Outdoor", more: "Meer op Instagram", page: "Facebook-pagina" }
  };
  function lang() { var l = (document.documentElement.lang || "es").slice(0, 2); return L[l] ? l : "es"; }
  function tx(k) { return L[lang()][k]; }

  var data = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function fmt(n) {
    try { return new Intl.NumberFormat(lang() === "en" ? "en-GB" : lang() === "nl" ? "nl-NL" : "es-ES").format(n); } catch (e) { return String(n); }
  }

  function ago(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var s = (d.getTime() - Date.now()) / 1000;
    var units = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
    try {
      var rtf = new Intl.RelativeTimeFormat(lang(), { numeric: "auto" });
      for (var i = 0; i < units.length; i++) {
        if (Math.abs(s) >= units[i][1] || units[i][0] === "minute") return rtf.format(Math.round(s / units[i][1]), units[i][0]);
      }
    } catch (e) {}
    return d.toLocaleDateString();
  }

  var ICON_IG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.9" cy="7.1" r="1.2" fill="currentColor"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  var ICON_ALBUM = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 21H5.5A2.5 2.5 0 0 1 3 18.5V7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function render() {
    if (!data) return;
    var ig = data.instagram || {}, fb = data.facebook || {};

    // Knoppen: link + volgers (of accountnaam zolang het aantal nog klein is)
    var igBtn = sec.querySelector("[data-so=ig]"), fbBtn = sec.querySelector("[data-so=fb]");
    if (ig.url) igBtn.href = ig.url;
    if (fb.url) fbBtn.href = fb.url;
    igBtn.querySelector("[data-so-sub]").textContent = ig.followers >= MIN_FOLLOWERS ? fmt(ig.followers) + " " + tx("followers") : "@" + (ig.handle || "bellacampoamor.official");
    fbBtn.querySelector("[data-so-sub]").textContent = fb.followers >= MIN_FOLLOWERS ? fmt(fb.followers) + " " + tx("followers") : tx("page");
    igBtn.setAttribute("aria-label", "Instagram – @" + (ig.handle || "bellacampoamor.official"));
    fbBtn.setAttribute("aria-label", "Facebook – " + (fb.name || "BellaCampoamor"));

    strip.textContent = "";
    data.posts.forEach(function (p, i) {
      var li = el("li", "so-item");
      var a = el("a", "so-card");
      a.href = p.url; a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("aria-label", tx("open") + (p.caption ? ": " + p.caption : ""));

      var img = el("img");
      img.src = p.image;
      img.alt = p.caption || tx("post");
      img.width = 640; img.height = 800;
      img.loading = i < 4 ? "eager" : "lazy";
      img.decoding = "async";
      img.addEventListener("error", function () { li.remove(); });
      a.appendChild(img);

      var badge = el("span", "so-badge"); badge.innerHTML = ICON_IG; a.appendChild(badge);
      if (p.type === "video" || p.type === "carousel") {
        var kind = el("span", "so-kind"); kind.innerHTML = p.type === "video" ? ICON_PLAY : ICON_ALBUM;
        kind.title = tx(p.type === "video" ? "video" : "album");
        a.appendChild(kind);
      }
      var cap = el("span", "so-cap");
      if (p.caption) cap.appendChild(el("span", "so-cap-t", p.caption));
      if (p.date) cap.appendChild(el("span", "so-cap-d", ago(p.date)));
      a.appendChild(cap);

      li.appendChild(a);
      strip.appendChild(li);
    });

    // Laatste tegel: naar het profiel
    var li = el("li", "so-item so-item-more");
    var a = el("a", "so-card so-more");
    a.href = ig.url || "https://www.instagram.com/bellacampoamor.official/"; a.target = "_blank"; a.rel = "noopener";
    var ic = el("span", "so-more-ic"); ic.innerHTML = ICON_IG; a.appendChild(ic);
    a.appendChild(el("span", "so-more-t", tx("more")));
    a.appendChild(el("span", "so-more-h", "@" + (ig.handle || "bellacampoamor.official")));
    var ar = el("span", "so-more-ar"); ar.innerHTML = ICON_ARROW; a.appendChild(ar);
    li.appendChild(a);
    strip.appendChild(li);

    sec.hidden = false;
    updateNav();
  }

  // Pijlknoppen (desktop): scrollen per ~3 tegels; verbergen aan het begin/einde
  var prev = sec.querySelector(".so-prev"), next = sec.querySelector(".so-next");
  function step() { var f = strip.querySelector(".so-item"); return f ? (f.getBoundingClientRect().width + 16) * Math.max(1, Math.floor(strip.clientWidth / (f.getBoundingClientRect().width + 16)) - 1) : 300; }
  function updateNav() {
    var max = strip.scrollWidth - strip.clientWidth - 4;
    prev.hidden = strip.scrollLeft <= 4;
    next.hidden = strip.scrollLeft >= max;
  }
  prev.addEventListener("click", function () { strip.scrollBy({ left: -step(), behavior: "smooth" }); });
  next.addEventListener("click", function () { strip.scrollBy({ left: step(), behavior: "smooth" }); });
  strip.addEventListener("scroll", function () { window.requestAnimationFrame(updateNav); }, { passive: true });
  window.addEventListener("resize", updateNav);

  function load() {
    fetch(FEED, { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !Array.isArray(d.posts) || !d.posts.length) return;
        data = d;
        render();
      })
      .catch(function () {});
  }

  // Pas laden als de sectie bijna in beeld is (hij staat onderaan de pagina)
  if ("IntersectionObserver" in window) {
    // de sectie is nog verborgen: observeer het element ervóór
    var anchor = sec.previousElementSibling || sec;
    var io = new IntersectionObserver(function (en) {
      if (en.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: "800px 0px" });
    io.observe(anchor);
  } else {
    load();
  }

  document.addEventListener("bella:lang", render);
})();
