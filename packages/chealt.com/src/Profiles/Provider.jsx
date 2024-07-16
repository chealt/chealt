import { useEffect } from 'preact/hooks';

import { initProfiles } from './utils';
import { useObjectStore } from '../IndexedDB/hooks';

const Provider = ({ children }) => {
  const { instance } = useObjectStore('profiles');

  useEffect(() => {
    (async () => {
      if (instance) {
        await initProfiles({ instance });
      }
    })();
  }, [instance]);

  return children;
};

export default Provider;
