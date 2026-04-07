const DB_NAME = 'chealt-local';
const STORE = 'entries';

let dbPromise = null;

function openDb() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

async function withStore(mode, fn) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    const req = fn(store);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveEntry(title) {
  const entry = {
    id: crypto.randomUUID(),
    title,
    updatedAt: new Date().toISOString(),
    dirty: true,
  };

  await withStore('readwrite', (store) => store.put(entry));
  return entry;
}

export async function listEntries() {
  const all = await withStore('readonly', (store) => store.getAll());
  return all.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
}

export async function listDirtyEntries() {
  const all = await listEntries();
  return all.filter((entry) => entry.dirty);
}

export async function markClean(ids) {
  const current = await listEntries();
  const idSet = new Set(ids);

  await Promise.all(
    current
      .filter((entry) => idSet.has(entry.id))
      .map(async (entry) => {
        await withStore('readwrite', (store) => store.put({ ...entry, dirty: false }));
      }),
  );
}
