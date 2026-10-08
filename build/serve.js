// Minimal static file server for dist/, with optional rebuild-on-change.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml'
};

export function contentTypeFor(file) {
  return CONTENT_TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

/* Resolves a URL path inside `root`, or null when it would escape it. */
export function resolveInside(root, urlPath) {
  const relative = decodeURIComponent(urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, ''));
  const file = path.resolve(root, relative);
  return file === root || file.startsWith(`${root}${path.sep}`) ? file : null;
}

export function sendFile(response, file) {
  fs.readFile(file, (error, body) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500);
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to read file');
      return;
    }
    response.writeHead(200, { 'Content-Type': contentTypeFor(file) });
    response.end(body);
  });
}

export function serveStatic(root, port) {
  http.createServer((request, response) => {
    const file = resolveInside(root, new URL(request.url, 'http://localhost').pathname);
    if (!file) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    sendFile(response, file);
  }).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
}

/* Calls `rebuild` (debounced) whenever a file under one of `dirs` changes. */
export function watch(dirs, rebuild) {
  let timer = null;
  dirs.forEach(dir => fs.watch(dir, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 100);
  }));
  console.log(`Watching ${dirs.map(dir => path.basename(dir)).join(', ')} for changes`);
}
