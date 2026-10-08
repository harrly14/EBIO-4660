// Renders each page in content/site.json through views/layouts/base.hbs.
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { listFiles, withoutExtension } from './files.js';

const HANDLEBARS_RUNTIME = 'assets/js/vendor/handlebars.runtime.min.js';

export function renderPages(viewsDir, site) {
  const handlebars = Handlebars.create();
  const read = file => fs.readFileSync(path.join(viewsDir, file), 'utf8');
  listFiles(path.join(viewsDir, 'partials'), '.hbs').forEach(file => handlebars.registerPartial(withoutExtension(file), read(path.join('partials', file))));
  const layout = handlebars.compile(read('layouts/base.hbs'));

  return site.pages.map(page => {
    const data = {
      ...page,
      site,
      scripts: page.app ? [HANDLEBARS_RUNTIME] : [],
      module: page.app ? `assets/js/apps/${page.app}/main.js` : ''
    };
    const content = handlebars.compile(read(`pages/${page.template}.hbs`))(data);
    return { output: page.output, html: `${layout({ ...data, content }).trim()}\n` };
  });
}
