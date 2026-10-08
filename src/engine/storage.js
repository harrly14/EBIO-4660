// localStorage behind try/catch (private mode, blocked storage), namespaced per app.
// Falls back to memory so the page still works when storage is unavailable.

export function createStorage(appId, backend = globalThis.localStorage) {
  const memory = new Map();
  const keyFor = name => `ebio:${appId}:${name}`;
  const readRaw = key => {
    try { return backend.getItem(key); } catch { return memory.has(key) ? memory.get(key) : null; }
  };
  const writeRaw = (key, value) => {
    try { backend.setItem(key, value); } catch { memory.set(key, value); }
  };
  const removeRaw = key => {
    try { backend.removeItem(key); } catch { /* storage unavailable */ }
    memory.delete(key);
  };

  return {
    get(name, fallback) {
      const raw = readRaw(keyFor(name));
      if (raw === null || raw === undefined) return fallback;
      try { return JSON.parse(raw); } catch { return fallback; }
    },
    set(name, value) { writeRaw(keyFor(name), JSON.stringify(value)); },
    remove(name) { removeRaw(keyFor(name)); },
    /* One-time move of a pre-refactor key into this namespace (or just its removal when `name` is null). */
    migrate(legacyKey, name, transform = value => value) {
      const raw = readRaw(legacyKey);
      if (raw === null || raw === undefined) return;
      if (name && readRaw(keyFor(name)) === null) {
        try { this.set(name, transform(JSON.parse(raw))); } catch { /* unreadable legacy value */ }
      }
      removeRaw(legacyKey);
    }
  };
}

export function createSeenTracker(storage) {
  const load = () => new Set(storage.get('seen', []));
  const save = seen => storage.set('seen', [...seen]);
  return {
    load,
    save,
    mark(id) {
      if (!id) return;
      const seen = load();
      seen.add(id);
      save(seen);
    },
    count(ids) { return [...load()].filter(id => ids.has(id)).length; },
    reset() { storage.remove('seen'); }
  };
}
