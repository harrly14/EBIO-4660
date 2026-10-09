// Click a specimen photo to view it full size; click, Escape, or the backdrop closes it.
const EXPANDABLE = '.practical-image-grid img, .visual-box img';

export function installLightbox() {
  let overlay = null;

  function close() {
    overlay?.remove();
    overlay = null;
  }

  function open(img) {
    close();
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Expanded photo');
    const full = document.createElement('img');
    full.src = img.currentSrc || img.src;
    full.alt = img.alt;
    overlay.append(full);
    overlay.addEventListener('click', close);
    document.body.append(overlay);
  }

  document.addEventListener('click', event => {
    const img = event.target.closest?.(EXPANDABLE);
    if (img) open(img);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay) { event.stopImmediatePropagation(); close(); }
  }, true);
}
