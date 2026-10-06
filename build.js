const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const Handlebars = require('handlebars');
const { navigation, pages } = require('./views/data/site');

const root = __dirname;
const views = path.join(root, 'views');

function readView(relativePath) {
  return fs.readFileSync(path.join(views, relativePath), 'utf8');
}

Handlebars.registerPartial('header', readView('partials/header.hbs'));
Handlebars.registerPartial('navigation', readView('partials/navigation.hbs'));
Handlebars.registerPartial('footer', readView('partials/footer.hbs'));
Handlebars.registerPartial('quiz/app', readView('partials/quiz/app.hbs'));
const layout = Handlebars.compile(readView('layouts/base.hbs'));

function build() {
  for (const page of pages) {
    const data = {
      ...page,
      basePath: '',
      navItems: navigation,
      quizTemplates: page.page === 'quiz' ? readView('partials/quiz/templates.hbs') : ''
    };
    const content = Handlebars.compile(readView(page.template))(data);
    const html = layout({ ...data, content });
    const outputPath = path.join(root, page.output);
    fs.writeFileSync(outputPath, `${html.trim()}\n`);
    console.log(`Built ${page.output}`);
  }
}

function serve() {
  const port = Number(process.env.PORT) || 4173;
  const server = http.createServer((request, response) => {
    const requestedPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.slice(1);
    const filePath = path.resolve(root, relativePath);

    if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== root) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(error.code === 'ENOENT' ? 404 : 500);
        response.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to read file');
        return;
      }
      response.writeHead(200);
      response.end(file);
    });
  });

  server.listen(port, () => {
    console.log(`Serving the built site at http://localhost:${port}`);
  });
}

build();
if (process.argv.includes('--serve')) serve();
