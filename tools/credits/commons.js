// Wikimedia Commons API helpers for the credits tool.
const API = 'https://commons.wikimedia.org/w/api.php';
const USER_AGENT = 'EBIO-4660-study-site credits tool (https://github.com/harrly14/EBIO-4660)';
const THUMB_WIDTH = 240;
export const PAGE_SIZE = 20;

async function query(params) {
  const url = new URL(API);
  Object.entries({ action: 'query', format: 'json', formatversion: '2', ...params }).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Commons API returned ${response.status}`);
  return response.json();
}

const imageInfo = (width = THUMB_WIDTH) => ({
  prop: 'imageinfo',
  iiprop: 'url|size|extmetadata',
  iiurlwidth: String(width),
  iiextmetadatafilter: 'Artist|LicenseShortName'
});

export function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

/* One Commons file page → the credit fields stored in content/ plus preview data. */
export function toCandidate(page) {
  const info = page.imageinfo?.[0];
  if (!info) return null;
  const meta = info.extmetadata || {};
  return {
    sourceUrl: info.descriptionurl,
    title: page.title,
    creator: stripHtml(meta.Artist?.value) || 'Unknown',
    license: stripHtml(meta.LicenseShortName?.value) || 'See source page',
    thumbUrl: info.thumburl,
    fullUrl: info.url,
    width: info.width,
    height: info.height
  };
}

const pagesToCandidates = data => (data.query?.pages || [])
  .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
  .map(toCandidate)
  .filter(Boolean);

/* Files whose stored SHA-1 equals the local file's (byte-identical copies). */
export async function findBySha1(sha1) {
  const found = await query({ list: 'allimages', aisha1: sha1, ailimit: '5' });
  const titles = (found.query?.allimages || []).map(image => `File:${image.name}`);
  return titles.length ? findByTitles(titles) : [];
}

export async function findByTitles(titles, thumbWidth) {
  return pagesToCandidates(await query({ titles: titles.join('|'), ...imageInfo(thumbWidth) }));
}

export async function search(text, offset = 0, thumbWidth) {
  const data = await query({
    generator: 'search', gsrnamespace: '6', gsrsearch: `${text} filetype:bitmap`,
    gsrlimit: String(PAGE_SIZE), gsroffset: String(offset), ...imageInfo(thumbWidth)
  });
  return { candidates: pagesToCandidates(data), nextOffset: data.continue?.gsroffset ?? null };
}

/* "File:Name.jpg" from a Commons page URL, an upload URL (original or thumbnail), or a bare file name. */
export function fileTitleFromUrl(input) {
  const text = input.trim();
  let name = text;
  try {
    const url = new URL(text);
    const path = decodeURIComponent(url.pathname);
    if (url.hostname.startsWith('upload.') || url.hostname.startsWith('thumb.')) {
      const parts = path.split('/');
      const thumbIndex = parts.indexOf('thumb');
      name = thumbIndex >= 0 ? parts[thumbIndex + 3] : parts.pop();
    } else {
      name = path.split('/').pop();
    }
  } catch { /* not a URL: treat as a file name */ }
  name = name.replace(/^File:/i, '').replace(/_/g, ' ');
  return name ? `File:${name}` : null;
}

/* Only Wikimedia image hosts may be proxied. */
export const isWikimediaImage = url => /^https:\/\/(upload|thumb)\.wikimedia\.org\//.test(url);

export async function fetchImage(url) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Image request returned ${response.status}`);
  return { type: response.headers.get('content-type') || 'image/jpeg', body: Buffer.from(await response.arrayBuffer()) };
}
