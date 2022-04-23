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

  db.transaction([type], 'readwrite')
    .objectStore(type)
    .put(
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
};

export { init, save };
