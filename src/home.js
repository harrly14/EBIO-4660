// Home page: a guess-the-order mystery specimen, a narrow-it-down-to-family specimen, plus each app's saved progress on its card.
import orders from './generated/orders-content.js';
import practical from './generated/practical-content.js';
import { isFamilyRank, narrowingSteps, taxonChoices } from './apps/practical/narrowing.js';
import { createStorage } from './engine/storage.js';
import { escapeHtml, makeChoices, shuffle } from './engine/util.js';

const storage = createStorage('home');
const byOrder = Object.fromEntries(orders.orders.map(item => [item.order, item]));
const confusableWith = name => orders.confusionGroups.filter(group => group.includes(name)).flat();

/* Number keys answer the widget the visitor last touched (the first one until then). */
let activeBox = null;
const claimKeys = box => {
  activeBox ||= box;
  box.addEventListener('pointerdown', () => { activeBox = box; });
  box.addEventListener('focusin', () => { activeBox = box; });
};

const photoCredit = item => (item.sourceUrl
  ? `<div class="photo-source">Photo: <a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(item.creator || 'source')}</a>${item.license ? ` · ${escapeHtml(item.license)}` : ''}</div>`
  : '');

/* ---------- mystery specimen ---------- */
function mountMystery(box) {
  const photo = box.querySelector('[data-role="mystery-photo"]');
  const options = box.querySelector('[data-role="mystery-options"]');
  const feedback = box.querySelector('[data-role="mystery-feedback"]');
  const streakText = box.querySelector('[data-role="streak"]');
  const nextButton = box.querySelector('[data-action="mystery-next"]');
  let deck = [];
  let current = null;
  let streak = 0;
  let failedPhotos = 0;

  const showStreak = () => {
    const best = storage.get('bestStreak', 0);
    streakText.textContent = streak || best ? `Streak ${streak} · Best ${best}` : '';
  };

  function next() {
    if (!deck.length) deck = shuffle(orders.photos);
    current = deck.pop();
    photo.src = current.src;
    photo.parentElement.style.setProperty('--photo', `url("${current.src}")`);
    const choices = makeChoices(current.taxon, orders.orders.map(item => item.order), name => confusableWith(current.taxon).includes(name));
    options.innerHTML = choices.map((choice, index) => `<button class="option" type="button" data-value="${escapeHtml(choice)}"><span class="num">${index + 1}</span>${escapeHtml(choice)}</button>`).join('');
    feedback.innerHTML = '';
    nextButton.classList.add('hidden');
    if (deck.length) new Image().src = deck[deck.length - 1].src;
  }

  function answer(button) {
    if (!current || options.querySelector('.option:disabled')) return;
    const ok = button.dataset.value === current.taxon;
    options.querySelectorAll('.option').forEach(option => {
      if (option.dataset.value === current.taxon) option.classList.add('correct');
      else if (option === button) option.classList.add('wrong');
      option.disabled = true;
    });
    streak = ok ? streak + 1 : 0;
    if (streak > storage.get('bestStreak', 0)) storage.set('bestStreak', streak);
    showStreak();
    const item = byOrder[current.taxon];
    feedback.innerHTML = `<strong class="${ok ? 'feedback-correct' : 'feedback-incorrect'}">${ok ? 'Correct!' : 'Not quite.'}</strong> `
      + `${escapeHtml(item.order)} (${escapeHtml(item.common.toLowerCase())}). Giveaway: ${escapeHtml(item.key)}.${photoCredit(current)}`;
    nextButton.classList.remove('hidden');
    nextButton.focus();
  }

  options.addEventListener('click', event => {
    const button = event.target.closest('.option');
    if (button) answer(button);
  });
  nextButton.addEventListener('click', next);
  photo.addEventListener('load', () => { failedPhotos = 0; });
  photo.addEventListener('error', () => {
    failedPhotos += 1;
    if (failedPhotos < 5) next();
    else box.classList.add('hidden');
  });
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (activeBox === box && /^[1-4]$/.test(event.key)) options.querySelectorAll('.option')[Number(event.key) - 1]?.click();
  });

  claimKeys(box);
  showStreak();
  next();
  box.classList.remove('hidden');
}

