// Local tool for attaching Wikimedia Commons credits to study photos.
//   npm run credits   →   http://localhost:4174
// Approved credits are written into content/*.json; photos you give up on are deleted.
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { IMAGE_FILES, readJson } from '../../build/content.js';
import { resolveInside, sendFile } from '../../build/serve.js';
import { fetchImage, fileTitleFromUrl, findBySha1, findByTitles, isWikimediaImage, search } from './commons.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const publicDir = path.join(root, 'public');
const imageFile = set => path.join(root, 'content', IMAGE_FILES[set]);
const hints = readJson(path.join(here, 'hints.json'));
const CREDIT_FIELDS = ['sourceUrl', 'title', 'creator', 'license'];

/* Common names to offer as alternative search terms. */
function commonNames() {
  const orders = readJson(path.join(root, 'content/orders/orders.json'));
  const taxa = readJson(path.join(root, 'content/practical/taxa.json'));
  return Object.fromEntries([...orders.map(item => [item.order, item.common]), ...taxa.map(taxon => [taxon.name, taxon.commonName])].filter(([, name]) => name));
}

/* Public URL of the deployed site, for reverse-image-search links (override with PUBLIC_BASE). */
function publicBase() {
  if (process.env.PUBLIC_BASE) return process.env.PUBLIC_BASE.replace(/\/?$/, '/');
  try {
    const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).trim();
    const [, user, repo] = remote.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/) || [];
    return user ? `https://${user}.github.io/${repo}/` : '';
  } catch {
    return '';
  }
}

function loadImages() {
  return Object.keys(IMAGE_FILES).flatMap(set => readJson(imageFile(set)).map(image => ({ ...image, set })));
}

function updateImages(set, change) {
  const file = imageFile(set);
  fs.writeFileSync(file, `${JSON.stringify(change(readJson(file)), null, 2)}\n`);
}

function findImage(src) {
  const image = loadImages().find(item => item.src === src);
  if (!image) throw Object.assign(new Error(`Unknown image ${src}`), { status: 404 });
  return image;
}

const routes = {
  'GET /api/queue': () => {
    const images = loadImages();
    const names = commonNames();
    const remaining = taxon => images.filter(image => image.taxon === taxon).length;
    return {
      publicBase: publicBase(),
      total: images.length,
      queue: images.filter(image => !image.sourceUrl).map(image => ({
        src: image.src, set: image.set, taxon: image.taxon, commonName: names[image.taxon] || '', photosOfTaxon: remaining(image.taxon)
      }))
    };
  },

  /* First page: history hint + exact SHA-1 matches + search; later pages: search only. */
  'GET /api/candidates': async params => {
    const image = findImage(params.get('src'));
    const offset = Number(params.get('offset') || 0);
    const results = await search(params.get('q') || image.taxon, offset);
    if (offset > 0) return results;
    const sha1 = crypto.createHash('sha1').update(fs.readFileSync(path.join(publicDir, image.src))).digest('hex');
    const exact = (await findBySha1(sha1)).map(candidate => ({ ...candidate, exact: true }));
    const hinted = hints[image.src] ? (await findByTitles([fileTitleFromUrl(hints[image.src])])).map(candidate => ({ ...candidate, hint: true })) : [];
    const seen = new Set();
    const candidates = [...exact, ...hinted, ...results.candidates].filter(candidate => !seen.has(candidate.sourceUrl) && seen.add(candidate.sourceUrl));
    return { candidates, nextOffset: results.nextOffset };
  },

  'GET /api/lookup': async params => {
    const title = fileTitleFromUrl(params.get('url') || '');
    const [candidate] = title ? await findByTitles([title]) : [];
    if (!candidate) throw Object.assign(new Error('No Commons file found for that link'), { status: 404 });
    return candidate;
  },

  'POST /api/credit': ({ src, credit }) => {
    const image = findImage(src);
    const missing = CREDIT_FIELDS.filter(field => !String(credit?.[field] || '').trim());
    if (missing.length) throw Object.assign(new Error(`Missing ${missing.join(', ')}`), { status: 400 });
    const fields = Object.fromEntries(CREDIT_FIELDS.map(field => [field, String(credit[field]).trim()]));
    updateImages(image.set, images => images.map(item => (item.src === src ? { ...item, ...fields } : item)));
    return { ok: true };
  },

  'POST /api/remove': ({ src }) => {
    const image = findImage(src);
    updateImages(image.set, images => images.filter(item => item.src !== src));
    fs.rmSync(path.join(publicDir, image.src), { force: true });
    return { ok: true };
  }
};

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
}

async function handleApi(request, response, url) {
  const route = routes[`${request.method} ${url.pathname}`];
  if (!route) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  // Writes must come from this page: a JSON content type forces a CORS preflight for other sites.
  const sameOrigin = !request.headers.origin || request.headers.origin === `http://${request.headers.host}`;
  if (request.method === 'POST' && (!sameOrigin || !String(request.headers['content-type']).startsWith('application/json'))) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }
  try {
    const result = await route(request.method === 'POST' ? await readBody(request) : url.searchParams);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  } catch (error) {
    response.writeHead(error.status || 500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: error.message }));
  }
}

/* Same-origin copy of a Commons thumbnail so the page can compare pixels. */
async function proxyThumbnail(response, target) {
  if (!isWikimediaImage(target)) {
    response.writeHead(400);
    response.end('Only Wikimedia images can be proxied');
    return;
  }
  try {
    const { type, body } = await fetchImage(target);
    response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'max-age=86400' });
    response.end(body);
  } catch (error) {
    response.writeHead(502);
    response.end(error.message);
  }
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) return handleApi(request, response, url);
  if (url.pathname === '/thumb') return proxyThumbnail(response, url.searchParams.get('url') || '');
  if (url.pathname === '/' || url.pathname === '/client.js') return sendFile(response, path.join(here, url.pathname === '/' ? 'index.html' : 'client.js'));
  const file = resolveInside(publicDir, url.pathname);
  if (!file) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }
  return sendFile(response, file);
});

const port = Number(process.env.PORT) || 4174;
// Loopback only: this server can rewrite content and delete photos.
server.listen(port, '127.0.0.1', () => console.log(`Photo credits tool running at http://localhost:${port}`));
