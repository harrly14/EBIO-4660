// Speed Round tab: 60 seconds of multiple-choice questions from the app's speed pools.
import { delegate, digitIndex, isTyping, render, role } from './dom.js';
import { drawQuestions, isCorrect } from './question-pool.js';
import { numbered } from './util.js';
import { reviewItems } from './practice.js';

const ROUND_SECONDS = 60;

export function createSpeedTab(pane, app) {
  const { types, intro } = app.config.speed;
  const pools = app.config.practice.pools;
  const round = { timer: null, secondsLeft: 0, score: 0, results: [], used: new Set(), question: null };
  const highScore = () => app.storage.get('speedHighScore', 0);

  function show() {
    if (!round.timer) pane.innerHTML = render('speed', { highScore: highScore(), intro });
  }

  function start() {
    Object.assign(round, { secondsLeft: ROUND_SECONDS, score: 0, results: [], used: new Set() });
    pane.querySelector('[data-action="speed-start"]').disabled = true;
    role(pane, 'score').textContent = 'Score: 0';
    tick();
    round.timer = setInterval(() => {
      round.secondsLeft -= 1;
      tick();
      if (round.secondsLeft <= 0) end();
    }, 1000);
    ask();
  }

  function tick() {
    role(pane, 'timer').textContent = `${Math.floor(round.secondsLeft / 60)}:${String(round.secondsLeft % 60).padStart(2, '0')}`;
  }

  function ask() {
    const seen = app.seen.load();
    [round.question] = drawQuestions({ pools, types, count: 1, seen, used: round.used });
    app.seen.save(seen);
    if (!round.question) {
      end();
      return;
    }
    app.seen.mark(round.question.id);
    role(pane, 'speed-area').innerHTML = render('speed-question', { ...round.question, choices: numbered(round.question.choices) });
  }

  function answer(choice) {
    const ok = isCorrect(round.question, choice);
    round.results.push({ question: round.question, given: choice, ok, skipped: false });
    if (ok) round.score += 1;
    role(pane, 'score').textContent = `Score: ${round.score}`;
    ask();
  }

  function end() {
    clearInterval(round.timer);
    round.timer = null;
    const newHighScore = round.score > highScore();
    if (newHighScore) app.storage.set('speedHighScore', round.score);
    pane.querySelector('[data-action="speed-start"]').disabled = false;
    role(pane, 'high-score').textContent = `High score: ${highScore()}`;
    role(pane, 'speed-area').innerHTML = render('speed-end', { score: round.score, newHighScore, review: reviewItems(round.results) });
  }

  delegate(pane, 'click', {
    'speed-start': start,
    'speed-choose': button => answer(button.dataset.value)
  });

  function onKey(event) {
    const digit = digitIndex(event);
    if (!round.timer || isTyping(event) || digit === null) return;
    pane.querySelectorAll('[data-action="speed-choose"]')[digit]?.click();
  }

  return { show, onKey };
}
