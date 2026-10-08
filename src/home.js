// Home page: a guess-the-order mystery specimen, plus each app's saved progress on its card.
import orders from './generated/orders-content.js';
import { createStorage } from './engine/storage.js';
import { escapeHtml, makeChoices, shuffle } from './engine/util.js';

const storage = createStorage('home');
const byOrder = Object.fromEntries(orders.orders.map(item => [item.order, item]));
const confusableWith = name => orders.confusionGroups.filter(group => group.includes(name)).flat();

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
    const credit = current.sourceUrl
      ? `<div class="photo-source">Photo: <a href="${escapeHtml(current.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(current.creator || 'source')}</a>${current.license ? ` · ${escapeHtml(current.license)}` : ''}</div>`
      : '';
    feedback.innerHTML = `<strong class="${ok ? 'feedback-correct' : 'feedback-incorrect'}">${ok ? 'Correct!' : 'Not quite.'}</strong> `
      + `${escapeHtml(item.order)} (${escapeHtml(item.common.toLowerCase())}). Giveaway: ${escapeHtml(item.key)}.${credit}`;
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
    if (/^[1-4]$/.test(event.key)) options.querySelectorAll('.option')[Number(event.key) - 1]?.click();
  });

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
document.querySelectorAll('[data-progress]').forEach(showProgress);
