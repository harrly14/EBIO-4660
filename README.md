# EBIO 4660 study materials

Two study apps, the **Orders Quiz** and the **Lab Practical**. Both run on one shared engine with the tabs Learn, Practice, Flashcards, and Reference. The site is static: a build step turns `content/` and `views/` into plain HTML, CSS, and JS in `dist/`.

## Quick start

```sh
npm install
npm run dev      # build, serve http://localhost:4173, rebuild on every change
npm test         # content validation + question generator tests
npm run build    # one-off build into dist/
```

Node 22 or newer is required.

## Editing content

Everything a student sees lives in `content/` as JSON. The build validates it and fails with a list of problems, such as an answer that isn't one of its choices or a question that names an order that doesn't exist.

| File | What it holds |
| --- | --- |
| `content/site.json` | Site title, contact email, navigation, the study tabs, and the pages |
| `content/orders/orders.json` | The 28 orders: common name, aliases, key giveaway, traits, reference group, tags |
| `content/orders/lessons.json` | Learn-tab lessons (cards, comparisons, steps, rule of thumb, self-check, `practiceMode`) |
| `content/orders/challenge-questions.json` | Hand-written challenge questions (`order`, `prompt`, `explanation`, three `distractors`) |
| `content/orders/confusion-groups.json` | Groups of easily confused orders (used for photo distractors and the confusion mode) |
| `content/orders/photos.json` | Specimen photos per order, with credits |
| `content/practical/taxa.json` | Every taxon: rank, parent, diagnostic traits, ecology, life history, facts |
| `content/practical/lessons.json` | Practical lessons |
| `content/practical/anatomy.json` | Anatomy regions and structures (location, function, aliases) |
| `content/practical/morphology.json` | Leg, mouthpart, wing, and antenna types |
| `content/practical/comparisons.json` | Paired comparisons; each feature's `holder` is `a`, `b`, `both`, or `neither` (with `owner`) |
| `content/practical/keys.json` | The course family keys (couplets) |
| `content/practical/questions.json` | Hand-written questions (select-all, yes/no, reverse anatomy, mystery specimen, …) |
| `content/practical/images.json` | Specimen photos per family, with credits |

Most practice questions are generated from this content. Adding a trait to a taxon or a structure to `anatomy.json` adds questions automatically.

## Photo credits

Every photo should record `sourceUrl`, `title`, `creator`, and `license`. The answer feedback shows the credit, and the build writes `dist/images/ATTRIBUTION.md`. Photos without a credit trigger a build warning.

To find credits, run:

```sh
npm run credits   # http://localhost:4174
```

The tool goes through every uncredited photo:

- It checks Wikimedia Commons for a byte-identical file.
- It suggests the original link where git history still has one.
- It searches Commons for the taxon and ranks the results by visual similarity.
- It links to Google Lens, TinEye, and Bing reverse search. These links use the deployed copy of the photo.

Choose **This is it** on a match, check the fields, and **Save credit**. If nothing matches, search other terms, paste a link you found elsewhere, or load more results. **Move on (remove photo)** deletes the photo and its entry. Commit the changes when you're done; git can bring back anything removed by mistake.

## Code layout

```
content/          study content (JSON), described above
public/           copied as-is into dist/ (style.css, images/)
views/
  layouts/        the HTML document shell
  partials/       header, navigation, footer
  pages/          home.hbs and study-app.hbs (shared by both apps)
  client/         Handlebars templates precompiled for the browser; client/partials/ are registered as partials
src/
  engine/         the shared study app: tabs, practice loop, question drawing, storage
  apps/orders/    Orders Quiz config and question generators
  apps/practical/ Lab Practical config, question generators, reference sections
build/            build steps (content validation, template precompile, pages, dev server)
tools/credits/    the photo credit tool
test/             node:test suites
```

An app is mostly configuration. `src/apps/*/main.js` passes `createStudyApp` its lessons, question pools and practice modes, flashcard deck, and reference sections. Behavior shared by both apps belongs in `src/engine/`; markup belongs in `views/client/`.

## Deployment

`.github/workflows/pages.yml` runs the tests, builds, and publishes `dist/` to GitHub Pages on every push to `main`. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**. `dist/` is not committed.
