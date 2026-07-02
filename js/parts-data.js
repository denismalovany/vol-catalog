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

  { id:"vol-123", sku:"123", department:"Оптика",
    name:"",
    device:["DJI Inspire 3","DJI Matrice 30","DJI Matrice 300","DJI Matrice 300 RTK","DJI Matrice 4","DJI Mavic 2","DJI Mavic 3","DJI Mavic 3 Pro","DJI Mavic Air 2","DJI Mavic Mini 2","Багатофункціональний прилад спостереження МП-11","Багатофункціональний прилад спостереження МП-7","Багатофункціональний прилад спостереження МП-9","ПНБ Challenger GS","ПНБ PVS-14","ПНБ PVS-14 (репліка)","ПНБ PVS-7","Тепловізор Flir Scout III","Тепловізор Flir Scout TK","Тепловізор Pulsar Helion 2","Тепловізійний приціл Pulsar Helion 2","Тепловізійний приціл Pulsar Trail 2","Універсальний"],
    photos:["photos/vol-123-1.png","photos/vol-123-2.png","photos/123-1.png","photos/123-2.png"],
    print:{ tech:"FDM" },
    material:"PETG",
    notes:"" },


  /* ── DJI Matrice ──────────────────────────────────────── */








  /* ── Багатофункціональні прилади спостереження ─────────── */








  /* ── Тепловізійні приціли ─────────────────────────────── */




  /* ── Тепловізори ──────────────────────────────────────── */








  /* ── Прилади нічного бачення (ПНБ) ───────────────────── */








  /* ── Крос-пристрої: універсальні деталі ─────────────── */

  { id:"vol-199", sku:"199", department:"Дрони",
    name:"конектор антенн для DJI RC Plus 2",
    device:["DJI Inspire 3","DJI Matrice 4"],
    type:"Корпусна",
    photos:["photos/199-1.png","photos/199-2.png"],
    print:{ tech:"FDM" },
    material:"PETG",
    notes:"" }

];

/* sync-push test */

/* sync-push test */

/* sync-push test */

/* sync-push test */

/* push hang test */

/* push hang test */

/* push hang test */
