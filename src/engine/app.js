// Wires the five shared study tabs to one app's config (see src/apps/*/main.js).
import { createStorage, createSeenTracker } from './storage.js';
import { createLearnTab } from './learn.js';
import { createPracticeTab } from './practice.js';
import { createFlashcardsTab } from './flashcards.js';
import { createSpeedTab } from './speed.js';
import { createReferenceTab } from './reference.js';

const TAB_FACTORIES = {
  learn: createLearnTab,
  practice: createPracticeTab,
  flashcards: createFlashcardsTab,
  speed: createSpeedTab,
  reference: createReferenceTab
};

export function createStudyApp(config) {
  const root = document.querySelector(`[data-study-app="${config.id}"]`);
  const storage = createStorage(config.id);
  (config.storageMigrations || []).forEach(([legacyKey, name, transform]) => storage.migrate(legacyKey, name, transform));

  const app = { config, storage, seen: createSeenTracker(storage), activeTab: null, setTab, tabs: {} };
  Object.entries(TAB_FACTORIES).forEach(([id, factory]) => {
    app.tabs[id] = factory(root.querySelector(`[data-pane="${id}"]`), app);
  });

  function setTab(id) {
    app.activeTab = id;
    root.querySelectorAll('[data-tab]').forEach(button => {
      const active = button.dataset.tab === id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    root.querySelectorAll('[data-pane]').forEach(pane => pane.classList.toggle('hidden', pane.dataset.pane !== id));
    app.tabs[id].show();
  }

  root.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.tab)));
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    app.tabs[app.activeTab]?.onKey?.(event);
  });
  setTab('learn');
  return app;
}
