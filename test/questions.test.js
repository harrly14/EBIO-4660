import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as orders from '../src/apps/orders/questions.js';
import * as practical from '../src/apps/practical/questions.js';
import { content } from './helpers.js';

const APPS = {
  orders: { pools: orders.buildPools(content.apps.orders), modes: orders.PRACTICE_MODES, speed: orders.SPEED_TYPES },
  practical: { pools: practical.buildPools(content.apps.practical), modes: practical.PRACTICE_MODES, speed: practical.SPEED_TYPES }
};

/* Question counts before the refactor (legacy candidatesFor() / practicalAudit().byType). */
const LEGACY_COUNTS = {
  orders: { common: 96, traits: 84, feature: 28, fill: 28, visual: 193, confusion: 22, scenario: 108 },
  practical: {
    'anatomy-name': 44, 'anatomy-location': 44, 'order-identification': 27, 'suborder-identification': 22,
    'family-identification': 58, 'family-image-identification': 15, 'functional-morphology': 27, 'ecology-life-history': 18,
    'select-all': 3, 'reverse-anatomy': 3, 'mystery-specimen': 2, comparison: 86, 'yes-no-feature': 8
  }
};

for (const [name, app] of Object.entries(APPS)) {
  const candidates = Object.values(app.pools).flat();

  test(`${name}: question counts match the pre-refactor bank`, () => {
    const byType = {};
    candidates.forEach(candidate => { const { type } = candidate.build(); byType[type] = (byType[type] || 0) + 1; });
    assert.deepEqual(byType, LEGACY_COUNTS[name]);
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

  test(`${name}: practice modes and speed only use existing pools`, () => {
    const types = [...app.speed, ...app.modes.flatMap(mode => [...(mode.types || []), ...(mode.strata || []).flatMap(stratum => stratum.types)])];
    types.forEach(type => assert.ok(app.pools[type]?.length, `pool "${type}" is empty or missing`));
  });
}
