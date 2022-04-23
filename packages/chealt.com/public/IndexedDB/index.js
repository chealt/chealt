const indexedDB =
  window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
const version = 3;

let db;

const init = ({ database }) => {
  if (db) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(database, version);

    request.onerror = reject;

    request.onsuccess = () => {
      db = request.result;

      resolve();
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      const objectStore = db.createObjectStore('documents');

      objectStore.transaction.oncomplete = resolve;
    };
  });
};

const save = async ({ file, type, key }) => {
  const blob = await file.arrayBuffer();
  const { name, lastModified, size, type: fileType } = file;

  return new Promise((resolve, reject) => {
    const objectStore = db.transaction([type], 'readwrite').objectStore(type);

    objectStore.put(
      {
        blob,
        name,
        lastModified,
        size,
        type: fileType,
        savedTimestamp: Date.now()
      },
      key || file.name
    );

    objectStore.transaction.onerror = reject;
    objectStore.transaction.oncomplete = resolve;
  });
};

const list = ({ type }) => {
  const items = [];

  return new Promise((resolve, reject) => {
    const objectStore = db.transaction(type).objectStore(type);
    const openedCursor = objectStore.openCursor();

    openedCursor.onerror = reject;

    openedCursor.onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        items.push({
          key: cursor.key,
          value: cursor.value
        });
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
};

export { init, list, save };
