# EBIO 4660 study materials

## Development

The site uses a small build-time Handlebars pipeline. Handlebars is not required
when the generated site is deployed: GitHub Pages serves the static HTML, CSS,
JavaScript, and images produced in the repository root.

Install dependencies and generate the static HTML entry points with:

```sh
npm install
npm run build
```

To build and serve the site locally at `http://localhost:4173`:

```sh
npm run dev
```

### Source structure

The Handlebars source pages live in `views/`:

- `views/layouts/base.hbs` contains the shared document shell, stylesheet, and
  page-specific scripts.
- `views/partials/` contains the reusable header, navigation, footer, and quiz
  markup.
- `views/pages/` contains page-specific content.
- `views/data/site.js` contains shared navigation and page build metadata.
- `data.js` remains the browser-side study data used by the quiz.

The build generates `index.html`, `orders-quiz.html`, and `practical.html` for static hosting. Edit the Handlebars files instead of editing generated HTML directly.

To add a page, add its template under `views/pages/` and a page entry to
`views/data/site.js`. Use the existing layout partials rather than duplicating
the document shell. Add reusable markup under `views/partials/`, register it in
`build.js`, and include it from a page template.

GitHub Pages can continue to publish the repository root because the build
writes the same public `.html` filenames and keeps asset URLs relative.
