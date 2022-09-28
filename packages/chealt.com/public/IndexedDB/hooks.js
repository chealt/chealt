import { useCallback, useState, useEffect } from 'preact/hooks';
import database from './index';

const useObjectStore = (name) => {
  const [instance, setInstance] = useState();
  const [items, setItems] = useState([]);

  const loadItems = useCallback(async () => {
    const items = await instance.list({ type: name });

    setItems(items);
  }, [instance, name]);

  const save = useCallback(
    async ({ key, value }) => {
      await instance.save({ type: name, key, value });

      // refresh items after saving a new one
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
    items,
    save
  };
};

export { useObjectStore };