/* ---------- narrow-it-down specimen: broad group → … → order → suborder → family ---------- */
function mountFamilyMystery(box, deckSource) {
  const photo = box.querySelector('[data-role="family-photo"]');
  const stepsBox = box.querySelector('[data-role="family-steps"]');
  const feedback = box.querySelector('[data-role="family-feedback"]');
  const streakText = box.querySelector('[data-role="streak"]');
  const nextButton = box.querySelector('[data-action="family-next"]');
  const byName = new Map(practical.taxa.map(taxon => [taxon.name, taxon]));
  let deck = [];
  let current = null;
  let levels = [];
  let given = [];
  let streak = 0;
  let failedPhotos = 0;

  const showStreak = () => {
    const best = storage.get('familyBestStreak', 0);
    streakText.textContent = streak || best ? `Streak ${streak} · Best ${best}` : '';
  };

  const blocks = () => [...stepsBox.querySelectorAll('.step')];
  const stepHtml = (level, index, hidden) => `<div class="step${hidden ? ' hidden' : ''}"><div class="step-heading">${index + 1}. ${escapeHtml(level.prompt)}</div>`
    + `<div class="options">${level.choices.map((choice, number) => `<button class="option" type="button" data-value="${escapeHtml(choice)}"><span class="num">${number + 1}</span>${escapeHtml(choice)}</button>`).join('')}</div></div>`;

  function next() {
    if (!deck.length) deck = shuffle(deckSource);
    current = deck.pop();
    const taxon = byName.get(current.taxon);
    levels = [...narrowingSteps(taxon, practical.taxa), { prompt: 'Which family or superfamily?', answer: taxon.name, choices: taxonChoices(practical.taxa, taxon) }];
    given = [];
    photo.src = current.src;
    photo.parentElement.style.setProperty('--photo', `url("${current.src}")`);
    stepsBox.innerHTML = levels.map((level, index) => stepHtml(level, index, index > 0)).join('');
    feedback.innerHTML = '';
    nextButton.classList.add('hidden');
    if (deck.length) new Image().src = deck[deck.length - 1].src;
  }

  function finish() {
    const taxon = byName.get(current.taxon);
    const ok = levels.every((level, index) => given[index] === level.answer);
    streak = ok ? streak + 1 : 0;
    if (streak > storage.get('familyBestStreak', 0)) storage.set('familyBestStreak', streak);
    showStreak();
    const missed = levels.findIndex((level, index) => given[index] !== level.answer);
    feedback.innerHTML = `<strong class="${ok ? 'feedback-correct' : 'feedback-incorrect'}">${ok ? 'Correct!' : `Not quite: the ${escapeHtml(levels[missed].level || 'family')} was wrong.`}</strong> `
      + `${escapeHtml(levels.map(level => level.answer).join(' > '))}${taxon.commonName ? ` (${escapeHtml(taxon.commonName.toLowerCase())})` : ''}.`
      + `${taxon.diagnosticTraits[0] ? ` Giveaway: ${escapeHtml(taxon.diagnosticTraits[0])}.` : ''}${photoCredit(current)}`;
    nextButton.classList.remove('hidden');
    nextButton.focus();
  }

  stepsBox.addEventListener('click', event => {
    const button = event.target.closest('.option');
    const block = button?.closest('.step');
    const index = blocks().indexOf(block);
    if (!button || index !== given.length) return;
    given.push(button.dataset.value);
    block.querySelectorAll('.option').forEach(option => {
      if (option.dataset.value === levels[index].answer) option.classList.add('correct');
      else if (option === button) option.classList.add('wrong');
      option.disabled = true;
    });
    if (index + 1 < levels.length) blocks()[index + 1].classList.remove('hidden');
    else finish();
  });
  nextButton.addEventListener('click', next);
  photo.addEventListener('load', () => { failedPhotos = 0; });
  photo.addEventListener('error', () => {
    failedPhotos += 1;
    if (failedPhotos < 5) next();
    else box.classList.add('hidden');
  });
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (activeBox === box && /^[1-4]$/.test(event.key)) blocks()[given.length]?.querySelectorAll('.option')[Number(event.key) - 1]?.click();
  });

  claimKeys(box);
  showStreak();
  next();
  box.classList.remove('hidden');
}

/* ---------- saved progress ---------- */
function showProgress(card) {
  const appStorage = createStorage(card.dataset.progress);
  const total = Number(card.dataset.total);
  const seen = Math.min(appStorage.get('seen', []).length, total);
  if (!seen) return;
  const percent = Math.round((seen / total) * 100);
  card.querySelector('.progress-bar span').style.width = `${percent}%`;
  card.querySelector('[data-role="progress-text"]').textContent = `You've seen ${seen} of ${total} questions (${percent}%)`;
  card.classList.remove('hidden');
}

const mystery = document.querySelector('[data-role="mystery"]');
if (mystery && orders.photos.length) mountMystery(mystery);
const familyMystery = document.querySelector('[data-role="family-mystery"]');
const familyPhotos = practical.images.filter(image => image.quiz && isFamilyRank(practical.taxa.find(taxon => taxon.name === image.taxon) || {}));
if (familyMystery && familyPhotos.length) mountFamilyMystery(familyMystery, familyPhotos);
document.querySelectorAll('[data-progress]').forEach(showProgress);
