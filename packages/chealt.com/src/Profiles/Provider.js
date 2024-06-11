import { useEffect, useState } from 'preact/hooks';

import { initProfiles } from './utils';
import { useObjectStore } from '../IndexedDB/hooks';

const Provider = ({ children }) => {
  const [isProfileInitialized, setIsProfilesInitialized] = useState(false);
  const { instance } = useObjectStore('profiles');

  useEffect(() => {
    (async () => {
      if (instance) {
        try {
          await initProfiles({ instance });

          setIsProfilesInitialized(true);
        } catch {
          setIsProfilesInitialized(true);
        }
      }
    })();
  }, [instance]);

  if (!isProfileInitialized) {
    return null;
  }

  return children;
};

export default Provider;
