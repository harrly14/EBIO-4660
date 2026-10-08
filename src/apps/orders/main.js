// Orders Quiz: content + question pools plugged into the shared study engine.
import content from '../../generated/orders-content.js';
import { createStudyApp } from '../../engine/app.js';
import { render } from '../../engine/dom.js';
import { buildPools, PRACTICE_MODES } from './questions.js';

const GROUP_FILTERS = [
  { value: 'all', label: `All ${content.orders.length} orders` },
  { value: 'wingless', label: 'Mostly wingless' },
  { value: 'hemi', label: 'Incomplete metamorphosis' },
  { value: 'holo', label: 'Complete metamorphosis' }
];

const ordersSection = {
  id: 'orders',
  label: 'Orders',
  mount(container) {
    container.innerHTML = render('reference/orders', { filters: GROUP_FILTERS });
    const search = container.querySelector('[data-role="ref-search"]');
    const filter = container.querySelector('[data-role="ref-filter"]');
    const grid = container.querySelector('[data-role="ref-grid"]');
    const draw = () => {
      const query = search.value.trim().toLowerCase();
      const orders = content.orders.filter(item => (filter.value === 'all' || item.group === filter.value)
        && [item.order, item.common, item.key, ...item.traits, ...item.tags].join(' ').toLowerCase().includes(query));
      grid.innerHTML = render('reference/orders-grid', { orders });
    };
    search.addEventListener('input', draw);
    filter.addEventListener('change', draw);
    draw();
  }
};

createStudyApp({
  id: 'orders',
  storageMigrations: [['ebioOrdersSeen', 'seen'], ['insectSpeedHighScore', null]],
  lessons: content.lessons,
  practice: {
    pools: buildPools(content),
    modes: PRACTICE_MODES
  },
  flashcards: {
    deck: content.orders,
    modes: [
      { value: 'order', label: 'Order name' },
      { value: 'common', label: 'Common name' },
      { value: 'clue', label: 'Recognition clue' }
    ],
    front: (item, mode) => ({
      order: { eyebrow: 'Order', text: item.order, hint: 'Click or press Space to flip' },
      common: { eyebrow: 'Common name', text: item.common, hint: 'What order is this?' },
      clue: { eyebrow: 'Recognition clue', text: item.key, hint: 'Name the order', clue: true }
    })[mode],
    back: item => ({
      eyebrow: item.common,
      title: item.order,
      sections: [{ heading: 'Best giveaway', text: item.key }, { heading: 'Characteristics', items: item.traits }],
      tags: item.tags
    })
  },
  reference: { sections: [ordersSection] }
});
