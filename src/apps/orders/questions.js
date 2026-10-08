// Orders Quiz question pools and practice modes. Pure: content in, candidates out.
import { escapeHtml, makeChoices, shuffle, strong } from '../../engine/util.js';

const TOPIC_MODES = [
  { value: 'common', label: 'Common name → order', types: ['common'] },
  { value: 'traits', label: 'Description → order', types: ['traits'] },
  { value: 'feature', label: 'Order → key feature', types: ['feature'] },
  { value: 'fill', label: 'Fill in the blanks', types: ['fill'] },
  { value: 'visual', label: 'Photo visual ID', types: ['visual'] },
  { value: 'scenario', label: 'Challenge question bank', types: ['scenario'] },
  { value: 'confusion', label: 'Confusing orders', types: ['confusion'] }
];

/* Mixed practice draws evenly from every topic, so the biggest pools cannot crowd out the rest. */
export const PRACTICE_MODES = [
  { value: 'mixed', label: 'Mixed practice', buckets: TOPIC_MODES.map(mode => mode.types) },
  ...TOPIC_MODES
];

export function buildPools({ orders, confusionGroups, challengeQuestions, photos }) {
  const orderNames = orders.map(item => item.order);
  const byOrder = Object.fromEntries(orders.map(item => [item.order, item]));
  const confusableWith = name => confusionGroups.filter(group => group.includes(name)).flat();
  const orderChoices = (answer, near = []) => makeChoices(answer, orderNames, name => near.includes(name));
  const choiceQuestion = fields => ({ input: 'choice', ...fields });

  const common = (item, label) => choiceQuestion({
    type: 'common', label: 'Common name → order',
    prompt: `Which order does ${strong(label)} belong to?`,
    answer: item.order, choices: orderChoices(item.order),
    explanation: `${item.order}: ${item.key}.`
  });
  const traits = (item, pair) => {
    const [first, second] = shuffle(pair);
    return choiceQuestion({
      type: 'traits', label: 'Description → order',
      prompt: `Identify the order: ${strong(first)}; ${escapeHtml(second)}.`,
      answer: item.order, choices: orderChoices(item.order),
      explanation: `These clues point to ${item.order}. Key giveaway: ${item.key}.`
    });
  };
  const feature = item => choiceQuestion({
    type: 'feature', label: 'Order → feature',
    prompt: `Which feature is the best match for ${strong(item.order)}?`,
    answer: item.key, choices: makeChoices(item.key, orders.map(other => other.key)),
    explanation: `${item.order} (${item.common}) is best recognized by: ${item.key}.`
  });
  const fill = item => ({
    type: 'fill', label: 'Fill in the blanks', input: 'fill',
    prompt: `${escapeHtml(item.common)} are recognized by: ${strong(item.key)}. Type the insect order:`,
    answer: item.order,
    explanation: `${item.common} belong to ${item.order}.`
  });
  const visual = photo => {
    const item = byOrder[photo.taxon];
    return choiceQuestion({
      type: 'visual', label: 'Photo visual ID',
      prompt: 'Which order does the insect in this real specimen photograph belong to?',
      answer: item.order, choices: orderChoices(item.order, confusableWith(item.order)),
      explanation: `Look for this giveaway: ${item.key}.`,
      image: photo
    });
  };
  const confusion = (group, name) => {
    const target = byOrder[name];
    return choiceQuestion({
      type: 'confusion', label: 'Confusing orders',
      prompt: `Among commonly confused orders, which one matches: ${strong(target.key)}?`,
      answer: target.order, choices: orderChoices(target.order, group),
      explanation: `${target.order} = ${target.key}. Compare it with ${group.filter(other => other !== target.order).join(' / ')}.`
    });
  };
  const scenario = question => choiceQuestion({
    type: 'scenario', label: 'Challenge question',
    prompt: escapeHtml(question.prompt),
    answer: question.order, choices: shuffle([question.order, ...question.distractors]),
    explanation: question.explanation
  });

  const traitPairs = item => item.traits.flatMap((a, i) => item.traits.slice(i + 1).map(b => [a, b]));
  return {
    common: orders.flatMap(item => [item.common, ...item.aliases].map(label => ({ id: `common|${item.order}|${label}`, build: () => common(item, label) }))),
    traits: orders.flatMap(item => traitPairs(item).map(pair => ({ id: `traits|${item.order}|${pair.join('|')}`, build: () => traits(item, pair) }))),
    feature: orders.map(item => ({ id: `feature|${item.order}`, build: () => feature(item) })),
    fill: orders.map(item => ({ id: `fill|${item.order}`, build: () => fill(item) })),
    visual: photos.map(photo => ({ id: `visual|${photo.src.toLowerCase()}`, build: () => visual(photo) })),
    confusion: confusionGroups.flatMap(group => group.map(name => ({ id: `confusion|${name}|${group.join('+')}`, build: () => confusion(group, name) }))),
    scenario: challengeQuestions.map(question => ({ id: `scenario|${question.prompt}`, build: () => scenario(question) }))
  };
}
