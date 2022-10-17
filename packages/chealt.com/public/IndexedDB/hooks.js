import { useCallback, useState, useEffect } from 'preact/hooks';
import database, { objectStoreNames } from './index';

const useObjectStore = (name) => {
  const [instance, setInstance] = useState();
  const [items, setItems] = useState([]);

  const getItem = useCallback((key) => instance.get({ type: name, key }), [instance, name]);

  const loadItems = useCallback(async () => {
    let items;

    if (name) {
      items = await instance.list({ type: name });
    } else {
      items = {};

      for (const name of objectStoreNames) {
        items[name] = await instance.list({ type: name });
      }
    }

    setItems(items);
  }, [instance, name]);

  const save = useCallback(
    async (props) => {
      if (name) {
        const { key, value } = props;

        await instance.save({ type: name, key, value });
      } else {
        for (const name of objectStoreNames) {
          for (const item of props[name]) {
            const { key, value } = item;

            await instance.save({ type: name, key, value });
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
    instance,
    deleteItems,
    getItem,
    items,
    save
  };
};

export { useObjectStore };
