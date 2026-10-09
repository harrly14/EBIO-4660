// Practice tab: setup → question loop (skip reveals the answer) → stats + review.
// Question shape: { id, type, label, prompt (HTML), input: 'choice'|'fill'|'select-all'|'narrowing',
//                   answer (string or string[] for select-all), accepted?, choices?, explanation, image? }
// A 'narrowing' question also has steps: [{ level, prompt, answer, choices }], broadest first; answer/choices are the final step.
import { delegate, digitIndex, isTyping, render, revealOptions, role, roles } from './dom.js';
import { allIds, answerText, drawBalanced, drawQuestions, drawStrata, isCorrect, poolSize } from './question-pool.js';
import { escapeHtml, numbered } from './util.js';

const MIN_COUNT = 5;
const MAX_COUNT = 100;
const DEFAULT_COUNT = 20;
const LESSON_COUNT = 10;

/* The typed answer with every character that differs from the correct spelling struck through. */
function misspellingMarkup(given, correct) {
  const expected = [...correct.toLowerCase()];
  return [...given].map((char, index) => (char.toLowerCase() === expected[index] ? escapeHtml(char) : `<span class="fill-issue"><s>${escapeHtml(char)}</s></span>`)).join('');
}

export function createPracticeTab(pane, app) {
  const { pools, modes } = app.config.practice;
  const ids = allIds(pools);
  const modeFor = value => modes.find(mode => mode.value === value) || modes[0];
  const typesOf = mode => mode.types || mode.buckets?.flat() || Object.keys(pools);
  const sizeOf = mode => (mode.strata ? mode.strata.reduce((total, stratum) => total + stratum.count, 0) : Math.min(MAX_COUNT, poolSize(pools, typesOf(mode))));

  const state = { view: 'setup', mode: modes[0].value, count: DEFAULT_COUNT, questions: [], index: 0, answered: false, results: [], stepAnswers: [] };
  const current = () => state.questions[state.index];

  /* ---------- setup ---------- */
  function countLimits(mode) {
    const max = sizeOf(mode);
    return { max, min: mode.strata ? max : Math.min(MIN_COUNT, max) };
  }

  function showSetup() {
    state.view = 'setup';
    const mode = modeFor(state.mode);
    const { min, max } = countLimits(mode);
    state.count = Math.min(Math.max(state.count, min), max);
    pane.innerHTML = render('practice-setup', {
      modes: modes.map(option => ({ value: option.value, label: option.label, selected: option.value === mode.value })),
      min, max, count: state.count, fixedCount: Boolean(mode.strata),
      seenCount: app.seen.count(ids), total: ids.size
    });
  }

  function start(modeValue = state.mode, count = state.count) {
    const mode = modeFor(modeValue);
    const seen = app.seen.load();
    state.mode = mode.value;
    state.count = count;
    const size = Math.min(count, sizeOf(mode));
    state.questions = mode.strata ? drawStrata({ pools, strata: mode.strata, seen })
      : mode.buckets ? drawBalanced({ pools, buckets: mode.buckets, count: size, seen })
        : drawQuestions({ pools, types: typesOf(mode), count: size, seen });
    app.seen.save(seen);
    Object.assign(state, { view: 'quiz', index: 0, results: [] });
    showQuestion();
  }

  /* ---------- question loop ---------- */
  function showQuestion() {
    const question = current();
    if (!question) {
      showEnd();
      return;
    }
    state.answered = false;
    state.stepAnswers = [];
    app.seen.mark(question.id);
    pane.innerHTML = render('question', {
      ...question,
      position: state.index + 1,
      total: state.questions.length,
      choices: numbered(question.choices || []),
      isNarrowing: question.input === 'narrowing',
      steps: (question.steps || []).map((step, index) => ({ label: `${index + 1}. ${step.prompt}`, choices: numbered(step.choices), hidden: index > 0 })),
      finalLabel: `${(question.steps || []).length + 1}. Which family or superfamily?`,
      isFill: question.input === 'fill',
      isSelectAll: question.input === 'select-all',
      placeholder: question.placeholder || 'Type your answer'
    });
    const upcoming = state.questions[state.index + 1];
    if (upcoming?.image) new Image().src = upcoming.image.src;
    role(pane, 'fill')?.focus();
  }

  /* Records the outcome, marks the options, and shows the explanation. `given` is null for a skip. */
  function reveal(given) {
    if (state.answered) return;
    state.answered = true;
    const question = current();
    const skipped = given === null;
    const steps = question.steps || [];
    const stepsOk = steps.every((step, index) => state.stepAnswers[index] === step.answer);
    const ok = !skipped && stepsOk && isCorrect(question, given);
    const chosen = [].concat(given ?? []);
    const correct = question.input === 'select-all' ? question.answer : (question.accepted || [question.answer]);
    const blocks = roles(pane, 'step');
    if (blocks.length) {
      /* A skip shows every level that has not been answered yet. */
      blocks.slice(state.stepAnswers.length, steps.length).forEach((block, offset) => revealOptions(block, { correct: [steps[state.stepAnswers.length + offset].answer], markOthersWrong: true }));
      blocks.forEach(block => block.classList.remove('hidden'));
    }
    revealOptions(blocks.length ? blocks[steps.length] : pane, { correct, chosen, markOthersWrong: skipped });
    pane.querySelectorAll('[data-role="fill"], [data-action="submit-fill"], [data-action="submit-select"], [data-action="skip"]').forEach(control => { control.disabled = true; });

    const path = steps.length ? answerText(question) : '';
    const missed = steps.findIndex((step, index) => state.stepAnswers[index] !== step.answer);
    const message = skipped ? 'Skipped.' : ok ? 'Correct.' : missed !== -1 ? `Not quite: the ${steps[missed].level} was wrong.` : 'Not quite.';
    state.results.push({ question, given: skipped ? 'Skipped' : [...state.stepAnswers, ...chosen].join(steps.length ? ' > ' : '; '), ok, skipped });
    const explain = role(pane, 'explain');
    explain.classList.add('show');
    explain.innerHTML = render('feedback', {
      ok,
      message,
      path,
      explanation: question.explanation,
      image: question.image,
      answer: answerText(question),
      correction: question.input === 'fill' && !skipped && !ok ? misspellingMarkup(given, question.answer) : ''
    });
    const next = pane.querySelector('[data-action="next"]');
    next.disabled = false;
    next.focus();
  }

  /* Answers one broader level, then reveals the next (finer) level below it. */
  function chooseStep(button) {
    const blocks = roles(pane, 'step');
    const index = blocks.indexOf(button.closest('[data-role="step"]'));
    if (state.answered || index !== state.stepAnswers.length) return;
    state.stepAnswers.push(button.dataset.value);
    revealOptions(blocks[index], { correct: [current().steps[index].answer], chosen: [button.dataset.value] });
    blocks[index + 1].classList.remove('hidden');
    blocks[index + 1].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  /* Option buttons that the number keys should currently pick from. */
  function activeOptions() {
    const blocks = roles(pane, 'step');
    return (blocks.length ? blocks[state.stepAnswers.length] : pane).querySelectorAll('.option');
  }

  const submitFill = () => {
    const typed = role(pane, 'fill').value.trim().replace(/\s+/g, ' ');
    if (typed) reveal(typed);
  };
  const submitSelection = () => reveal(roles(pane, 'select').filter(input => input.checked).map(input => input.value));
  const next = () => {
    state.index += 1;
    showQuestion();
  };

  /* ---------- end of set ---------- */
  function showEnd() {
    state.view = 'complete';
    const answered = state.results.filter(result => !result.skipped).length;
    const correct = state.results.filter(result => result.ok).length;
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
    pane.innerHTML = render('quiz-end', {
      heading: answered === 0 ? 'Set ended' : accuracy >= 80 ? 'Set complete' : accuracy >= 50 ? 'Good effort' : 'Keep practicing',
      correct, answered, accuracy,
      skipped: state.questions.length - answered,
      review: reviewItems(state.results)
    });
  }

  delegate(pane, 'click', {
    start: () => start(role(pane, 'mode').value, Number(role(pane, 'count').value)),
    'reset-seen': () => {
      app.seen.reset();
      showSetup();
    },
    choose: button => reveal(button.dataset.value),
    'choose-step': chooseStep,
    'submit-fill': submitFill,
    'submit-select': submitSelection,
    skip: () => reveal(null),
    finish: showEnd,
    next,
    continue: showSetup
  });
  delegate(pane, 'change', {
    mode: select => {
      state.mode = select.value;
      showSetup();
    }
  }, 'role');
  delegate(pane, 'input', {
    count: range => {
      state.count = Number(range.value);
      role(pane, 'count-value').textContent = range.value;
    }
  }, 'role');
  pane.addEventListener('error', event => {
    if (event.target.tagName === 'IMG') event.target.closest('.visual-box').innerHTML = '<p class="subtle image-error">Photo could not load. Try another question.</p>';
  }, true);

  function onKey(event) {
    if (state.view !== 'quiz') return;
    const inFill = event.target.matches?.('[data-role="fill"]');
    if (isTyping(event) && !inFill) return;
    const digit = digitIndex(event);
    if (digit !== null && !inFill && !state.answered) {
      activeOptions()[digit]?.click();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (state.answered) next();
      else if (current().input === 'fill') submitFill();
      else if (current().input === 'select-all') submitSelection();
    }
  }

  return {
    show: () => { if (state.view === 'setup') showSetup(); },
    onKey,
    startFromLesson(modeValue) {
      app.setTab('practice');
      start(modeValue, LESSON_COUNT);
    }
  };
}

/* Review rows for the practice end screen. */
export function reviewItems(results) {
  return results.map((result, index) => ({
    number: index + 1,
    prompt: result.question.prompt,
    given: result.given,
    correct: answerText(result.question),
    reviewClass: result.skipped ? '' : `review-${result.ok ? 'correct' : 'incorrect'}`
  }));
}
