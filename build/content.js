// Loads content/*.json, fills defaults, and validates cross-references before anything is built.
import fs from 'node:fs';
import path from 'node:path';
import { PRACTICE_MODES as ORDERS_MODES } from '../src/apps/orders/questions.js';
import { HAND_WRITTEN_TYPES as QUESTION_TYPES, PRACTICE_MODES as PRACTICAL_MODES } from '../src/apps/practical/questions.js';

export const IMAGE_FILES = { orders: 'orders/photos.json', practical: 'practical/images.json' };

const APP_FILES = {
  orders: {
    orders: 'orders/orders.json',
    lessons: 'orders/lessons.json',
    confusionGroups: 'orders/confusion-groups.json',
    challengeQuestions: 'orders/challenge-questions.json',
    photos: IMAGE_FILES.orders
  },
  practical: {
    taxa: 'practical/taxa.json',
    lessons: 'practical/lessons.json',
    anatomy: 'practical/anatomy.json',
    morphology: 'practical/morphology.json',
    comparisons: 'practical/comparisons.json',
    keys: 'practical/keys.json',
    questions: 'practical/questions.json',
    images: IMAGE_FILES.practical
  }
};

const TAXON_LIST_FIELDS = ['diagnosticTraits', 'observableFeatures', 'ecology', 'feedingBiology', 'lifeHistory', 'notableStructures', 'practicalFacts', 'confusionTaxa', 'distinctions', 'aliases'];
const TAXON_RANKS = ['phylum', 'subphylum', 'class', 'grouping', 'order', 'suborder', 'family', 'superfamily'];
const ORDER_GROUPS = ['wingless', 'hemi', 'holo'];
const COMPARISON_HOLDERS = ['a', 'b', 'both', 'neither'];

