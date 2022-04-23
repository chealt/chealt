const indexedDB =
  window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
const version = 2;

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

      const objectStore = db.createObjectStore('images');

      objectStore.transaction.oncomplete = resolve;
    };
  });
};

const save = async ({ file, type, key }) => {
  const blob = await file.arrayBuffer();

  db.transaction([type], 'readwrite')
    .objectStore(type)
    .put(blob, key || file.name);
};

export { init, save };
