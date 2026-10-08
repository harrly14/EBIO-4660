import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSeenTracker, createStorage } from '../src/engine/storage.js';

const memoryBackend = (initial = {}) => {
  const data = { ...initial };
  return { data, getItem: key => data[key] ?? null, setItem: (key, value) => { data[key] = String(value); }, removeItem: key => { delete data[key]; } };
};

test('migrates legacy keys into the app namespace once', () => {
  const backend = memoryBackend({ ebioOrdersSeen: '["x"]', insectSpeedHighScore: '7', ebioPracticalProgress: '{}' });
  const storage = createStorage('orders', backend);
  storage.migrate('ebioOrdersSeen', 'seen');
  storage.migrate('insectSpeedHighScore', 'speedHighScore', Number);
  storage.migrate('ebioPracticalProgress', null);
  assert.deepEqual(storage.get('seen'), ['x']);
  assert.equal(storage.get('speedHighScore'), 7);
  assert.deepEqual(Object.keys(backend.data).sort(), ['ebio:orders:seen', 'ebio:orders:speedHighScore']);
});

test('keeps working in memory when storage throws', () => {
  const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  const seen = createSeenTracker(createStorage('practical', throwing));
  seen.mark('q1');
  seen.mark('q2');
  assert.equal(seen.count(new Set(['q1', 'q2', 'q3'])), 2);
  seen.reset();
  assert.equal(seen.load().size, 0);
});
