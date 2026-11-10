/* Bella – showroomgalerij: filter per ruimte + lightbox (toetsenbord, swipe) */
(function () {
  "use strict";

  var grid = document.querySelector(".sg");
  var dlg = document.getElementById("lightbox");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".sg-item"));
  var filters = Array.prototype.slice.call(document.querySelectorAll(".sg-filters button"));

  /* ---------- Filter ---------- */
  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-filter");
      filters.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      items.forEach(function (li) {
        li.hidden = !(f === "all" || li.getAttribute("data-cat") === f);
      });
      grid.classList.toggle("is-filtered", f !== "all");
    });
  });

  /* ---------- Lightbox ---------- */
  if (!dlg || typeof dlg.showModal !== "function") {
    // Geen <dialog>-ondersteuning: grote foto in nieuw tabblad
    items.forEach(function (li) {
      var btn = li.querySelector(".sg-open");
      btn.addEventListener("click", function () { window.open(btn.getAttribute("data-full"), "_blank", "noopener"); });
    });
    return;
  }

  var img = dlg.querySelector(".lb-img");
  var cap = dlg.querySelector(".lb-cap");
  var count = dlg.querySelector(".lb-count");
  var list = [];
  var idx = 0;
  var opener = null;

  function visible() { return items.filter(function (li) { return !li.hidden; }); }

  function show(i) {
    idx = (i + list.length) % list.length;
    var li = list[idx];
    var thumb = li.querySelector("img");
    var btn = li.querySelector(".sg-open");
    img.classList.remove("is-loaded");
    img.onload = function () { img.classList.add("is-loaded"); };
    img.src = btn.getAttribute("data-full");
    img.alt = thumb.getAttribute("alt") || "";
    cap.textContent = img.alt;
    count.textContent = (idx + 1) + " / " + list.length;
    // Volgende foto alvast laden
    var nxt = list[(idx + 1) % list.length];
    if (nxt) { var pre = new Image(); pre.src = nxt.querySelector(".sg-open").getAttribute("data-full"); }
  }

  items.forEach(function (li) {
    li.querySelector(".sg-open").addEventListener("click", function (e) {
      opener = e.currentTarget;
      list = visible();
      dlg.showModal();
      document.documentElement.classList.add("lb-lock");
      show(list.indexOf(li));
    });
  });

  dlg.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
  dlg.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
  dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
  // Klik op de donkere achtergrond sluit
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(idx - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(idx + 1); }
  });
  dlg.addEventListener("close", function () {
    document.documentElement.classList.remove("lb-lock");
    if (opener) opener.focus({ preventScroll: true });
  });

  // Swipe op mobiel
  var x0 = null;
  dlg.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });

  // Taalwissel terwijl de lightbox open is: bijschrift bijwerken
  document.addEventListener("bella:lang", function () { if (dlg.open) show(idx); });
})();
