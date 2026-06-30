/* render.js — utility helpers for the catalog.
 *
 * Each part has a photos: [...] field. The catalog and part-detail pages
 * render the first photo. hasPhotos() reports whether a part has any
 * photos. placeholder() is a tiny inline SVG used as a fallback when
 * the actual image is not available yet (e.g. on first load).
 *
 * The legacy SVG archetypes (body_plate, mount_bracket, ...) were
 * removed when archetype was dropped from the data model. STL is
 * now required for every part, so every part has photos.
 */
(function () {
  'use strict';

  /* Сірий SVG-плейсхолдер (якщо фото ще не завантажилось). */
  function placeholder(p, label) {
    var name = String(label || (p && p.sku) || 'PART').replace(/</g, '&lt;');
    return [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="presentation">',
      '<rect width="320" height="220" fill="#f4f5f7"/>',
      '<g transform="translate(160 110)" stroke="#c8ccd4" stroke-width="1" fill="none">',
      '<rect x="-90" y="-50" width="180" height="100" rx="4"/>',
      '<line x1="-90" y1="0" x2="90" y2="0" stroke-dasharray="2 1.5"/>',
      '<line x1="0" y1="-50" x2="0" y2="50" stroke-dasharray="2 1.5"/>',
      '</g>',
      '<text x="160" y="118" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="#8a8f9a" letter-spacing="0.1em">',
      name,
      '</text>',
      '</svg>'
    ].join('');
  }

  function hasPhotos(p) {
    return !!(p && Array.isArray(p.photos) && p.photos.length > 0);
  }

  window.RENDER = { placeholder: placeholder, hasPhotos: hasPhotos };
})();
