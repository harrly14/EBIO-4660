// Typed-answer grading for multi-blank questions. Pure, so it runs in Node tests too.
// A blank is graded 'correct' (exact after trimming, collapsing whitespace, ignoring case),
// 'almost' (a small typo of an accepted answer) or 'wrong'. Only 'correct' counts toward a question.

export const normalizeAnswer = value => String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

/* Levenshtein distance with adjacent transpositions counted as one edit. */
export function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
    }
  }
  return rows[a.length][b.length];
}

/* Edits tolerated for an answer of this length: none for short words, where one edit is usually a different word. */
const typoAllowance = length => (length < 5 ? 0 : length < 9 ? 1 : 2);

export function gradeBlank(given, accepted) {
  const typed = normalizeAnswer(given);
  const answers = accepted.map(normalizeAnswer);
  if (!typed) return 'wrong';
  if (answers.includes(typed)) return 'correct';
  return answers.some(answer => editDistance(typed, answer) <= typoAllowance(answer.length)) ? 'almost' : 'wrong';
}

/* One grade per blank, in order. `given` is an array of typed strings; missing entries grade as wrong. */
export const gradeBlanks = (question, given) => question.blanks.map((blank, index) => gradeBlank(given?.[index], blank.answers));

/* A question is correct only when every blank is. */
export const blanksCorrect = grades => grades.every(grade => grade === 'correct');
