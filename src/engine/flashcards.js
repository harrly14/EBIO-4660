// Flashcards tab: the app supplies the deck, the front-side modes, and how each card reads.
import { delegate, isTyping, render, role } from './dom.js';
import { shuffle } from './util.js';

export function createFlashcardsTab(pane, app) {
  const { deck: initialDeck, modes, front, back } = app.config.flashcards;
  let deck = [...initialDeck];
  let index = 0;
  let mode = modes[0].value;

  function show() {
    const item = deck[index];
    pane.innerHTML = render('flashcards', {
      modes: modes.map(option => ({ ...option, selected: option.value === mode })),
      front: front(item, mode),
      back: back(item),
      position: index + 1,
      total: deck.length
    });
  }

  const flip = () => role(pane, 'flash-card').classList.toggle('flipped');
  const move = step => {
    index = (index + step + deck.length) % deck.length;
    show();
  };

  delegate(pane, 'click', {
    'flash-flip': flip,
    'flash-prev': () => move(-1),
    'flash-next': () => move(1),
    'flash-shuffle': () => {
      deck = shuffle(initialDeck);
      index = 0;
      show();
    }
  });
  delegate(pane, 'change', {
    'flash-mode': select => {
      mode = select.value;
      show();
    }
  }, 'role');

  function onKey(event) {
    if (isTyping(event)) return;
    if (event.code === 'Space') {
      event.preventDefault();
      flip();
    } else if (event.key === 'ArrowRight') move(1);
    else if (event.key === 'ArrowLeft') move(-1);
  }

  return { show, onKey };
}
