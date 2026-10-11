import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blanksCorrect, editDistance, gradeBlank, gradeBlanks } from '../src/engine/grading.js';

test('exact matches ignore case and surrounding or repeated whitespace', () => {
  assert.equal(gradeBlank('  ODONATA ', ['Odonata']), 'correct');
  assert.equal(gradeBlank('peritrophic   membrane', ['peritrophic membrane']), 'correct');
});

test('any accepted answer is correct', () => {
  assert.equal(gradeBlank('taenidia', ['taenidea', 'taenidia']), 'correct');
});

test('small typos are almost, never correct', () => {
  assert.equal(gradeBlank('Odonta', ['Odonata']), 'almost');
  assert.equal(gradeBlank('Anisoptra', ['Anisoptera']), 'almost');
  assert.equal(gradeBlank('Orthopetra', ['Orthoptera']), 'almost', 'a transposition is one edit');
});

test('short answers allow no typos, so different short words stay wrong', () => {
  assert.equal(gradeBlank('aorto', ['aorta']), 'almost');
  assert.equal(gradeBlank('tibia', ['tibia']), 'correct');
  assert.equal(gradeBlank('coxo', ['coxa']), 'wrong');
});

test('unrelated and empty answers are wrong', () => {
  assert.equal(gradeBlank('Hemiptera', ['Odonata']), 'wrong');
  assert.equal(gradeBlank('', ['Odonata']), 'wrong');
  assert.equal(gradeBlank(undefined, ['Odonata']), 'wrong');
});

test('each blank is graded separately and all must be correct', () => {
  const question = { blanks: [{ answers: ['Odonata'] }, { answers: ['Anisoptera'] }] };
  assert.deepEqual(gradeBlanks(question, ['odonata', 'Zygoptera']), ['correct', 'wrong']);
  assert.deepEqual(gradeBlanks(question, ['odonata', 'Anisoptra']), ['correct', 'almost']);
  assert.ok(blanksCorrect(gradeBlanks(question, ['Odonata', 'Anisoptera'])));
  assert.ok(!blanksCorrect(gradeBlanks(question, ['Odonata'])));
});

test('edit distance counts a transposition as one edit', () => {
  assert.equal(editDistance('ab', 'ba'), 1);
  assert.equal(editDistance('kitten', 'sitting'), 3);
});
