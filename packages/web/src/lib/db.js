const DB_NAME = 'chealt-local';
const DB_VERSION = 2;
const ACTIVITY_STORE = 'activities';

let dbPromise = null;

function openDb() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (db.objectStoreNames.contains('entries')) {
        db.deleteObjectStore('entries');
      }

      if (!db.objectStoreNames.contains(ACTIVITY_STORE)) {
        const store = db.createObjectStore(ACTIVITY_STORE, { keyPath: 'id' });
        store.createIndex('startAt', 'startAt', { unique: false });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('dirty', 'dirty', { unique: false });
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
    const tx = db.transaction(ACTIVITY_STORE, mode);
    const store = tx.objectStore(ACTIVITY_STORE);
    const req = fn(store);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function sortByStartDesc(items) {
  return items.sort((a, b) => {
    if (a.startAt === b.startAt) return 0;
    return a.startAt > b.startAt ? -1 : 1;
  });
}

export async function replaceActivities(activities) {
  const db = await openDb();
  const now = new Date().toISOString();

  await new Promise((resolve, reject) => {
    const tx = db.transaction(ACTIVITY_STORE, 'readwrite');
    const store = tx.objectStore(ACTIVITY_STORE);

    store.clear();
    for (const activity of activities) {
      store.put({
        ...activity,
        updatedAt: now,
        dirty: true,
      });
    }

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function listActivities() {
  const all = await withStore('readonly', (store) => store.getAll());
  return sortByStartDesc(all);
}

export async function listActivityTypes() {
  const all = await listActivities();
  return [...new Set(all.map((item) => item.type))].sort();
}

export async function queryActivities(filters = {}) {
  const { from, to, type } = filters;
  const all = await listActivities();

  return all.filter((item) => {
    if (type && type !== 'all' && item.type !== type) return false;
    if (from && item.startAt.slice(0, 10) < from) return false;
    if (to && item.startAt.slice(0, 10) > to) return false;
    return true;
  });
}

export async function listDirtyActivities() {
  const all = await listActivities();
  return all.filter((item) => item.dirty);
}

export async function markActivitiesSynced(ids) {
  const all = await listActivities();
  const idSet = new Set(ids);

  await Promise.all(
    all
      .filter((item) => idSet.has(item.id))
      .map(async (item) => {
        await withStore('readwrite', (store) =>
          store.put({
            ...item,
            dirty: false,
            updatedAt: new Date().toISOString(),
          }),
        );
      }),
  );
}

export async function summarizeActivities(filters = {}) {
  const items = await queryActivities(filters);
  const byType = new Map();

  for (const item of items) {
    byType.set(item.type, (byType.get(item.type) ?? 0) + 1);
  }

  return {
    total: items.length,
    byType: Array.from(byType.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count),
  };
}
