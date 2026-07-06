/* ===========================================================
   VOL — Каталог 3D-друкованих запчастин
   Список деталей. Кожен запис — це:
     id, sku, name, device[], photos?[],
     print{tech}, material, notes
   (поле print тепер містить тільки tech: FDM/SLA)
   Рендери — тільки фото-режим (див. photos: [...]). SVG-фолбек render.js прибрано.
   Якщо вказано `photos: [...]` — картка показує перше фото; на сторінці деталі —
   повна галерея. Шляхи відносні до кореня сайту (напр. "photos/mavic-001-1.jpg").
   =========================================================== */

window.PARTS = [
  /* ── DJI Mavic ─────────────────────────────────────────── */

  { id:"vol-оп-40", sku:"ОП-40", department:"Оптика",
    name:"AGM Rattler Buttons",
    device:[],
    photos:["photos/vol-оп-40-1.png","photos/vol-оп-40-2.png"],
    print:{ tech:"FDM" },
    material:["TPU"],
    notes:"" },

  { id:"vol-оп-41", sku:"ОП-41", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-41-1.png","photos/vol-оп-41-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-42", sku:"ОП-42", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-42-1.png","photos/vol-оп-42-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-57", sku:"ОП-57", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-57-1.png","photos/vol-оп-57-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-60", sku:"ОП-60", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-60-1.png","photos/vol-оп-60-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-67", sku:"ОП-67", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-67-1.png","photos/vol-оп-67-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-68", sku:"ОП-68", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-68-1.png","photos/vol-оп-68-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-71", sku:"ОП-71", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-71-1.png","photos/vol-оп-71-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-74", sku:"ОП-74", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-74-1.png","photos/vol-оп-74-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },

  { id:"vol-оп-73", sku:"ОП-73", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-73-1.png","photos/vol-оп-73-2.png"],
    print:{ tech:"FDM" },
    material:"",
    notes:"" },


  /* ── DJI Matrice ──────────────────────────────────────── */








  /* ── Багатофункціональні прилади спостереження ─────────── */








  /* ── Тепловізійні приціли ─────────────────────────────── */




  /* ── Тепловізори ──────────────────────────────────────── */








  /* ── Прилади нічного бачення (ПНБ) ───────────────────── */








  /* ── Крос-пристрої: універсальні деталі ─────────────── */


];

/* sync-push test */

/* sync-push test */

/* sync-push test */

/* sync-push test */

/* push hang test */

/* push hang test */

/* push hang test */
