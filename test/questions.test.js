import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as orders from '../src/apps/orders/questions.js';
import * as practical from '../src/apps/practical/questions.js';
import { content } from './helpers.js';

const APPS = {
  orders: { pools: orders.buildPools(content.apps.orders), modes: orders.PRACTICE_MODES },
  practical: { pools: practical.buildPools(content.apps.practical), modes: practical.PRACTICE_MODES }
};

/* How many questions of each type the content should generate, worked out from the content itself. */
const sum = (items, count) => items.reduce((total, item) => total + count(item), 0);
const pairs = n => (n * (n - 1)) / 2;
const handWritten = (questions, type) => questions.filter(question => question.type === type).length;

function expectedOrdersCounts({ orders, confusionGroups, challengeQuestions, photos }) {
  return {
    common: sum(orders, item => 1 + item.aliases.length),
    traits: sum(orders, item => pairs(item.traits.length)),
    feature: orders.length,
    fill: orders.length,
    visual: photos.length,
    confusion: sum(confusionGroups, group => group.length),
    scenario: challengeQuestions.length
  };
}

function expectedPracticalCounts({ taxa, anatomy, morphology, comparisons, questions, images }) {
  const usable = taxa.filter(taxon => !taxon.sourceLimitation);
  const families = taxa.filter(practical.isFamilyRank);
  const usableFamilies = usable.filter(practical.isFamilyRank);
  const familyNames = new Set(usableFamilies.map(taxon => taxon.name));
  const anatomyTerms = new Set(anatomy.flatMap(region => region.structures.map(structure => structure.term))).size;
  const traitsOf = rank => sum(usable.filter(taxon => taxon.rank === rank), taxon => taxon.diagnosticTraits.length);
  return {
    'anatomy-name': anatomyTerms,
    'anatomy-location': anatomyTerms,
    'order-identification': traitsOf('order'),
    'suborder-identification': traitsOf('suborder'),
    'family-identification': sum(usableFamilies, taxon => taxon.diagnosticTraits.length),
    'family-image-identification': images.filter(image => image.quiz && familyNames.has(image.taxon)).length,
    'functional-morphology': sum(morphology, group => group.types.length) + handWritten(questions, 'functional-morphology'),
    'ecology-life-history': sum(families, taxon => taxon.ecology.length + taxon.lifeHistory.length) + handWritten(questions, 'ecology-life-history'),
    'select-all': handWritten(questions, 'select-all'),
    'reverse-anatomy': handWritten(questions, 'reverse-anatomy'),
    'mystery-specimen': handWritten(questions, 'mystery-specimen'),
    comparison: sum(comparisons, comparison => comparison.features.length),
    'yes-no-feature': handWritten(questions, 'yes-no-feature')
  };
}

const EXPECTED = {
  orders: expectedOrdersCounts(content.apps.orders),
  practical: expectedPracticalCounts(content.apps.practical)
};
const withoutZeros = counts => Object.fromEntries(Object.entries(counts).filter(([, count]) => count > 0));

for (const [name, app] of Object.entries(APPS)) {
  const candidates = Object.values(app.pools).flat();

  test(`${name}: every content entry generates its questions`, () => {
    const byType = {};
    candidates.forEach(candidate => { const { type } = candidate.build(); byType[type] = (byType[type] || 0) + 1; });
    assert.deepEqual(byType, withoutZeros(EXPECTED[name]));
  });

  test(`${name}: ids are unique`, () => {
    const ids = candidates.map(candidate => candidate.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test(`${name}: every question is answerable`, () => {
    candidates.forEach(candidate => {
      const question = candidate.build();
      const where = `${candidate.id}`;
      assert.ok(question.prompt && question.explanation && question.label, `${where}: missing prompt/explanation/label`);
      if (question.input === 'fill') return;
      assert.equal(new Set(question.choices).size, question.choices.length, `${where}: duplicate choices`);
      [].concat(question.answer).forEach(answer => assert.ok(question.choices.includes(answer), `${where}: answer not among choices`));
      if (question.input === 'choice') assert.ok(question.choices.length >= 2, `${where}: too few choices`);
    });
  });

  test(`${name}: practice modes only use existing pools`, () => {
    const types = app.modes.flatMap(mode => [...(mode.types || []), ...(mode.buckets || []).flat(), ...(mode.strata || []).flatMap(stratum => stratum.types)]);
    types.forEach(type => assert.ok(app.pools[type]?.length, `pool "${type}" is empty or missing`));
  });
}
