// Filesystem helpers shared by the build steps.
import fs from 'node:fs';
import path from 'node:path';

/* Relative paths of every file under `dir` with the given extension (all files when omitted). */
export function listFiles(dir, extension = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(extension))
    .map(entry => path.relative(dir, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'))
    .sort();
}

export function writeFile(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

export const withoutExtension = file => file.replace(/\.[^.]+$/, '');
