// Seen-aware question drawing for the Practice tab in both apps.
// A pool is { [type]: [{ id, build() }] }. Unseen candidates are served first; a type's
// seen history is only cleared once every candidate in scope has been seen.
import { sample, shuffle, unique } from './util.js';

export function poolSize(pools, types) {
  return unique(types).reduce((total, type) => total + (pools[type] || []).length, 0);
}

export function allIds(pools) {
  return new Set(Object.values(pools).flat().map(candidate => candidate.id));
}

/**
 * Draws up to `count` questions from `types` (repeat a type to weight it).
 * With `uniform`, every open candidate is equally likely instead of every open type.
 * Mutates `seen` when a round resets and `used` with every drawn id.
 */
export function drawQuestions({ pools, types, count, seen, used = new Set(), uniform = false, random = Math.random }) {
  const fresh = type => (pools[type] || []).filter(candidate => !seen.has(candidate.id) && !used.has(candidate.id));
  const openTypes = () => types.filter(type => fresh(type).length);
  const questions = [];
  while (questions.length < count) {
    let open = openTypes();
    if (!open.length) {
      unique(types).forEach(type => (pools[type] || []).forEach(candidate => seen.delete(candidate.id)));
      open = openTypes();
      if (!open.length) break;
    }
    const candidate = uniform ? sample(unique(open).flatMap(fresh), random) : sample(fresh(sample(open, random)), random);
    used.add(candidate.id);
    questions.push({ ...candidate.build(), id: candidate.id });
  }
  return questions;
}

/**
 * Draws `count` questions spread evenly over `buckets` (each a list of types), however large each
 * bucket's pool is: buckets take turns in a shuffled order, so their counts differ by at most one.
 * A bucket whose questions have all been seen starts its own new round instead of dropping out.
 */
export function drawBalanced({ pools, buckets, count, seen, random = Math.random }) {
  const used = new Set();
  const questions = [];
  let open = buckets.filter(types => poolSize(pools, types));
  while (questions.length < count && open.length) {
    for (const types of shuffle(open, random)) {
      if (questions.length >= count) break;
      const [question] = drawQuestions({ pools, types, count: 1, seen, used, uniform: true, random });
      if (question) questions.push(question);
      else open = open.filter(bucket => bucket !== types);
    }
  }
  return shuffle(questions, random);
}

/* Draws a fixed mix: [{ types, count }, ...], never repeating a question across strata. */
export function drawStrata({ pools, strata, seen, random = Math.random }) {
  const used = new Set();
  return strata.flatMap(({ types, count }) => drawQuestions({ pools, types, count, seen, used, uniform: true, random }));
}

export function isCorrect(question, response) {
  if (question.input === 'select-all') {
    const expected = [...question.answer].sort();
    const given = [...response].sort();
    return expected.length === given.length && expected.every((value, index) => value === given[index]);
  }
  const normalize = value => String(value).trim().replace(/\s+/g, ' ').toLowerCase();
  return (question.accepted || [question.answer]).some(answer => normalize(answer) === normalize(response));
}

export const answerText = question => [].concat(question.answer).join('; ');
