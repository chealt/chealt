import { useCallback, useState, useEffect } from 'preact/hooks';

import database, { objectStoreNames } from './IndexedDB';

const useObjectStore = (name, { sortBy, sortOrder } = {}) => {
  const [instance, setInstance] = useState();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItem = useCallback((key) => instance?.get({ type: name, key }), [instance, name]);

  const loadItems = useCallback(async () => {
    let items;

    if (name) {
      items = await instance.list({ type: name, sortBy, sortOrder });
    } else {
      items = {};

      for (const name of objectStoreNames) {
        items[name] = await instance.list({ type: name });
      }
    }

    setItems(items);
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
        for (const name of objectStoreNames) {
          if (props[name]) {
            for (const item of props[name]) {
              const { key, value } = item;

              await instance.save({ type: name, key, value });
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
    async (items) => {
      await Promise.all(items.map((key) => instance.deleteItem({ type: name, key })));

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
