import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ancestorsOf, photoCoverage } from '../src/apps/practical/taxonomy.js';
import { content } from './helpers.js';

const { taxa } = content.apps.practical;
const find = name => taxa.find(taxon => taxon.name === name);
const names = taxon => ancestorsOf(taxon, taxa).map(item => item.name);

test('family ancestors climb suborder, order, grouping, class', () => {
  assert.deepEqual(names(find('Cicadidae')).slice(0, 5), ['Auchenorrhyncha', 'Hemiptera', 'Paraneoptera', 'Neoptera', 'Insecta']);
  assert.deepEqual(names(find('Aeshnidae')).slice(0, 3), ['Anisoptera', 'Odonata', 'Paleoptera']);
});

test('orders climb through their grouping', () => {
  assert.deepEqual(names(find('Odonata')).slice(0, 2), ['Paleoptera', 'Insecta']);
  assert.deepEqual(names(find('Collembola')).slice(0, 2), ['Entognatha', 'Hexapoda']);
});

test('every taxon reaches Arthropoda without looping', () => {
  taxa.filter(taxon => taxon.name !== 'Arthropoda').forEach(taxon => assert.equal(names(taxon).at(-1), 'Arthropoda', taxon.name));
});

test('photos count toward every ancestor', () => {
  const coverage = photoCoverage(taxa, [{ taxon: 'Cicadidae', quiz: true }, { taxon: 'Membracidae', quiz: true }, { taxon: 'Cicadidae', quiz: false }]);
  assert.equal(coverage.Cicadidae.total, 1);
  assert.equal(coverage.Auchenorrhyncha.total, 2);
  assert.equal(coverage.Hemiptera.from.Membracidae, 1);
  assert.equal(coverage.Odonata.total, 0);
});
