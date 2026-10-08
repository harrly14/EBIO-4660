import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent } from '../build/content.js';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const content = loadContent(root);

/* Deterministic Math.random replacement for repeatable draws. */
export function seededRandom(seed = 1) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}
