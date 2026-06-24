/* ===========================================================
   Параметризовані SVG-рендери деталей.
   Кожна функція повертає рядок із повним <svg>.
   Стиль — технічний креслярський: лінії, штриховка, без градієнтів.
   Палітра: лінії #1c1b1a, фон поверхні #fafbfc, акцент #2297b2.
   =========================================================== */

(function () {
  const FG = "#1c1b1a";
  const MUTED = "#6b6964";
  const SURFACE = "#fafbfc";
  const BORDER = "#e1e8ed";
  const ACCENT = "#2297b2";
  const ACCENT_FADE = "rgba(34, 151, 178, 0.10)";

  const stroke = `stroke="${FG}" stroke-width="1.2" fill="none" stroke-linejoin="round" stroke-linecap="round"`;
  const mutedStroke = `stroke="${MUTED}" stroke-width="0.8" fill="none"`;
  const hairline = `stroke="${BORDER}" stroke-width="0.6" fill="none"`;

  function frame(w, h, inner, label) {
    const safe = (label || "Render").replace(/"/g, "&quot;");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${safe}">
      <rect x="0" y="0" width="${w}" height="${h}" fill="${SURFACE}"/>
      <g>${inner}</g>
    </svg>`;
  }

  function hatch(id, x, y, w, h, color = MUTED, step = 4) {
    return `<defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="${step}" height="${step}" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="${step}" stroke="${color}" stroke-width="0.6"/>
    </pattern></defs>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>`;
  }

  const archetypes = {

    /* Корпусна плита / панель */
    body_plate(p) {
      const w = 320, h = 220;
      const mat = (p && p.material || "").toLowerCase();
      const fillColor = mat.includes("pa-cf") || mat.includes("petg-cf") ? "#2a2a2a" :
                        mat.includes("resin") ? "#e8e6e0" :
                        mat.includes("pla+") ? "#1c1b1a" :
                        mat.includes("petg") ? "#3a3a3a" : "#444";
      const inner = `
        <g transform="translate(40 30)">
          <rect x="0" y="0" width="240" height="160" rx="4" ${stroke} fill="${fillColor}"/>
          <rect x="0" y="0" width="240" height="160" rx="4" fill="none" stroke="${BORDER}" stroke-width="0.4"/>
          ${hatch("h1", 20, 20, 60, 20)}
          <circle cx="30" cy="30" r="4" ${stroke}/>
          <circle cx="210" cy="30" r="4" ${stroke}/>
          <circle cx="30" cy="130" r="4" ${stroke}/>
          <circle cx="210" cy="130" r="4" ${stroke}/>
          <line x1="60" y1="80" x2="180" y2="80" ${mutedStroke} stroke-dasharray="3 2"/>
          <text x="120" y="84" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="${MUTED}" letter-spacing="0.1em">${(p && p.sku) || "VOL-XXX-000"}</text>
          <line x1="100" y1="20" x2="100" y2="0" ${mutedStroke}/>
          <line x1="180" y1="20" x2="180" y2="0" ${mutedStroke}/>
          <text x="100" y="-4" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">A</text>
          <text x="180" y="-4" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">B</text>
        </g>
        <g transform="translate(40 200)">
          <line x1="0" y1="0" x2="240" y2="0" ${mutedStroke}/>
          <line x1="0" y1="-3" x2="0" y2="3" ${mutedStroke}/>
          <line x1="240" y1="-3" x2="240" y2="3" ${mutedStroke}/>
          <text x="120" y="-6" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">240 мм</text>
        </g>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Кронштейн / кріплення */
    mount_bracket(p) {
      const w = 320, h = 220;
      const inner = `
        <g transform="translate(50 35)">
          <path d="M 0 20 L 0 140 L 80 140 L 80 80 L 200 80 L 200 20 Z" ${stroke} fill="${SURFACE}"/>
          <path d="M 0 20 L 0 140 L 80 140 L 80 80 L 200 80 L 200 20 Z" fill="none" stroke="${BORDER}" stroke-width="0.4"/>
          <circle cx="30" cy="40" r="6" ${stroke}/>
          <circle cx="30" cy="40" r="3" fill="none" stroke="${MUTED}" stroke-width="0.6"/>
          <circle cx="30" cy="120" r="6" ${stroke}/>
          <circle cx="30" cy="120" r="3" fill="none" stroke="${MUTED}" stroke-width="0.6"/>
          <circle cx="170" cy="50" r="6" ${stroke}/>
          <circle cx="170" cy="50" r="3" fill="none" stroke="${MUTED}" stroke-width="0.6"/>
          <rect x="120" y="95" width="60" height="20" rx="2" ${stroke}/>
          <line x1="125" y1="105" x2="175" y2="105" ${mutedStroke} stroke-dasharray="2 1.5"/>
          <text x="150" y="108" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">1/4″-20</text>
          <line x1="0" y1="20" x2="-10" y2="20" ${mutedStroke}/>
          <line x1="0" y1="140" x2="-10" y2="140" ${mutedStroke}/>
          <text x="-14" y="83" text-anchor="end" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">120</text>
        </g>
        <g transform="translate(50 200)">
          <line x1="0" y1="0" x2="200" y2="0" ${mutedStroke}/>
          <line x1="0" y1="-3" x2="0" y2="3" ${mutedStroke}/>
          <line x1="200" y1="-3" x2="200" y2="3" ${mutedStroke}/>
          <text x="100" y="-6" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">200 мм</text>
        </g>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Кільце-адаптер (різьбовий) */
    ring_adapter(p) {
      const w = 320, h = 220;
      const inner = `
        <g transform="translate(160 110)">
          <circle r="70" ${stroke} fill="${SURFACE}"/>
          <circle r="58" ${stroke} fill="none"/>
          <circle r="50" ${stroke} fill="none" stroke-dasharray="1.5 1.2"/>
          <circle r="38" ${mutedStroke}/>
          <circle r="6" fill="${ACCENT_FADE}" stroke="${ACCENT}" stroke-width="0.8"/>
          ${hatch("rh", -38, -38, 76, 76, MUTED, 5)}
          <line x1="0" y1="-70" x2="0" y2="-80" ${mutedStroke}/>
          <line x1="0" y1="70" x2="0" y2="80" ${mutedStroke}/>
          <line x1="-70" y1="0" x2="-80" y2="0" ${mutedStroke}/>
          <line x1="70" y1="0" x2="80" y2="0" ${mutedStroke}/>
          <text x="0" y="-86" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">Ø 140</text>
          <text x="0" y="92" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">M52×0.75</text>
        </g>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Кришка об'єктива */
    lens_cap(p) {
      const w = 320, h = 220;
      const inner = `
        <g transform="translate(160 110)">
          <circle r="60" ${stroke} fill="${SURFACE}"/>
          <circle r="48" ${stroke}/>
          <circle r="36" ${mutedStroke} stroke-dasharray="1.5 1.2"/>
          <circle r="10" fill="${ACCENT_FADE}" stroke="${ACCENT}" stroke-width="0.6"/>
          <line x1="-60" y1="0" x2="-72" y2="0" ${mutedStroke}/>
          <line x1="60" y1="0" x2="72" y2="0" ${mutedStroke}/>
          <text x="0" y="-78" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">Ø 120</text>
          <g transform="translate(75 -10)">
            <line x1="0" y1="0" x2="20" y2="0" ${mutedStroke}/>
            <line x1="0" y1="0" x2="20" y2="-10" ${mutedStroke}/>
            <text x="22" y="-2" font-family="ui-monospace, monospace" font-size="7" fill="${MUTED}">FLAT</text>
          </g>
        </g>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Шестерня / зубчасте колесо */
    gear_set(p) {
      const w = 320, h = 220;
      const teeth = 24;
      const rOut = 70, rIn = 56, rBore = 12;
      const path = [];
      for (let i = 0; i < teeth * 2; i++) {
        const a = (Math.PI * 2 * i) / (teeth * 2);
        const r = i % 2 === 0 ? rOut : rIn;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        path.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      const teethPath = path.join(" ");
      const inner = `
        <g transform="translate(160 110)">
          <path d="${teethPath} Z" ${stroke} fill="${SURFACE}"/>
          <circle r="42" ${mutedStroke} stroke-dasharray="2 1.5"/>
          <circle r="${rBore}" ${stroke} fill="${SURFACE}"/>
          <circle r="${rBore - 3}" fill="none" stroke="${MUTED}" stroke-width="0.5"/>
          ${hatch("gh", -rIn, -rIn, rIn * 2, rIn * 2, MUTED, 4)}
          <line x1="0" y1="-70" x2="0" y2="-80" ${mutedStroke}/>
          <text x="0" y="-86" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">m=0.5</text>
          <text x="0" y="100" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">24 зуби · M=0.5</text>
        </g>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Кабель-фіксатор / стропа */
    cable_strap(p) {
      const w = 320, h = 220;
      const inner = `
        <g transform="translate(40 90)">
          <path d="M 0 20 Q 0 0 20 0 L 100 0 L 100 20 L 100 40 L 220 40 L 240 40 L 240 20 Q 240 0 220 0" ${stroke} fill="${SURFACE}"/>
          <line x1="20" y1="20" x2="220" y2="20" ${mutedStroke} stroke-dasharray="2 1.5"/>
          <line x1="40" y1="0" x2="40" y2="20" ${mutedStroke}/>
          <line x1="100" y1="0" x2="100" y2="20" ${mutedStroke}/>
          <line x1="160" y1="0" x2="160" y2="20" ${mutedStroke}/>
          <line x1="200" y1="0" x2="200" y2="20" ${mutedStroke}/>
          <circle cx="55" cy="20" r="4" fill="none" stroke="${MUTED}" stroke-width="0.6"/>
          <circle cx="185" cy="20" r="4" fill="none" stroke="${MUTED}" stroke-width="0.6"/>
          <g transform="translate(120 60)">
            <ellipse cx="0" cy="0" rx="14" ry="14" ${stroke} fill="${ACCENT_FADE}"/>
            <text x="0" y="3" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${ACCENT}">Ø 4-6</text>
          </g>
        </g>
        <text x="160" y="200" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">TPU 95A</text>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Антена-модуль */
    antenna_module(p) {
      const w = 320, h = 220;
      const inner = `
        <g transform="translate(160 110)">
          <rect x="-15" y="-50" width="30" height="100" rx="2" ${stroke} fill="${SURFACE}"/>
          <rect x="-12" y="-45" width="24" height="20" ${stroke}/>
          <rect x="-12" y="-20" width="24" height="20" ${stroke}/>
          <line x1="-15" y1="0" x2="15" y2="0" ${mutedStroke} stroke-dasharray="1.5 1.5"/>
          <line x1="-15" y1="20" x2="15" y2="20" ${mutedStroke} stroke-dasharray="1.5 1.5"/>
          <rect x="-12" y="20" width="24" height="20" ${stroke}/>
          <circle cx="0" cy="55" r="8" ${stroke} fill="${SURFACE}"/>
          <circle cx="0" cy="55" r="4" fill="none" stroke="${MUTED}" stroke-width="0.5"/>
          <line x1="0" y1="-50" x2="0" y2="-60" ${mutedStroke}/>
          <line x1="0" y1="63" x2="0" y2="73" ${mutedStroke}/>
          <text x="0" y="-66" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">2.4/5.8 ГГц</text>
          <text x="0" y="86" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">SMA</text>
          <g transform="translate(25 -10)">
            <path d="M 0 0 L 10 0 M 8 -2 L 10 0 L 8 2" ${mutedStroke}/>
            <text x="14" y="3" font-family="ui-monospace, monospace" font-size="7" fill="${MUTED}">RP-SMA</text>
          </g>
        </g>`;
      return frame(w, h, inner, p && p.name);
    },

    /* Демпфер / захист (бампер, накладка) */
    bumper_strap(p) {
      const w = 320, h = 220;
      const inner = `
        <g transform="translate(40 60)">
          <path d="M 0 40 Q 0 0 40 0 L 200 0 Q 240 0 240 40 L 240 60 Q 240 100 200 100 L 40 100 Q 0 100 0 60 Z" ${stroke} fill="${SURFACE}"/>
          <path d="M 0 40 Q 0 0 40 0 L 200 0 Q 240 0 240 40 L 240 60 Q 240 100 200 100 L 40 100 Q 0 100 0 60 Z" fill="${ACCENT_FADE}"/>
          <line x1="0" y1="50" x2="240" y2="50" ${mutedStroke} stroke-dasharray="3 2"/>
          <circle cx="40" cy="50" r="6" ${stroke}/>
          <circle cx="200" cy="50" r="6" ${stroke}/>
          ${hatch("bh", 60, 20, 120, 60, MUTED, 4)}
          <line x1="0" y1="50" x2="-10" y2="50" ${mutedStroke}/>
          <line x1="240" y1="50" x2="250" y2="50" ${mutedStroke}/>
          <text x="-14" y="53" text-anchor="end" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">A-A</text>
        </g>
        <g transform="translate(40 200)">
          <line x1="0" y1="0" x2="240" y2="0" ${mutedStroke}/>
          <line x1="0" y1="-3" x2="0" y2="3" ${mutedStroke}/>
          <line x1="240" y1="-3" x2="240" y2="3" ${mutedStroke}/>
          <text x="120" y="-6" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${MUTED}">240 мм</text>
        </g>`;
      return frame(w, h, inner, p && p.name);
    }
  };

  /* Плейсхолдер для невідомого архетипу */
  archetypes._default = function (p) {
    const w = 320, h = 220;
    const inner = `
      <g transform="translate(160 110)">
        <rect x="-80" y="-50" width="160" height="100" rx="4" ${stroke} fill="${SURFACE}"/>
        <line x1="-80" y1="0" x2="80" y2="0" ${mutedStroke} stroke-dasharray="2 1.5"/>
        <line x1="0" y1="-50" x2="0" y2="50" ${mutedStroke} stroke-dasharray="2 1.5"/>
        <text x="0" y="6" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="${MUTED}" letter-spacing="0.1em">RENDER PENDING</text>
      </g>`;
    return frame(w, h, inner, p && p.name);
  };

  /* Сірий SVG-плейсхолдер (використовується як background під <img>
     у випадку, коли у деталі немає жодного фото, або коли фото ще
     не завантажилось). Без зовнішніх залежностей, легший за 1KB. */
  function placeholder(p, label) {
    const name = (label || (p && p.sku) || "PART").toString().replace(/</g, "&lt;");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="presentation">
      <rect width="320" height="220" fill="${SURFACE}"/>
      <g transform="translate(160 110)" stroke="${BORDER}" stroke-width="1" fill="none">
        <rect x="-90" y="-50" width="180" height="100" rx="4"/>
        <line x1="-90" y1="0" x2="90" y2="0" stroke-dasharray="2 1.5"/>
        <line x1="0" y1="-50" x2="0" y2="50" stroke-dasharray="2 1.5"/>
      </g>
      <text x="160" y="118" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="${MUTED}" letter-spacing="0.1em">${name}</text>
    </svg>`;
  }

  function hasPhotos(p) {
    return !!(p && Array.isArray(p.photos) && p.photos.length > 0);
  }

  window.RENDER = { archetypes, frame, placeholder, hasPhotos };
})();
