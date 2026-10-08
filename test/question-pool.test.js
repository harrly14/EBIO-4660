import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawQuestions, drawStrata, isCorrect, poolSize } from '../src/engine/question-pool.js';
import { seededRandom } from './helpers.js';

const pool = (prefix, size) => Array.from({ length: size }, (_, i) => ({ id: `${prefix}${i}`, build: () => ({ prompt: `${prefix}${i}` }) }));
const pools = { a: pool('a', 4), b: pool('b', 2) };

test('serves unseen questions first and never repeats within a set', () => {
  const seen = new Set(['a0', 'a1']);
  const questions = drawQuestions({ pools, types: ['a'], count: 2, seen, random: seededRandom() });
  assert.deepEqual(questions.map(q => q.id).sort(), ['a2', 'a3']);
});

test('starts a new round only once every candidate in scope has been seen', () => {
  const seen = new Set(['a0', 'a1', 'a2', 'a3', 'b0']);
  const questions = drawQuestions({ pools, types: ['a'], count: 3, seen, random: seededRandom() });
  assert.equal(questions.length, 3);
  assert.ok(seen.has('b0'), 'other pools keep their seen history');
  assert.ok(!seen.has('a0'));
});

test('never draws more questions than the pool holds', () => {
  const questions = drawQuestions({ pools, types: ['a', 'b'], count: 50, seen: new Set(), random: seededRandom() });
  assert.equal(questions.length, poolSize(pools, ['a', 'b']));
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
});

test('strata draw a fixed mix without repeats', () => {
  const questions = drawStrata({ pools, strata: [{ types: ['a'], count: 3 }, { types: ['a', 'b'], count: 3 }], seen: new Set(), random: seededRandom() });
  assert.equal(questions.length, 6);
  assert.equal(new Set(questions.map(q => q.id)).size, 6);
});

test('answer checking handles accepted aliases, typed answers, and select-all', () => {
  assert.ok(isCorrect({ input: 'choice', answer: 'Coccoidae', accepted: ['Coccoidae', 'Coccoidea'] }, 'Coccoidea'));
  assert.ok(isCorrect({ input: 'fill', answer: 'Odonata' }, '  odonata '));
  assert.ok(!isCorrect({ input: 'fill', answer: 'Odonata' }, 'Odonat'));
  assert.ok(isCorrect({ input: 'select-all', answer: ['x', 'y'] }, ['y', 'x']));
  assert.ok(!isCorrect({ input: 'select-all', answer: ['x', 'y'] }, ['x']));
});
