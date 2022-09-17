const indexedDB =
  window.indexedDB ||
  window.webkitIndexedDB ||
  window.mozIndexedDB ||
  window.OIndexedDB ||
  window.msIndexedDB;
const version = 5;

const db = async ({ database }) => {
  let instance;

  const init = () =>
    new Promise((resolve, reject) => {
      const request = indexedDB.open(database, version);

      request.onerror = reject;

      request.onsuccess = () => {
        instance = request.result;

        resolve();
      };

      request.onupgradeneeded = (event) => {
        instance = event.target.result;

        const promises = [];

        if (!instance.objectStoreNames.contains('documents')) {
          const objectStore = instance.createObjectStore('documents');
          promises.push(
            new Promise((resolve) => {
              objectStore.transaction.oncomplete = resolve;
            })
          );
        }

        if (!instance.objectStoreNames.contains('personalDetails')) {
          const objectStore = instance.createObjectStore('personalDetails');
          promises.push(
            new Promise((resolve) => {
              objectStore.transaction.oncomplete = resolve;
            })
          );
        }

        return Promise.all(promises);
      };
    });

  const put = ({ key, value, objectStore }) =>
    objectStore.put({ ...value, savedTimestamp: Date.now() }, key);

  const saveFile = async ({ file, type, key }) => {
    const blob = await file.arrayBuffer();
    const { name, lastModified, size, type: fileType } = file;

    return new Promise((resolve, reject) => {
      const objectStore = instance.transaction([type], 'readwrite').objectStore(type);

      put({
        value: {
          blob,
          name,
          lastModified,
          size,
          type: fileType,
          savedTimestamp: Date.now()
        },
        key: key || file.name,
        objectStore
      });

      objectStore.transaction.onerror = reject;
      objectStore.transaction.oncomplete = resolve;
    });
  };

  const save = async ({ type, key, value }) =>
    new Promise((resolve, reject) => {
      const objectStore = instance.transaction([type], 'readwrite').objectStore(type);

      put({
        key,
        value: { value },
        objectStore
      });

      objectStore.transaction.onerror = reject;
      objectStore.transaction.oncomplete = resolve;
    });

  const list = async ({ type }) => {
    if (!instance) {
      throw new Error('Database not initialized!');
    }

    const items = [];

    return new Promise((resolve, reject) => {
      const objectStore = instance.transaction(type).objectStore(type);
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

  const deleteItem = ({ type, key }) =>
    new Promise((resolve, reject) => {
      const objectStore = instance.transaction([type], 'readwrite').objectStore(type);

      objectStore.delete(key);

      objectStore.transaction.onerror = reject;
      objectStore.transaction.oncomplete = resolve;
    });

  const get = ({ type, key }) =>
    new Promise((resolve, reject) => {
      const objectStore = instance.transaction([type], 'readwrite').objectStore(type);

      const request = objectStore.get(key);

      objectStore.transaction.onerror = reject;
      objectStore.transaction.oncomplete = () => {
        resolve(request.result);
      };
    });

  await init();

  return { saveFile, list, deleteItem, save, get };
};

export default db;
