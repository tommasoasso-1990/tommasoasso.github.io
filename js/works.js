// js/works.js
// elenco opere (unica fonte di verità)
const WORKS = [
  { file: "30-anni-30x30.webp",           title: "30 anni",              meta: "olio su legno · 30×30 cm · 2020" },
  { file: "2024-80x100.webp",             title: "2024",                 meta: "olio su tela · 80×100 cm · 2024" },
  { file: "autoritratto-20x30.webp",      title: "Autoritratto",         meta: "olio su tela · 20×30 cm · 2018" },
  { file: "citta-blu-20x30.webp",         title: "Città blu",            meta: "acrilico su tela · 20×30 cm · 2026" },
  { file: "citta-blu-90x70.webp",         title: "Città blu",            meta: "olio su tela · 90×70 cm · 2021" },
  { file: "citta-con-fiume-50x70.webp",   title: "Città con fiume",      meta: "olio su tela · 50×70 cm · 2023" },
  { file: "citta-dell-est-50x70.webp",    title: "Città dell'est",       meta: "olio su tela · 50×70 cm · 2022" },
  { file: "citta-del-nord-50x70.webp",    title: "Città del nord",       meta: "olio su tela · 50×70 cm · 2022" },
  { file: "citta-mediterranea-50x70.webp",title: "Città mediterranea",   meta: "olio su tela · 50×70 cm · 2021" },
  { file: "citta-sul-fiume-100x70.webp",  title: "Città sul fiume",      meta: "olio su tela · 100×70 cm · 2023" },
  { file: "finestra-30x80.webp",          title: "Finestra",             meta: "olio su tela · 30×80 cm · 2021" },
  { file: "finestra-60x60.webp",          title: "Finestra",             meta: "olio su legno · 60×60 cm · 2022" },
  { file: "gallo-33x33.webp",             title: "Gallo",                meta: "olio su tela · 33×33 cm · 2023" },
  { file: "gallo-al-mare-50x60.webp",     title: "Gallo al mare",        meta: "olio su cartone · 50×60 cm · 2020" },
  { file: "genova-50x70.webp",            title: "Genova",               meta: "olio su tela · 50×70 cm · 2023" },
  { file: "il-fumatore-50x70.webp",       title: "Il fumatore",          meta: "olio su tela · 50×70 cm · 2021" },
  { file: "ingresso-25x20.webp",          title: "Ingresso",             meta: "olio su tela · 25×20 cm · 2023" },
  { file: "la-boca-50x70.webp",           title: "La Boca",              meta: "olio su tela · 50×70 cm · 2016" },
  { file: "la-citta-lontana-50x60.webp",  title: "La città lontana",     meta: "olio su tela · 50×60 cm · 2021" },
  { file: "pianista-con-gallo-50x70.webp",title: "Pianista con gallo",   meta: "olio su legno · 50×70 cm · 2020" },
  { file: "portico-30x25.webp",           title: "Portico",              meta: "olio su tela · 30×25 cm · 2019" },
  { file: "ricordo-di-una-citta-30x25.webp", title: "Ricordo di una città", meta: "olio su tela · 30×25 cm · 2021" },
  { file: "vienna-50x70.webp",            title: "Vienna",               meta: "olio su tela · 50×70 cm · 2024" },
  { file: "volterra-50x70.webp",          title: "Volterra",             meta: "olio su tela · 50×70 cm · 2020" },
  { file: "waterfront-50x70.webp",        title: "Waterfront",           meta: "olio su tela · 50×70 cm · 2023" },
];

// funzione che crea la griglia e il lightbox
function renderWorks(options) {
  const {
    gridId = "works-grid",
    lightboxId = "lb",
    imgPrefix = ""
  } = options || {};
  const grid = document.getElementById(gridId);
  if (!grid) return;
  // genera le card
  WORKS.forEach(work => {
    const fig = document.createElement("figure");
    fig.className = "card";
    fig.innerHTML = `
      <img src="${imgPrefix}images/${work.file}" alt="${work.title} — ${work.meta}" loading="lazy">
      <figcaption>
        <strong>${work.title}</strong>
        <span class="meta">${work.meta}</span>
      </figcaption>
    `;
    grid.appendChild(fig);
  });
  // lightbox
  const lb  = document.getElementById(lightboxId);
  if (!lb) return;
  const big = lb.querySelector("img");
  const cap = lb.querySelector("figcaption");
  const prev = lb.querySelector(".prev");
  const next = lb.querySelector(".next");
  const cards = Array.from(grid.querySelectorAll(".card"));
  const items = cards.map(c => ({
    src: c.querySelector("img").src,
    captionHTML: c.querySelector("figcaption").innerHTML
  }));
  let i = 0;
  function renderLB() {
    big.src = items[i].src;
    cap.innerHTML = items[i].captionHTML;
  }
  function open(n) {
    i = n;
    renderLB();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
  function nextI() { i = (i + 1) % items.length; renderLB(); }
  function prevI() { i = (i - 1 + items.length) % items.length; renderLB(); }

  cards.forEach((c, idx) =>
    c.querySelector("img").addEventListener("click", () => open(idx))
  );
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  next.addEventListener("click", e => { e.stopPropagation(); nextI(); });
  prev.addEventListener("click", e => { e.stopPropagation(); prevI(); });

  // swipe mobile
  let touchX = null;
  lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; });
  lb.addEventListener("touchend", e => {
    if (touchX === null) return;
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextI() : prevI();
    touchX = null;
  });

  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") nextI();
    if (e.key === "ArrowLeft") prevI();
  });
}
