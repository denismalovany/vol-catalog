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
    photos:["photos/vol-оп-40-1.png","photos/vol-оп-40-2.png","photos/vol-оп-40-3.png","photos/vol-оп-40-4.png"],
    print:{ tech:"FDM" },
    material:["TPU"],
    notes:"" },

  { id:"vol-оп-41", sku:"ОП-41", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-41-1.png","photos/vol-оп-41-2.png","photos/vol-оп-41-3.png","photos/vol-оп-41-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-42", sku:"ОП-42", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-42-1.png","photos/vol-оп-42-2.png","photos/vol-оп-42-3.png","photos/vol-оп-42-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-57", sku:"ОП-57", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-57-1.png","photos/vol-оп-57-2.png","photos/vol-оп-57-3.png","photos/vol-оп-57-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-60", sku:"ОП-60", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-60-1.png","photos/vol-оп-60-2.png","photos/vol-оп-60-3.png","photos/vol-оп-60-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-67", sku:"ОП-67", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-67-1.png","photos/vol-оп-67-2.png","photos/vol-оп-67-3.png","photos/vol-оп-67-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-68", sku:"ОП-68", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-68-1.png","photos/vol-оп-68-2.png","photos/vol-оп-68-3.png","photos/vol-оп-68-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-71", sku:"ОП-71", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-71-1.png","photos/vol-оп-71-2.png","photos/vol-оп-71-3.png","photos/vol-оп-71-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-74", sku:"ОП-74", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-74-1.png","photos/vol-оп-74-2.png","photos/vol-оп-74-3.png","photos/vol-оп-74-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-73", sku:"ОП-73", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-73-1.png","photos/vol-оп-73-2.png","photos/vol-оп-73-3.png","photos/vol-оп-73-4.png"],
    print:{ tech:"FDM" },
    material:[""],
    notes:"" },

  { id:"vol-оп-75", sku:"ОП-75", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-75-1.png","photos/vol-оп-75-2.png","photos/vol-оп-75-3.png","photos/vol-оп-75-4.png","photos/vol-оп-75-2-1.png","photos/vol-оп-75-2-2.png","photos/vol-оп-75-2-3.png","photos/vol-оп-75-2-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-76", sku:"ОП-76", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-76-1.png","photos/vol-оп-76-2.png","photos/vol-оп-76-3.png","photos/vol-оп-76-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-79", sku:"ОП-79", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-79-1.png","photos/vol-оп-79-2.png","photos/vol-оп-79-3.png","photos/vol-оп-79-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-81", sku:"ОП-81", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-81-1.png","photos/vol-оп-81-2.png","photos/vol-оп-81-3.png","photos/vol-оп-81-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-82", sku:"ОП-82", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-82-1.png","photos/vol-оп-82-2.png","photos/vol-оп-82-3.png","photos/vol-оп-82-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-85", sku:"ОП-85", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-85-1.png","photos/vol-оп-85-2.png","photos/vol-оп-85-3.png","photos/vol-оп-85-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-115", sku:"ОП-115", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-115-1.png","photos/vol-оп-115-2.png","photos/vol-оп-115-3.png","photos/vol-оп-115-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-116", sku:"ОП-116", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-116-1.png","photos/vol-оп-116-2.png","photos/vol-оп-116-3.png","photos/vol-оп-116-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-117", sku:"ОП-117", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-117-1.png","photos/vol-оп-117-2.png","photos/vol-оп-117-3.png","photos/vol-оп-117-4.png","photos/vol-оп-117-2-1.png","photos/vol-оп-117-2-2.png","photos/vol-оп-117-2-3.png","photos/vol-оп-117-2-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-118", sku:"ОП-118", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-118-1.png","photos/vol-оп-118-2.png","photos/vol-оп-118-3.png","photos/vol-оп-118-4.png","photos/vol-оп-118-2-1.png","photos/vol-оп-118-2-2.png","photos/vol-оп-118-2-3.png","photos/vol-оп-118-2-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-108", sku:"ОП-108", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-108-1.png","photos/vol-оп-108-2.png","photos/vol-оп-108-3.png","photos/vol-оп-108-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-107", sku:"ОП-107", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-107-1.png","photos/vol-оп-107-2.png","photos/vol-оп-107-3.png","photos/vol-оп-107-4.png","photos/vol-оп-107-2-1.png","photos/vol-оп-107-2-2.png","photos/vol-оп-107-2-3.png","photos/vol-оп-107-2-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-112", sku:"ОП-112", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-112-1.png","photos/vol-оп-112-2.png","photos/vol-оп-112-3.png","photos/vol-оп-112-4.png","photos/vol-оп-112-2-1.png","photos/vol-оп-112-2-2.png","photos/vol-оп-112-2-3.png","photos/vol-оп-112-2-4.png"],
    print:{ tech:"FDM" },
    material:[],
    notes:"" },

  { id:"vol-оп-113", sku:"ОП-113", department:"Оптика",
    name:"",
    device:[],
    photos:["photos/vol-оп-113-1.png","photos/vol-оп-113-2.png","photos/vol-оп-113-3.png","photos/vol-оп-113-4.png","photos/vol-оп-113-2-1.png","photos/vol-оп-113-2-2.png","photos/vol-оп-113-2-3.png","photos/vol-оп-113-2-4.png"],
    print:{ tech:"FDM" },
    material:[],
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
