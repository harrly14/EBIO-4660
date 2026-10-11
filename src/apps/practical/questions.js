// Lab Practical question pools and practice modes. Pure: content in, candidates out.
import { escapeHtml, groupBy, makeChoices, pickDistractors, shuffle, strong, unique } from '../../engine/util.js';
import { isFamilyRank, narrowingSteps, orderOf, taxonChoices } from './narrowing.js';
import { ancestorsOf } from './taxonomy.js';

export { isFamilyRank };

/* Fill-in-the-blank questions are tagged by topic (content/practical/fill-blanks.json and generated ones); each topic is its own pool. */
export const FILL_TOPICS = ['families', 'orders', 'anatomy', 'vocab'];
const FILL_TYPES = FILL_TOPICS.map(topic => `fill-${topic}`);

const TOPIC_MODES = [
  { value: 'order-suborder', label: 'Order & suborder identification', types: ['order-id', 'suborder-id', 'order-image', 'suborder-image'] },
  { value: 'family', label: 'Family & superfamily identification', types: ['family-id', 'family-image', 'mystery-specimen'] },
  { value: 'anatomy', label: 'External & internal anatomy', types: ['external-anatomy', 'internal-anatomy', 'reverse-anatomy'] },
  { value: 'morphology', label: 'Morphology types', types: ['morphology'] },
  { value: 'compare', label: 'Compare two groups', types: ['comparison'] },
  { value: 'select-all', label: 'Select all that apply', types: ['select-all'] },
  { value: 'yes-no', label: 'Yes / No feature', types: ['yes-no'] },
  { value: 'ecology', label: 'Ecology & life history', types: ['ecology'] },
  { value: 'fill-blank', label: 'Fill in the blank', types: FILL_TYPES }
];

/* Mixed practice draws evenly from every topic, so the biggest pools cannot crowd out the rest. */
export const PRACTICE_MODES = [
  { value: 'mixed', label: 'Mixed practical', buckets: TOPIC_MODES.map(mode => mode.types) },
  ...TOPIC_MODES,
  {
    value: 'simulation', label: 'Full practical simulation (20 stations)',
    strata: [
      { types: ['order-id', 'suborder-id', 'order-image', 'suborder-image'], count: 4 },
      { types: ['external-anatomy'], count: 3 },
      { types: ['morphology'], count: 2 },
      { types: ['internal-anatomy'], count: 3 },
      { types: ['family-id', 'family-image', 'mystery-specimen'], count: 3 },
      { types: ['comparison'], count: 1 },
      { types: ['select-all'], count: 1 },
      { types: ['yes-no'], count: 1 },
      { types: ['ecology'], count: 1 },
      { types: FILL_TYPES, count: 1 }
    ]
  }
];

/* Pool each hand-written question type (content/practical/questions.json) is served from. */
const HAND_WRITTEN_POOLS = {
  'select-all': 'select-all',
  'yes-no-feature': 'yes-no',
  'reverse-anatomy': 'reverse-anatomy',
  'mystery-specimen': 'mystery-specimen',
  'ecology-life-history': 'ecology',
  'functional-morphology': 'morphology'
};
export const HAND_WRITTEN_TYPES = Object.keys(HAND_WRITTEN_POOLS);

const LABELS = {
  'external-anatomy': 'External anatomy', 'internal-anatomy': 'Internal anatomy', 'reverse-anatomy': 'Reverse anatomy',
  'order-id': 'Order ID', 'suborder-id': 'Suborder ID', 'order-image': 'Specimen photo ID', 'suborder-image': 'Specimen photo ID', 'family-id': 'Family ID', 'family-image': 'Specimen photo ID',
  'mystery-specimen': 'Mystery specimen', morphology: 'Functional morphology', ecology: 'Ecology & life history',
  comparison: 'Comparison', 'select-all': 'Select all', 'yes-no': 'Yes / no feature',
  ...Object.fromEntries(FILL_TYPES.map(type => [type, 'Fill in the blank']))
};

