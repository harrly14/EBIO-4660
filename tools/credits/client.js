// Browser side of the credits tool: shows each uncredited photo next to Commons results
// ranked by visual similarity, and saves or removes it.
const $ = name => document.querySelector(`[data-role="${name}"]`);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

const state = { queue: [], total: 0, publicBase: '', current: null, candidates: [], nextOffset: null, query: '', localHash: null, selected: null };

async function api(path, body) {
  const response = await fetch(path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : undefined);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || response.statusText);
  return data;
}

/* 64-bit difference hash: robust to resizing and recompression, so thumbnails match their originals. */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });
}
async function differenceHash(src) {
  const image = await loadImage(src);
  const canvas = Object.assign(document.createElement('canvas'), { width: 9, height: 8 });
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0, 9, 8);
  const pixels = context.getImageData(0, 0, 9, 8).data;
  const gray = index => pixels[index * 4] * 0.299 + pixels[index * 4 + 1] * 0.587 + pixels[index * 4 + 2] * 0.114;
  const bits = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits.push(gray(y * 9 + x) > gray(y * 9 + x + 1));
  return bits;
}
const similarity = (a, b) => (a && b ? a.filter((bit, index) => bit === b[index]).length / a.length : null);
const proxied = url => `/thumb?url=${encodeURIComponent(url)}`;

async function rank(candidates) {
  await Promise.all(candidates.map(async candidate => {
    if (candidate.similarity !== undefined) return;
    try { candidate.similarity = similarity(state.localHash, await differenceHash(proxied(candidate.thumbUrl))); } catch { candidate.similarity = null; }
  }));
  const score = candidate => (candidate.exact ? 3 : candidate.hint ? 2 : 0) + (candidate.similarity ?? 0);
  return [...candidates].sort((a, b) => score(b) - score(a));
}

function renderCandidates() {
  $('candidates').innerHTML = state.candidates.map((candidate, index) => `
    <div class="candidate${state.selected === candidate ? ' selected' : ''}">
      <img src="${esc(proxied(candidate.thumbUrl))}" alt="" loading="lazy">
      <div>${candidate.exact ? '<span class="badge">Exact file match</span> ' : ''}${candidate.hint ? '<span class="badge hint">Original link from git history</span> ' : ''}${candidate.similarity != null ? `<span class="similarity">${Math.round(candidate.similarity * 100)}% similar</span>` : ''}</div>
      <a href="${esc(candidate.sourceUrl)}" target="_blank" rel="noopener">${esc(candidate.title)}</a>
      <span class="muted">${esc(candidate.creator)} · ${esc(candidate.license)} · ${candidate.width}×${candidate.height}</span>
      <button type="button" class="primary" data-pick="${index}">This is it</button>
    </div>`).join('') || '<p class="muted">No results. Try another search term or paste a link.</p>';
}

async function loadCandidates({ more = false } = {}) {
  const { current } = state;
  $('search-status').textContent = 'Searching Commons…';
  try {
    const params = new URLSearchParams({ src: current.src, q: state.query, offset: more ? state.nextOffset : 0 });
    const result = await api(`/api/candidates?${params}`);
    if (state.current !== current) return;
    state.nextOffset = result.nextOffset;
    $('search-status').textContent = 'Comparing images…';
    state.candidates = await rank(more ? [...state.candidates, ...result.candidates] : result.candidates);
    if (state.current !== current) return;
    $('search-status').textContent = `${state.candidates.length} results for "${state.query}", most similar first.`;
    document.querySelector('[data-action="more"]').disabled = state.nextOffset === null;
    renderCandidates();
  } catch (error) {
    $('search-status').innerHTML = `<span class="error">${esc(error.message)}</span>`;
  }
}

function fillForm(candidate) {
  state.selected = candidate;
  const form = $('credit-form');
  ['sourceUrl', 'title', 'creator', 'license'].forEach(field => { form.elements[field].value = candidate?.[field] || ''; });
  $('form-status').textContent = '';
  renderCandidates();
}

function reverseSearchLinks(src) {
  if (!state.publicBase) return '';
  const url = encodeURIComponent(state.publicBase + src);
  return `Reverse search (needs the deployed site): <a href="https://lens.google.com/uploadbyurl?url=${url}" target="_blank" rel="noopener">Google Lens</a> <a href="https://tineye.com/search?url=${url}" target="_blank" rel="noopener">TinEye</a> <a href="https://www.bing.com/images/search?view=detailv2&iss=sbi&q=imgurl:${url}" target="_blank" rel="noopener">Bing</a>`;
}

async function showCurrent() {
  const current = state.queue[0];
  state.current = current;
  $('progress').textContent = `${state.queue.length} of ${state.total} photos still need a credit`;
  if (!current) {
    document.querySelector('main').innerHTML = '<div class="card">Every photo has a credit. Run <code>npm run build</code> to see them on the site.</div>';
    return;
  }
  $('local-image').src = `/${current.src}`;
  $('taxon').textContent = current.taxon;
  $('common-name').textContent = current.commonName;
  $('src').textContent = `${current.src}${current.photosOfTaxon === 1 ? ' (the only photo of this taxon)' : ''}`;
  $('reverse-links').innerHTML = reverseSearchLinks(current.src);
  $('query-chips').innerHTML = [current.taxon, current.commonName].filter(Boolean).map(text => `<button type="button" data-query="${esc(text)}">${esc(text)}</button>`).join('');
  $('search-form').elements.query.value = state.query = current.taxon;
  Object.assign(state, { candidates: [], nextOffset: null, localHash: null });
  fillForm(null);
  state.localHash = await differenceHash(`/${current.src}`).catch(() => null);
  loadCandidates();
}

async function advance(action) {
  try {
    await action();
    state.queue.shift();
    showCurrent();
  } catch (error) {
    $('form-status').innerHTML = `<span class="error">${esc(error.message)}</span>`;
  }
}

$('credit-form').addEventListener('submit', event => {
  event.preventDefault();
  const credit = Object.fromEntries(new FormData(event.target));
  advance(() => api('/api/credit', { src: state.current.src, credit }));
});
document.querySelector('[data-action="remove"]').addEventListener('click', () => {
  if (confirm(`Delete ${state.current.src} and remove it from the site?`)) advance(() => api('/api/remove', { src: state.current.src }));
});
document.querySelector('[data-action="more"]').addEventListener('click', () => loadCandidates({ more: true }));
$('search-form').addEventListener('submit', event => {
  event.preventDefault();
  state.query = event.target.elements.query.value.trim() || state.current.taxon;
  loadCandidates();
});
$('query-chips').addEventListener('click', event => {
  const chip = event.target.closest('[data-query]');
  if (!chip) return;
  $('search-form').elements.query.value = state.query = chip.dataset.query;
  loadCandidates();
});
$('lookup-form').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const [candidate] = await rank([await api(`/api/lookup?url=${encodeURIComponent(event.target.elements.url.value)}`)]);
    state.candidates = [candidate, ...state.candidates.filter(item => item.sourceUrl !== candidate.sourceUrl)];
    fillForm(candidate);
  } catch (error) {
    $('search-status').innerHTML = `<span class="error">${esc(error.message)}</span>`;
  }
});
$('candidates').addEventListener('click', event => {
  const pick = event.target.closest('[data-pick]');
  if (pick) fillForm(state.candidates[Number(pick.dataset.pick)]);
});

const { queue, total, publicBase } = await api('/api/queue');
Object.assign(state, { queue, total, publicBase });
showCurrent();
