/* ===========================================================
   VOL Catalog — логіка фільтрів, пошуку, сортування.
   Без зовнішніх залежностей. Працює на GitHub Pages.
   =========================================================== */

(function () {
  const parts = window.PARTS || [];
  const cat = window.CATALOG;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    q: "",
    sort: "sku",
    departments: new Set(),
    devices: new Set(),
    types: new Set()
  };

  /* Зведений список типів з усіх відділів (уникаємо дублювання). */
  const allTypes = [...new Set(cat.departments.flatMap(d => d.types))];
  const departmentNames = cat.departments.map(d => d.name);

  /* ---------- Deep-link з URL hash (напр. з part.html#device=DJI Mavic) ---------- */
  function applyHashFilters() {
    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;
    hash.split("&").forEach(pair => {
      const [k, v] = pair.split("=");
      if (k === "department" && v) {
        const decoded = decodeURIComponent(v);
        if (departmentNames.includes(decoded)) state.departments.add(decoded);
      }
      if (k === "device" && v) {
        const decoded = decodeURIComponent(v);
        /* Дозволяємо тільки якщо такий пристрій існує в CATALOG */
        if (cat.devices.includes(decoded)) state.devices.add(decoded);
      }
      if (k === "type" && v) {
        const decoded = decodeURIComponent(v);
        if (allTypes.includes(decoded)) state.types.add(decoded);
      }
    });
  }
  applyHashFilters();

  /* ---------- Ініціалізація статистики hero ---------- */
  $("#stat-total").textContent = parts.length;
  $("#stat-devices").textContent = cat.devices.length;
  $("#stat-types").textContent = allTypes.length;
  $("#stat-techs").textContent = cat.techs.length;

  /* ---------- Побудова чіпів ---------- */
  function buildChips(containerId, items, stateSet, prefix) {
    const container = $("#" + containerId);
    container.innerHTML = "";
    const label = containerId === "chips-department" ? "Відділ:"
                 : containerId === "chips-device"    ? "Пристрій:"
                 : "Тип:";
    const labelEl = document.createElement("span");
    labelEl.style.cssText = "font:600 11px/1 var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;color:var(--text);align-self:center;margin-right:4px;";
    labelEl.textContent = label;
    container.appendChild(labelEl);

    items.forEach(item => {
      const count = parts.filter(p => {
        if (containerId === "chips-department") return p.department === item;
        if (containerId === "chips-device") return p.device.some(d => deviceMatches(d, item));
        return p.type === item;
      }).length;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.value = item;
      chip.setAttribute("aria-pressed", stateSet.has(item) ? "true" : "false");
      chip.innerHTML = `${item} <span class="chip__count">${count}</span>`;
      chip.addEventListener("click", () => {
        if (stateSet.has(item)) stateSet.delete(item);
        else stateSet.add(item);
        chip.setAttribute("aria-pressed", stateSet.has(item) ? "true" : "false");
        render();
        recountChips();
      });
      container.appendChild(chip);
    });
  }

  function deviceMatches(deviceValue, chipKey) {
    /* device: "DJI Mavic" має ловити chip "DJI Mavic" і часткові збіги. */
    return deviceValue === chipKey || deviceValue.startsWith(chipKey + " ");
  }

  buildChips("chips-department", departmentNames, state.departments, "dp");
  buildChips("chips-device", cat.devices, state.devices, "d");
  buildChips("chips-type", allTypes, state.types, "t");

  /* Sync aria-pressed якщо deep-link прийшов через hash */
  if (state.departments.size || state.devices.size || state.types.size) {
    $$(".chip").forEach(c => {
      const v = c.dataset.value;
      const pressed = state.departments.has(v) || state.devices.has(v) || state.types.has(v);
      c.setAttribute("aria-pressed", pressed ? "true" : "false");
    });
  }

  /* ---------- Пошук ---------- */
  $("#q").addEventListener("input", e => {
    state.q = e.target.value.trim().toLowerCase();
    render();
    recountChips();
  });

  /* ---------- Сортування ---------- */
  $("#sort").addEventListener("change", e => {
    state.sort = e.target.value;
    render();
  });

  /* ---------- Скидання ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest('[data-action="reset"]');
    if (t) { reset(); e.preventDefault(); }
  });
  $("#reset").addEventListener("click", () => { reset(); });

  function reset() {
    state.q = "";
    state.departments.clear();
    state.devices.clear();
    state.types.clear();
    $("#q").value = "";
    $("#sort").value = "sku";
    state.sort = "sku";
    $$(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
    render();
    recountChips();
  }

  /* ---------- Фільтрація та сортування ---------- */
  function applyFilters() {
    let out = parts.slice();
    if (state.departments.size) {
      out = out.filter(p => state.departments.has(p.department));
    }
    if (state.devices.size) {
      out = out.filter(p => p.device.some(d =>
        Array.from(state.devices).some(chip => deviceMatches(d, chip))
      ));
    }
    if (state.types.size) {
      out = out.filter(p => state.types.has(p.type));
    }
    if (state.q) {
      const q = state.q;
      out = out.filter(p => {
        return (p.sku || "").toLowerCase().includes(q)
          || (p.name || "").toLowerCase().includes(q)
          || (p.material || "").toLowerCase().includes(q)
          || (p.type || "").toLowerCase().includes(q)
          || p.device.join(" ").toLowerCase().includes(q)
          || (p.compat || []).join(" ").toLowerCase().includes(q)
          || (p.notes || "").toLowerCase().includes(q);
      });
    }
    const cmp = {
      sku: (a, b) => a.sku.localeCompare(b.sku),
      name: (a, b) => a.name.localeCompare(b.name, "uk"),
      device: (a, b) => (a.device[0] || "").localeCompare(b.device[0] || "", "uk"),
      type: (a, b) => a.type.localeCompare(b.type, "uk")
    }[state.sort];
    out.sort(cmp);
    return out;
  }

  /* ---------- Рендер карток ---------- */
  function cardHTML(p) {
    const href = `./part.html?id=${encodeURIComponent(p.id)}`;
    const hasPhotos = window.RENDER.hasPhotos(p);
    const photo = hasPhotos ? p.photos[0] : null;
    const renderSVG = (window.RENDER.archetypes[p.archetype] || window.RENDER.archetypes._default)(p);
    const mediaHTML = photo
      ? `<img src="${photo}" alt="${p.name}" loading="lazy" decoding="async">`
      : renderSVG;
    const badge = hasPhotos && p.photos.length > 1
      ? `<span class="card__photo-count" aria-label="${p.photos.length} фото">1 / ${p.photos.length}</span>`
      : "";
    return `
      <article class="card" data-id="${p.id}">
        <a class="card__link" href="${href}" aria-label="Відкрити деталь: ${p.name}"></a>
        <div class="card__render" data-fallback="${hasPhotos ? '1' : '0'}">${mediaHTML}${badge}</div>
        <div class="card__body">
          <div class="card__meta">
            <span class="card__sku">${p.sku}</span>
            <span class="card__type">${p.type}</span>
          </div>
          <h3>${p.name}</h3>
          <div class="card__compat">${p.device.join(" · ")}</div>
          <div class="card__specs">
            <span><span>Технологія</span><strong>${p.print.tech}</strong></span>
            <span><span>Шар</span><strong>${p.print.layer}</strong></span>
            <span><span>Заповнення</span><strong>${p.print.infill}</strong></span>
            <span><span>Маса</span><strong>${p.print.mass}</strong></span>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const list = applyFilters();
    const grid = $("#grid");
    $("#result-count").textContent = `Знайдено: ${list.length} ${pluralize(list.length, ["деталь", "деталі", "деталей"])}`;
    if (list.length === 0) {
      grid.outerHTML = `
        <div class="empty" id="grid">
          <h3>Нічого не знайдено</h3>
          <p>Спробуйте змінити пошуковий запит або скинути фільтри.</p>
          <button type="button" data-action="reset">Скинути фільтри</button>
        </div>`;
    } else {
      /* Replace content of #grid in-place, but ensure the node still has id="grid" */
      const newNode = document.createElement("div");
      newNode.id = "grid";
      newNode.className = "grid";
      newNode.innerHTML = list.map(cardHTML).join("");
      const old = $("#grid");
      old.replaceWith(newNode);

      /* Якщо фото не завантажилось — фолбек на SVG-рендер (без бейджа).
         Це на випадок, коли файл у photos/ ще не додали, а деталь вже
         прописана у parts-data.js. */
      newNode.querySelectorAll(".card__render img").forEach(img => {
        img.addEventListener("error", () => {
          const host = img.closest(".card__render");
          if (!host) return;
          const card = host.closest(".card");
          if (!card) return;
          const part = (window.PARTS || []).find(p => p.id === card.dataset.id);
          if (!part) return;
          const svg = (window.RENDER.archetypes[part.archetype] || window.RENDER.archetypes._default)(part);
          host.innerHTML = svg;
        }, { once: true });
      });
    }
  }

  function pluralize(n, forms) {
    const mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
    return forms[2];
  }

  /* ---------- Sync chips counts when filters change ----------
     Counts показують, скільки деталей буде доступно, якщо обрати
     цей чіп разом з поточним фільтром з ІНШОЇ категорії. Це типова
     поведінка faceted-фільтрів і допомагає зрозуміти, чи варто клікати. */
  function recountChips() {
    const baseFiltered = parts.filter(p => {
      if (state.departments.size) {
        if (!state.departments.has(p.department)) return false;
      }
      if (state.devices.size) {
        if (!p.device.some(d => Array.from(state.devices).some(chip => deviceMatches(d, chip)))) return false;
      }
      if (state.types.size) {
        if (!state.types.has(p.type)) return false;
      }
      if (state.q) {
        const q = state.q;
        const hay = [p.sku, p.name, p.material, p.type, p.device.join(" "), (p.compat || []).join(" "), p.notes || ""].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    function countWithExtra(extra) {
      return baseFiltered.filter(p => extra(p)).length;
    }

    [
      { id: "chips-department", items: departmentNames, hideEmpty: true  },
      { id: "chips-device",     items: cat.devices,    hideEmpty: true  },
      { id: "chips-type",       items: allTypes,       hideEmpty: true  }
    ].forEach(group => {
      group.items.forEach(item => {
        const chipItem = item;
        const count = countWithExtra(p => {
          if (group.id === "chips-department") return p.department === chipItem;
          if (group.id === "chips-device") return p.device.some(d => deviceMatches(d, chipItem));
          return p.type === chipItem;
        });
        const chipEl = document.querySelector(`#${group.id} .chip[data-value="${CSS.escape(item)}"]`);
        if (!chipEl) return;
        const countEl = chipEl.querySelector(".chip__count");
        if (countEl) countEl.textContent = count;
        chipEl.style.display = (group.hideEmpty && count === 0) ? "none" : "";
      });
    });
  }

  /* ---------- Старт ---------- */
  render();
  recountChips();
})();
