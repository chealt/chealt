import { useCallback, useState, useEffect } from 'preact/hooks';

import database, { objectStoreNames } from './IndexedDB';

const useObjectStore = (name, { sortBy, sortOrder } = {}) => {
  const [instance, setInstance] = useState();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItem = useCallback((key) => instance?.get({ type: name, key }), [instance, name]);

  const loadItems = useCallback(async () => {
    let localItems;

    if (name) {
      localItems = await instance.list({ type: name, sortBy, sortOrder });
    } else {
      localItems = {};

      for (const objectStoreName of objectStoreNames) {
        localItems[objectStoreName] = await instance.list({ type: objectStoreName });
      }
    }

    setItems(localItems);
    setIsLoading(false);

    return items;
  }, [instance, name, sortBy, sortOrder]);

  const refresh = loadItems;

  const save = useCallback(
    async (props) => {
      if (name) {
        const { key, value } = props;

        await instance.save({ type: name, key, value });
      } else {
        for (const objectStoreName of objectStoreNames) {
          if (props[objectStoreName]) {
            for (const item of props[objectStoreName]) {
              const { key, value } = item;

              await instance.save({ type: objectStoreName, key, value });
            }
          }
        }
      }

      // refresh items after saving
      return loadItems();
    },
    [instance, loadItems, name]
  );

  const deleteItems = useCallback(
    async (itemsToDelete) => {
      await Promise.all(itemsToDelete.map((key) => instance.deleteItem({ type: name, key })));

      // refresh items after delete
      return loadItems();
    },
    [instance, loadItems, name]
  );

  useEffect(() => {
    if (!instance) {
      (async () => {
        setInstance(await database({ database: 'chealt' }));
      })();
    } else {
      loadItems();
    }
  }, [instance, loadItems]);

  return {
    deleteItems,
    getItem,
    instance,
    isLoading,
    items,
    refresh,
    save
  };
};

export { useObjectStore };
