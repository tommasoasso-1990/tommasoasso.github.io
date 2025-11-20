// js/works.js

// elenco opere (unica fonte di verità)
const WORKS = [
  { file: "2024-80x100.jpg",        title: "2024",                 meta: "80×100 cm · 2024" },
  { file: "città-blu-90x70.jpg",    title: "Città blu",            meta: "90×70 cm · 2024" },
  { file: "città-del-nord-50x70.jpg", title: "Città del nord",    meta: "50×70 cm · 2024" },
  { file: "volterra-50x70.jpg",     title: "Volterra",             meta: "50×70 cm · 2024" },
  { file: "città-sul-fiume-100x120.jpg", title: "Città sul fiume", meta: "100×120 cm · 2024" },
  { file: "finestra-30x80.jpg",     title: "Finestra",             meta: "30×80 cm · 2024" },
  { file: "la-città-lontana-50x60.jpg", title: "La città lontana", meta: "50×60 cm · 2024" },
  { file: "vienna-50x70.jpg",       title: "Vienna",               meta: "50×70 cm · 2024" },
  { file: "il-fumatore-70x50.jpg",  title: "Il fumatore",          meta: "70×50 cm · 2023" },
  { file: "pianista-con-gallo-70x50.jpg", title: "Pianista con gallo", meta: "70×50 cm · 2023" },
  { file: "portico-30x25.jpg",      title: "Portico",              meta: "30×25 cm · 2023" },
  { file: "ricordo-di-una-città-30x25.jpg", title: "Ricordo di una città", meta: "30×25 cm · 2023" },
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
      <img src="${imgPrefix}images/${work.file}" alt="${work.title} — ${work.meta}">
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
  function nextI() {
    i = (i + 1) % items.length;
    renderLB();
  }
  function prevI() {
    i = (i - 1 + items.length) % items.length;
    renderLB();
  }

  cards.forEach((c, idx) =>
    c.querySelector("img").addEventListener("click", () => open(idx))
  );

  lb.addEventListener("click", e => {
    if (e.target === lb) close();
  });
  next.addEventListener("click", e => {
    e.stopPropagation();
    nextI();
  });
  prev.addEventListener("click", e => {
    e.stopPropagation();
    prevI();
  });

  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") nextI();
    if (e.key === "ArrowLeft") prevI();
  });
}

