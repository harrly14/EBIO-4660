import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContent } from '../build/content.js';
import { content } from './helpers.js';

const clone = value => structuredClone({ site: content.site, apps: content.apps, ...value });

test('content in content/ is valid', () => {
  assert.deepEqual(content.errors, []);
});

test('validator reports broken cross-references', () => {
  const broken = clone();
  broken.apps.orders.challengeQuestions[0].order = 'Notaptera';
  broken.apps.practical.comparisons[0].features[0].holder = 'maybe';
  broken.apps.practical.questions[0].answer = 'not a choice';
  broken.apps.practical.taxa.find(taxon => taxon.name === 'Aeshnidae').parent = 'Odonata → Nowhere';
  broken.apps.orders.lessons[0].practiceMode = 'nope';
  const { errors } = validateContent(broken, null);
  for (const fragment of ['unknown order "Notaptera"', 'holder must be one of', 'is not one of the choices', 'unknown parent "Nowhere"', 'unknown practiceMode "nope"']) {
    assert.ok(errors.some(error => error.includes(fragment)), `expected an error containing ${fragment}`);
  }
});

test('validator reports missing image files and duplicate images', () => {
  const broken = clone();
  broken.apps.practical.images.push({ ...broken.apps.practical.images[0] });
  broken.apps.orders.photos[0].src = 'images/orders/missing.jpg';
  const { errors } = validateContent(broken, `${process.cwd()}/public`);
  assert.ok(errors.some(error => error.includes('duplicate image')));
  assert.ok(errors.some(error => error.includes('missing.jpg') && error.includes('file not found')));
});
