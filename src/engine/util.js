// Small pure helpers shared by both study apps (no DOM access, so they run in Node tests too).

export function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sample(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export const unique = items => [...new Set(items)];

/* Template-friendly list of answer options: [{ value, number }]. */
export const numbered = values => values.map((value, index) => ({ value, number: index + 1 }));

/* Up to `count` items, preferred ones (in random order) first, then the rest. */
export function pickDistractors(candidates, isPreferred = () => false, count = 3) {
  return [...shuffle(candidates.filter(isPreferred)), ...shuffle(candidates.filter(item => !isPreferred(item)))].slice(0, count);
}

/* Shuffled answer options: the answer plus `count` distinct wrong answers drawn from `pool`. */
export function makeChoices(answer, pool, isPreferred = () => false, count = 3) {
  const wrong = unique(pool).filter(item => item !== answer);
  return shuffle([answer, ...pickDistractors(wrong, isPreferred, count)]);
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

export const strong = text => `<strong>${escapeHtml(text)}</strong>`;

export function groupBy(items, keyOf) {
  return items.reduce((groups, item) => {
    (groups[keyOf(item)] = groups[keyOf(item)] || []).push(item);
    return groups;
  }, {});
}