export function buildPools({ taxa, anatomy, morphology, comparisons, questions, images, fillBlanks }) {
  const pools = Object.fromEntries(Object.keys(LABELS).map(type => [type, []]));
  const add = (pool, id, build) => pools[pool].push({ id, build: () => ({ input: 'choice', label: LABELS[pool], ...build() }) });

  /* A clue owned by several taxa must not make any of them a wrong answer. */
  const clueOwners = {};
  taxa.forEach(taxon => [...taxon.diagnosticTraits, ...taxon.observableFeatures, ...taxon.ecology, ...taxon.lifeHistory]
    .forEach(text => { (clueOwners[text] = clueOwners[text] || new Set()).add(taxon.name); }));
  const sharesClue = (name, clue) => Boolean(clueOwners[clue]?.has(name));

  const choicesForTaxon = (taxon, clue) => taxonChoices(taxa, taxon, name => sharesClue(name, clue));
  const accepted = taxon => [taxon.name, ...taxon.aliases];

  /* Anatomy: name-from-function and region-of-structure, split by external/internal. */
  const records = anatomy.flatMap(region => region.structures.map(structure => ({ ...structure, region: region.region, category: region.category, summary: region.summary })));
  const describe = record => record.function || record.summary;
  const terms = [...new Map(records.map(record => [record.term, record])).values()];
  terms.forEach(item => {
    const pool = item.category === 'Internal anatomy' ? 'internal-anatomy' : 'external-anatomy';
    const ownRegions = records.filter(record => record.term === item.term).map(record => record.region);
    const sameCategory = terms.filter(other => other.category === item.category && other.term !== item.term && describe(other) !== describe(item));
    const otherRegions = unique(anatomy.filter(region => region.category === item.category).map(region => region.region))
      .filter(region => !ownRegions.includes(region) && !(item.region === 'Mouth' && region === 'Head'));
    add(pool, `anatomy-name-${item.term}`, () => ({
      type: 'anatomy-name',
      prompt: `Which structure is described as ${strong(describe(item))}?`,
      answer: item.term,
      choices: shuffle([item.term, ...pickDistractors(sameCategory, other => other.region === item.region).map(other => other.term)]),
      explanation: `${item.term} is the relevant ${item.region.toLowerCase()} structure. ${describe(item)}`
    }));
    add(pool, `anatomy-location-${item.term}`, () => ({
      type: 'anatomy-location',
      prompt: `Which region or system is ${strong(item.term)} part of?`,
      answer: item.region,
      choices: shuffle([item.region, ...shuffle(otherRegions).slice(0, 3)]),
      explanation: `${item.term} belongs to the ${item.region.toLowerCase()}${ownRegions.length > 1 ? ` (it is listed under ${ownRegions.join(' and ')})` : ''}; ${describe(item)}`
    }));
  });

  /* Taxon identification from each diagnostic trait. */
  const usable = taxa.filter(taxon => !taxon.sourceLimitation);
  usable.filter(taxon => taxon.rank === 'order' || taxon.rank === 'suborder').forEach(taxon => {
    taxon.diagnosticTraits.forEach((clue, index) => add(`${taxon.rank}-id`, `id-${taxon.name}-${index}`, () => ({
      type: `${taxon.rank}-identification`,
      prompt: `Which ${taxon.rank} matches this supported clue? ${strong(clue)}`,
      answer: taxon.name, choices: choicesForTaxon(taxon, clue),
      explanation: `${clue} supports ${taxon.name}; the other choices lack this supported combination.`
    })));
  });
  const imagesByTaxon = groupBy(images.filter(image => image.quiz), image => image.taxon);
  usable.filter(isFamilyRank).forEach(taxon => {
    const keyOrder = orderOf(taxon);
    taxon.diagnosticTraits.forEach((clue, index) => add('family-id', `family-id-${taxon.name}-${index}`, () => ({
      type: 'family-identification',
      prompt: `Which family or superfamily is supported by this specimen feature? ${strong(clue)}`,
      answer: taxon.name, accepted: accepted(taxon), choices: choicesForTaxon(taxon, clue),
      explanation: `${taxon.name} is supported by ${clue}. Use the ${keyOrder} key to confirm the couplet.`
    })));
    (imagesByTaxon[taxon.name] || []).forEach(image => add('family-image', `family-image-${image.id}`, () => ({
      type: 'family-image-identification',
      prompt: 'What family or superfamily is this specimen?',
      input: 'narrowing', steps: narrowingSteps(taxon, taxa),
      answer: taxon.name, accepted: accepted(taxon), choices: choicesForTaxon(taxon, null), image,
      explanation: `${taxon.name}: useful family characters include ${taxon.diagnosticTraits.join('; ') || 'the supplied family-key characters'}.${image.visibleTraits?.length ? ` Image-associated study traits include ${image.visibleTraits.join('; ')}. These traits are diagnostic for the taxon, not a claim that every feature is visible in this photograph.` : ''}`
    })));
  });
  /* A photo of any taxon also tests its suborder and order. */
  const taxonByName = new Map(taxa.map(taxon => [taxon.name, taxon]));
  images.filter(image => image.quiz && taxonByName.has(image.taxon)).forEach(image => {
    const taxon = taxonByName.get(image.taxon);
    [taxon, ...ancestorsOf(taxon, taxa)].filter(node => node.rank === 'order' || node.rank === 'suborder').forEach(node => {
      add(`${node.rank}-image`, `${node.rank}-image-${image.id}-${node.name}`, () => ({
        type: `${node.rank}-image-identification`,
        prompt: `What ${node.rank} is this specimen?`,
        answer: node.name, choices: choicesForTaxon(node, null), image,
        explanation: `${node.name}${node.commonName ? ` (${node.commonName})` : ''}${node.diagnosticTraits.length ? `: useful ${node.rank} characters include ${node.diagnosticTraits.join('; ')}` : ''}. This photo shows ${image.taxon}, which belongs to ${node.name}.`
      }));
    });
  });
  taxa.filter(isFamilyRank).forEach(taxon => {
    const ecologyQuestion = (clue, kind) => () => ({
      type: 'ecology-life-history',
      prompt: `Which family or superfamily has this supported ${kind} feature? ${strong(clue)}`,
      answer: taxon.name, accepted: accepted(taxon), choices: choicesForTaxon(taxon, clue),
      explanation: `${taxon.name}: ${clue}.`
    });
    taxon.ecology.forEach((clue, index) => add('ecology', `family-${taxon.name}-ecology-${index}`, ecologyQuestion(clue, 'ecology or life-history')));
    taxon.lifeHistory.forEach((clue, index) => add('ecology', `family-${taxon.name}-life-${index}`, ecologyQuestion(clue, 'life-history')));
  });

  /* Morphology type from its description. */
  morphology.forEach(group => group.types.forEach(item => add('morphology', `morphology-${group.category}-${item.term}`, () => ({
    type: 'functional-morphology',
    prompt: `Which ${escapeHtml(group.category.toLowerCase().replace(/ types$/, ' type'))} is described as ${strong(item.description)}?`,
    answer: item.term, choices: makeChoices(item.term, group.types.map(other => other.term)),
    explanation: `${item.term} is ${item.description}.`
  }))));

  /* Comparisons: which of the pair (or both/neither) has each feature. */
  comparisons.forEach(({ a, b, summary, features }, pairIndex) => features.forEach(({ feature, holder, owner }, index) => {
    const both = `Both ${a} and ${b}`;
    const answer = { a, b, both, neither: 'Neither' }[holder];
    const reason = holder === 'neither' ? `Neither: ${feature} belongs to ${owner}, not to ${a} or ${b}.`
      : holder === 'both' ? `Both ${a} and ${b} have ${feature}.`
        : `${answer}: ${feature}.`;
    add('comparison', `cmp-${pairIndex}-${index}`, () => ({
      type: 'comparison',
      prompt: `${strong(`${a} vs ${b}`)}: which is characterized by ${strong(feature)}?`,
      answer, choices: [a, b, both, 'Neither'],
      explanation: `${reason} ${summary}`
    }));
  }));

  /* Hand-written questions. */
  questions.forEach(question => add(HAND_WRITTEN_POOLS[question.type], question.id, () => ({
    type: question.type,
    input: question.type === 'select-all' ? 'select-all' : 'choice',
    prompt: escapeHtml(question.prompt),
    answer: question.answer,
    choices: question.type === 'yes-no-feature' ? question.choices : shuffle(question.choices),
    explanation: question.explanation
  })));

  /* Fill in the blank: typed answers, one labeled input per blank. Every prompt names exactly what is asked for. */
  const addFill = (topic, id, build) => add(`fill-${topic}`, id, () => {
    const question = build();
    return { type: 'fill-blank', input: 'blanks', topic, ...question, answer: question.blanks.map(blank => blank.answers[0]) };
  });
  const singular = category => category.toLowerCase().replace(/ types$/, ' type');
  const sentenceCase = text => text.charAt(0).toUpperCase() + text.slice(1);

  usable.filter(isFamilyRank).forEach(taxon => {
    const [order, suborder] = String(taxon.parent).split('→').map(name => name.trim());
    if (!suborder) return;
    addFill('families', `fill-family-${taxon.name}`, () => ({
      prompt: `Give the scientific names of the order and the suborder that contain the ${taxon.rank} ${strong(taxon.name)}.`,
      blanks: [{ label: 'Order', answers: [order] }, { label: 'Suborder', answers: [suborder] }],
      explanation: `${taxon.name} is in the order ${order}, suborder ${suborder}.`
    }));
  });
  usable.filter(taxon => (taxon.rank === 'order' || taxon.rank === 'suborder') && taxon.commonName).forEach(taxon => {
    addFill('orders', `fill-${taxon.rank}-common-${taxon.name}`, () => ({
      prompt: `What is the scientific name of the ${taxon.rank} commonly called ${strong(taxon.commonName)}?`,
      blanks: [{ label: `Scientific name of the ${taxon.rank}`, answers: [taxon.name] }],
      explanation: `${sentenceCase(taxon.commonName)} are the ${taxon.rank} ${taxon.name}.`
    }));
  });
  usable.filter(taxon => taxon.rank === 'suborder').forEach(taxon => {
    addFill('orders', `fill-suborder-order-${taxon.name}`, () => ({
      prompt: `What is the scientific name of the order that contains the suborder ${strong(taxon.name)}?`,
      blanks: [{ label: 'Scientific name of the order', answers: [orderOf(taxon)] }],
      explanation: `${taxon.name} is a suborder of ${orderOf(taxon)}.`
    }));
  });
  /* A morphology term whose own name appears in its description would give the answer away. */
  const leaksAnswer = (term, description) => term.toLowerCase().split('/').some(part => description.toLowerCase().includes(part.trim().split(' ')[0]));
  morphology.forEach(group => group.types.filter(item => !leaksAnswer(item.term, item.description)).forEach(item => {
    addFill('vocab', `fill-morphology-${group.category}-${item.term}`, () => ({
      prompt: `What is the technical term for the ${escapeHtml(singular(group.category))} described as ${strong(item.description)}?`,
      blanks: [{ label: sentenceCase(singular(group.category)), answers: [item.term, ...item.term.split('/').map(part => part.trim())] }],
      explanation: `${item.term} is ${item.description}.`
    }));
  }));
  fillBlanks.forEach(question => addFill(question.topic, question.id, () => ({
    prompt: escapeHtml(question.prompt),
    blanks: question.blanks,
    explanation: question.explanation
  })));

  return pools;
}
