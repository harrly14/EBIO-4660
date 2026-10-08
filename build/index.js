// Build entry point: validates content, then writes the static site to dist/.
//   node build/index.js            build once
//   node build/index.js --serve    build, then serve dist/ (PORT, default 4173)
//   node build/index.js --watch    rebuild when sources change
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent } from './content.js';
import { precompileClientTemplates } from './templates.js';
import { renderPages } from './pages.js';
import { attributionMarkdown } from './attribution.js';
import { serveStatic, watch } from './serve.js';
import { writeFile } from './files.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = {
  content: path.join(root, 'content'),
  views: path.join(root, 'views'),
  src: path.join(root, 'src'),
  public: path.join(root, 'public'),
  dist: path.join(root, 'dist')
};

/* Browser-ready content: one ES module per app. */
const contentModule = data => `// Generated from content/ by build/index.js. Do not edit.\nexport default ${JSON.stringify(data)};\n`;

export function build() {
  const { site, apps, errors, warnings } = loadContent(root);
  warnings.forEach(warning => console.warn(`warning: ${warning}`));
  if (errors.length) throw new Error(`Content has ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);

  fs.rmSync(dirs.dist, { recursive: true, force: true });
  fs.cpSync(dirs.public, dirs.dist, { recursive: true });
  fs.cpSync(dirs.src, path.join(dirs.dist, 'assets/js'), { recursive: true });
  fs.cpSync(path.join(root, 'node_modules/handlebars/dist/handlebars.runtime.min.js'), path.join(dirs.dist, 'assets/js/vendor/handlebars.runtime.min.js'));
  writeFile(path.join(dirs.dist, 'assets/js/generated/templates.js'), precompileClientTemplates(path.join(dirs.views, 'client')));
  Object.entries(apps).forEach(([app, data]) => writeFile(path.join(dirs.dist, `assets/js/generated/${app}-content.js`), contentModule(data)));
  renderPages(dirs.views, site).forEach(({ output, html }) => writeFile(path.join(dirs.dist, output), html));
  writeFile(path.join(dirs.dist, 'images/ATTRIBUTION.md'), attributionMarkdown([
    { label: 'Orders Quiz photos', images: apps.orders.photos },
    { label: 'Lab Practical specimen images', images: apps.practical.images }
  ]));
  console.log(`Built ${site.pages.map(page => page.output).join(', ')} into dist/`);
}

function buildSafely() {
  try {
    build();
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const ok = buildSafely();
  if (process.argv.includes('--watch')) watch([dirs.content, dirs.views, dirs.src, dirs.public], buildSafely);
  if (process.argv.includes('--serve')) serveStatic(dirs.dist, Number(process.env.PORT) || 4173);
  else if (!ok) process.exitCode = 1;
}