export function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read ${file}: ${error.message}`);
  }
}

export function loadContent(root) {
  const contentDir = path.join(root, 'content');
  const site = readJson(path.join(contentDir, 'site.json'));
  const apps = Object.fromEntries(Object.entries(APP_FILES).map(([app, files]) => [
    app,
    Object.fromEntries(Object.entries(files).map(([key, rel]) => [key, readJson(path.join(contentDir, rel))]))
  ]));
  apps.practical.taxa = apps.practical.taxa.map(normalizeTaxon);
  const { errors, warnings } = validateContent({ site, apps }, path.join(root, 'public'));
  return { site, apps, errors, warnings };
}

export function normalizeTaxon(taxon) {
  const filled = { ...taxon, requiresKey: taxon.rank === 'family' || taxon.rank === 'superfamily' };
  TAXON_LIST_FIELDS.forEach(field => { filled[field] = taxon[field] || []; });
  return filled;
}

/* ---------- validation ---------- */

function checker() {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const fields = (item, names, label) => names.forEach(name => {
    const value = item?.[name];
    check(value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && !value.length), `${label}: missing "${name}"`);
  });
  return { errors, check, fields };
}

function validateImages(images, knownTaxa, publicDir, label, { check, fields }, warnings) {
  const seen = new Set();
  images.forEach((image, index) => {
    const where = `${label}[${index}] (${image.src})`;
    fields(image, ['taxon', 'src'], where);
    check(knownTaxa.has(image.taxon), `${where}: unknown taxon "${image.taxon}"`);
    check(!seen.has(image.src), `${where}: duplicate image`);
    seen.add(image.src);
    if (publicDir) check(fs.existsSync(path.join(publicDir, image.src)), `${where}: file not found in public/`);
  });
  const uncredited = images.filter(image => !image.sourceUrl).length;
  if (uncredited) warnings.push(`${label}: ${uncredited} of ${images.length} images have no credit (run "npm run credits")`);
}

function validateLessons(lessons, practiceModes, label, { check, fields }) {
  lessons.forEach((lesson, index) => {
    const where = `${label}[${index}]`;
    fields(lesson, ['kicker', 'title', 'intro'], where);
    if (lesson.check) {
      fields(lesson.check, ['question', 'choices', 'answer'], `${where}.check`);
      check(lesson.check.choices?.includes(lesson.check.answer), `${where}.check: answer is not one of the choices`);
    }
    if (lesson.practiceMode) check(practiceModes.includes(lesson.practiceMode), `${where}: unknown practiceMode "${lesson.practiceMode}"`);
  });
}

const modeValues = modes => modes.map(mode => mode.value);

export function validateContent({ site, apps }, publicDir) {
  const ctx = checker();
  const { check, fields } = ctx;
  const warnings = [];

  site.pages.forEach((page, index) => {
    fields(page, ['output', 'template', 'title'], `site.pages[${index}]`);
    if (page.template === 'study-app') check(apps[page.app], `site.pages[${index}]: unknown app "${page.app}"`);
    (page.resources || []).forEach((resource, i) => {
      fields(resource, ['app', 'href', 'title', 'description'], `site.pages[${index}].resources[${i}]`);
      check(site.pages.some(other => other.app === resource.app), `site.pages[${index}].resources[${i}]: no page for app "${resource.app}"`);
    });
  });

  /* Orders */
  const o = apps.orders;
  const orderNames = new Set(o.orders.map(item => item.order));
  o.orders.forEach((item, index) => {
    const where = `orders.json[${index}] (${item.order})`;
    fields(item, ['order', 'common', 'key', 'traits', 'group'], where);
    check(ORDER_GROUPS.includes(item.group), `${where}: group must be one of ${ORDER_GROUPS.join(', ')}`);
    check((item.traits || []).length >= 2, `${where}: needs at least 2 traits`);
  });
  validateLessons(o.lessons, modeValues(ORDERS_MODES), 'orders/lessons.json', ctx);
  o.confusionGroups.forEach((group, index) => group.forEach(name => check(orderNames.has(name), `confusion-groups.json[${index}]: unknown order "${name}"`)));
  o.challengeQuestions.forEach((question, index) => {
    const where = `challenge-questions.json[${index}]`;
    fields(question, ['order', 'prompt', 'explanation', 'distractors'], where);
    [question.order, ...(question.distractors || [])].forEach(name => check(orderNames.has(name), `${where}: unknown order "${name}"`));
    check(!(question.distractors || []).includes(question.order), `${where}: a distractor is the answer`);
  });
  validateImages(o.photos, orderNames, publicDir, 'orders/photos.json', ctx, warnings);

  /* Practical */
  const p = apps.practical;
  const taxonNames = new Set(p.taxa.map(taxon => taxon.name));
  p.taxa.forEach((taxon, index) => {
    const where = `taxa.json[${index}] (${taxon.name})`;
    fields(taxon, ['name', 'rank'], where);
    check(TAXON_RANKS.includes(taxon.rank), `${where}: rank must be one of ${TAXON_RANKS.join(', ')}`);
    (taxon.parent ? taxon.parent.split('→') : []).forEach(name => check(taxonNames.has(name.trim()), `${where}: unknown parent "${name.trim()}"`));
    if (taxon.grouping) check(taxonNames.has(taxon.grouping), `${where}: unknown grouping "${taxon.grouping}"`);
  });
  validateLessons(p.lessons, modeValues(PRACTICAL_MODES), 'practical/lessons.json', ctx);
  p.anatomy.forEach((region, index) => {
    fields(region, ['category', 'region', 'structures'], `anatomy.json[${index}]`);
    (region.structures || []).forEach((structure, i) => fields(structure, ['term', 'location', 'function'], `anatomy.json[${index}].structures[${i}]`));
  });
  p.morphology.forEach((group, index) => fields(group, ['category', 'label', 'types'], `morphology.json[${index}]`));
  p.comparisons.forEach((comparison, index) => {
    const where = `comparisons.json[${index}]`;
    fields(comparison, ['a', 'b', 'summary', 'features'], where);
    (comparison.features || []).forEach((feature, i) => {
      check(COMPARISON_HOLDERS.includes(feature.holder), `${where}.features[${i}]: holder must be one of ${COMPARISON_HOLDERS.join(', ')}`);
      if (feature.holder === 'neither') fields(feature, ['owner'], `${where}.features[${i}]`);
    });
  });
  p.keys.forEach((key, index) => {
    fields(key, ['order', 'title', 'couplets'], `keys.json[${index}]`);
    check(taxonNames.has(key.order), `keys.json[${index}]: unknown order "${key.order}"`);
  });
  const questionIds = new Set();
  p.questions.forEach((question, index) => {
    const where = `practical/questions.json[${index}]`;
    fields(question, ['id', 'type', 'prompt', 'answer', 'choices', 'explanation'], where);
    check(QUESTION_TYPES.includes(question.type), `${where}: type must be one of ${QUESTION_TYPES.join(', ')}`);
    check(!questionIds.has(question.id), `${where}: duplicate id "${question.id}"`);
    questionIds.add(question.id);
    [].concat(question.answer).forEach(answer => check(question.choices?.includes(answer), `${where}: answer "${answer}" is not one of the choices`));
    if (question.taxon) check(taxonNames.has(question.taxon), `${where}: unknown taxon "${question.taxon}"`);
  });
  validateImages(p.images, taxonNames, publicDir, 'practical/images.json', ctx, warnings);

  return { errors: ctx.errors, warnings };
}
