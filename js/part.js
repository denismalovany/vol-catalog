/* ===========================================================
   VOL Part — рендер детальної сторінки за ?id=
   Підтримує: SVG-рендер, галерея фото (photos[]), lightbox.
   =========================================================== */

(function () {
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const part = (window.PARTS || []).find(p => p.id === id);

  if (!part) {
    document.querySelector("main").innerHTML = `
      <div class="container" style="padding: 80px 0; text-align: center;">
        <h1>Деталь не знайдено</h1>
        <p style="margin-top: 12px;">Можливо, посилання застаріло або деталь була видалена.</p>
        <p style="margin-top: 24px;"><a class="btn" href="./">Повернутись до каталогу</a></p>
      </div>`;
    document.title = "VOL — Деталь не знайдено";
    return;
  }

  document.title = `VOL — ${part.sku} · ${part.name}`;

  /* Crumbs */
  const crumbDev = $("#crumb-device");
  crumbDev.textContent = part.device[0];
  crumbDev.href = `./#device=${encodeURIComponent(part.device[0])}`;
  $("#crumb-name").textContent = part.name;

  /* Meta */
  $("#m-sku").textContent = part.sku;
  $("#m-name").textContent = part.name;
  $("#m-lede").textContent = `Деталь для ${part.device.join(", ")}. ${part.print.tech}-друк, матеріал — ${part.material}.`;

  /* Gallery */
  const hasPhotos = window.RENDER.hasPhotos(part);
  const photos = hasPhotos ? part.photos : [];
  const mainHTML = hasPhotos
    ? `<img id="gal-main-img" src="${photos[0]}" alt="${part.name}">`
    : window.RENDER.placeholder(part, part.sku);
  const counterHTML = hasPhotos
    ? `<div class="gallery__counter" id="gal-counter">1 / ${photos.length}</div>`
    : "";
  const prevDisabled = photos.length <= 1 ? "disabled" : "";
  const nextDisabled = photos.length <= 1 ? "disabled" : "";
  const navHTML = hasPhotos
    ? `<button type="button" class="gallery__nav gallery__nav--prev" id="gal-prev" aria-label="Попереднє фото" ${prevDisabled}>‹</button>
       <button type="button" class="gallery__nav gallery__nav--next" id="gal-next" aria-label="Наступне фото" ${nextDisabled}>›</button>`
    : "";

  let thumbsHTML = "";
  if (hasPhotos) {
    if (photos.length === 1) {
      thumbsHTML = "";
    } else {
      thumbsHTML = `<div class="gallery__thumbs" role="tablist">${
        photos.map((src, i) => `
          <button type="button" class="gallery__thumb" role="tab"
                  data-idx="${i}" aria-current="${i === 0 ? "true" : "false"}"
                  aria-label="Фото ${i + 1} з ${photos.length}">
            <img src="${src}" alt="" loading="lazy">
          </button>`).join("")
      }</div>`;
    }
  }

  $("#gallery").innerHTML = `
    <div class="gallery__main" id="gal-main">
      ${mainHTML}${counterHTML}${navHTML}
    </div>
    ${thumbsHTML}
  `;

  /* Якщо головне фото не завантажилось (файл ще не додали у photos/) —
     замінюємо на SVG-рендер і прибираємо лічильник/навігацію. */
  if (hasPhotos) {
    const mainImg = $("#gal-main-img");
    if (mainImg) {
      mainImg.addEventListener("error", () => {
        const host = $("#gal-main");
        if (!host) return;
        host.innerHTML = fallbackSVG;
        const thumbs = document.querySelector(".gallery__thumbs");
        if (thumbs) thumbs.remove();
      }, { once: true });
    }
  }

  /* Gallery logic */
  if (hasPhotos) {
    let current = 0;
    const img = $("#gal-main-img");
    const counter = $("#gal-counter");
    const btnPrev = $("#gal-prev");
    const btnNext = $("#gal-next");
    const thumbs = Array.from(document.querySelectorAll(".gallery__thumb"));

    function go(i) {
      current = ((i % photos.length) + photos.length) % photos.length;
      img.src = photos[current];
      counter.textContent = `${current + 1} / ${photos.length}`;
      thumbs.forEach((t, k) => t.setAttribute("aria-current", k === current ? "true" : "false"));
    }
    btnPrev.addEventListener("click", () => go(current - 1));
    btnNext.addEventListener("click", () => go(current + 1));
    thumbs.forEach((t, k) => t.addEventListener("click", () => go(k)));

    /* Lightbox */
    const lb = $("#lightbox");
    const lbImg = $("#lb-img");
    const lbCounter = $("#lb-counter");
    const lbClose = $("#lb-close");
    const lbPrev = $("#lb-prev");
    const lbNext = $("#lb-next");

    function openLB() {
      lbImg.src = photos[current];
      lbImg.alt = part.name;
      lbCounter.textContent = `${current + 1} / ${photos.length}`;
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => lbClose.focus());
    }
    function closeLB() {
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function lbStep(delta) {
      current = ((current + delta) % photos.length + photos.length) % photos.length;
      lbImg.src = photos[current];
      lbCounter.textContent = `${current + 1} / ${photos.length}`;
      /* Синхронізуємо main-галерею, щоб після закриття лишилась та сама позиція */
      img.src = photos[current];
      counter.textContent = `${current + 1} / ${photos.length}`;
      thumbs.forEach((t, k) => t.setAttribute("aria-current", k === current ? "true" : "false"));
    }

    $("#gal-main").addEventListener("click", openLB);
    lbClose.addEventListener("click", closeLB);
    lbPrev.addEventListener("click", () => lbStep(-1));
    lbNext.addEventListener("click", () => lbStep(1));
    lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });

    document.addEventListener("keydown", e => {
      if (lb.getAttribute("aria-hidden") === "true") return;
      if (e.key === "Escape") { closeLB(); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { lbStep(-1); e.preventDefault(); }
      else if (e.key === "ArrowRight") { lbStep(1); e.preventDefault(); }
    });
  }

  /* Compat list (deprecated) */

  /* Print params */
  const specs = [
    ["Технологія", part.print.tech]
  ];
  $("#m-print").innerHTML = specs.map(([l, v]) => `
    <div class="spec-card">
      <div class="lbl">${l}</div>
      <div class="val">${v}</div>
    </div>
  `).join("");

  /* Material */
  $("#m-material").innerHTML = `<code>${part.material}</code>`;

  /* Notes */
  $("#m-notes").textContent = part.notes || "—";

  /* Related (за пристроєм, до 6) */
  const related = (window.PARTS || [])
    .filter(p => p.id !== part.id && p.device.some(d => part.device.includes(d)))
    .sort((a, b) => a.sku.localeCompare(b.sku))
    .slice(0, 6);
  if (related.length) {
    $("#related-wrap").hidden = false;
    $("#related").innerHTML = related.map(p => `
      <div class="related__card">
        <a href="./part.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
        <div class="sku">${p.sku}</div>
      </div>
    `).join("");
  }
})();
