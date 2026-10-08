// Lab Practical question pools, practice modes, and speed-round mix. Pure: content in, candidates out.
import { escapeHtml, groupBy, makeChoices, pickDistractors, shuffle, strong, unique } from '../../engine/util.js';

export const PRACTICE_MODES = [
  { value: 'mixed', label: 'Mixed practical', uniform: true },
  { value: 'order-suborder', label: 'Order & suborder identification', types: ['order-id', 'suborder-id'] },
  { value: 'family', label: 'Family & superfamily identification', types: ['family-id', 'family-image', 'mystery-specimen'] },
  { value: 'anatomy', label: 'External & internal anatomy', types: ['external-anatomy', 'internal-anatomy', 'reverse-anatomy'] },
  { value: 'morphology', label: 'Morphology types', types: ['morphology'] },
  { value: 'compare', label: 'Compare two groups', types: ['comparison'] },
  { value: 'select-all', label: 'Select all that apply', types: ['select-all'] },
  { value: 'yes-no', label: 'Yes / No feature', types: ['yes-no'] },
  { value: 'ecology', label: 'Ecology & life history', types: ['ecology'] },
  {
    value: 'simulation', label: 'Full practical simulation (20 stations)',
    strata: [
      { types: ['order-id', 'suborder-id'], count: 5 },
      { types: ['external-anatomy'], count: 3 },
      { types: ['morphology'], count: 2 },
      { types: ['internal-anatomy'], count: 3 },
      { types: ['family-id', 'family-image', 'mystery-specimen'], count: 3 },
      { types: ['comparison'], count: 1 },
      { types: ['select-all'], count: 1 },
      { types: ['yes-no'], count: 1 },
      { types: ['ecology'], count: 1 }
    ]
  }
];

export const SPEED_TYPES = ['order-id', 'suborder-id', 'external-anatomy', 'internal-anatomy'];

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
  'order-id': 'Order ID', 'suborder-id': 'Suborder ID', 'family-id': 'Family ID', 'family-image': 'Specimen photo ID',
  'mystery-specimen': 'Mystery specimen', morphology: 'Functional morphology', ecology: 'Ecology & life history',
  comparison: 'Comparison', 'select-all': 'Select all', 'yes-no': 'Yes / no feature'
};

export const isFamilyRank = taxon => taxon.rank === 'family' || taxon.rank === 'superfamily';
const orderOf = taxon => String(taxon.parent || '').split('→')[0].trim();

export function buildPools({ taxa, anatomy, morphology, comparisons, questions, images }) {
  const pools = Object.fromEntries(Object.keys(LABELS).map(type => [type, []]));
  const add = (pool, id, build) => pools[pool].push({ id, build: () => ({ input: 'choice', label: LABELS[pool], ...build() }) });

  /* A clue owned by several taxa must not make any of them a wrong answer. */
  const clueOwners = {};
  taxa.forEach(taxon => [...taxon.diagnosticTraits, ...taxon.observableFeatures, ...taxon.ecology, ...taxon.lifeHistory]
    .forEach(text => { (clueOwners[text] = clueOwners[text] || new Set()).add(taxon.name); }));
  const sharesClue = (name, clue) => Boolean(clueOwners[clue]?.has(name));

  /* The taxon plus three same-rank wrong answers (same parent/order first) that do not share the clue. */
  const choicesForTaxon = (taxon, clue) => {
    const keyed = isFamilyRank(taxon);
    const candidates = taxa.filter(item => item.name !== taxon.name && !item.sourceLimitation && !sharesClue(item.name, clue) && (keyed ? isFamilyRank(item) : item.rank === taxon.rank));
    const preferred = keyed ? item => orderOf(item) === orderOf(taxon)
      : taxon.rank === 'order' ? item => item.grouping === taxon.grouping
        : item => item.parent === taxon.parent;
    return shuffle([taxon.name, ...pickDistractors(candidates, preferred).map(item => item.name)]);
  };
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
      answer: taxon.name, accepted: accepted(taxon), choices: choicesForTaxon(taxon, null), image,
      explanation: `${taxon.name}: useful family characters include ${taxon.diagnosticTraits.join('; ') || 'the supplied family-key characters'}. Image-associated study traits include ${(image.visibleTraits || []).join('; ')}. These traits are diagnostic for the taxon, not a claim that every feature is visible in this photograph.`
    })));
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

  return pools;
}
