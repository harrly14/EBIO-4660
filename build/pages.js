// Renders each page in content/site.json through views/layouts/base.hbs.
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { listFiles, withoutExtension } from './files.js';
import { poolSize } from '../src/engine/question-pool.js';
import * as ordersQuestions from '../src/apps/orders/questions.js';
import * as practicalQuestions from '../src/apps/practical/questions.js';

const HANDLEBARS_RUNTIME = 'assets/js/vendor/handlebars.runtime.min.js';

const QUESTIONS = { orders: ordersQuestions, practical: practicalQuestions };

/* Headline numbers for the home page's resource cards, before the question total. */
const APP_STATS = {
  orders: content => [
    { value: content.orders.length, label: 'orders' },
    { value: content.photos.length, label: 'specimen photos' }
  ],
  practical: content => [
    { value: content.taxa.length, label: 'taxa' },
    { value: new Set(content.anatomy.flatMap(region => region.structures.map(structure => structure.term))).size, label: 'anatomy terms' }
  ]
};

function resourceCard(site, apps, resource) {
  const content = apps[resource.app];
  const pools = QUESTIONS[resource.app].buildPools(content);
  const questionTotal = poolSize(pools, Object.keys(pools));
  return {
    ...resource,
    questionTotal,
    stats: [...APP_STATS[resource.app](content), { value: questionTotal, label: 'practice questions' }]
  };
}

export function renderPages(viewsDir, site, apps) {
  const handlebars = Handlebars.create();
  const read = file => fs.readFileSync(path.join(viewsDir, file), 'utf8');
  listFiles(path.join(viewsDir, 'partials'), '.hbs').forEach(file => handlebars.registerPartial(withoutExtension(file), read(path.join('partials', file))));
  const layout = handlebars.compile(read('layouts/base.hbs'));

  return site.pages.map(page => {
    const data = {
      ...page,
      site,
      resources: (page.resources || []).map(resource => resourceCard(site, apps, resource)),
      scripts: page.app ? [HANDLEBARS_RUNTIME] : [],
      module: page.app ? `assets/js/apps/${page.app}/main.js` : page.module || ''
    };
    const content = handlebars.compile(read(`pages/${page.template}.hbs`))(data);
    return { output: page.output, html: `${layout({ ...data, content }).trim()}\n` };
  });
}
