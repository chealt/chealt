import { useContext, useEffect, useState } from 'preact/hooks';

import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import { findPersonalDetails } from '../PersonalDetails/utils';

const getOptions = ({ name, id }) => ({
  challenge: crypto.getRandomValues(new Uint8Array(1)),
  rp: {
    name: 'Chealt',
    id: location.host.replace(/:[0-9]*/gu, '')
  },
  user: {
    id: Uint8Array.from(id, (c) => c.charCodeAt(0)),
    name,
    displayName: name
  },
  pubKeyCredParams: [
    { type: 'public-key', alg: -7 },
    { type: 'public-key', alg: -257 }
  ],
  authenticatorSelection: {
    authenticatorAttachment: 'platform'
  },
  timeout: 60000,
  attestation: 'direct'
});

const useSecure = () => {
  const {
    profiles: { selectedProfileId, encryptData }
  } = useContext(AppState);
  const { items, isLoading } = useObjectStore('personalDetails');
  const { firstName, lastName } = findPersonalDetails(items, selectedProfileId);
  const name = firstName && lastName ? `${firstName} ${lastName}` : 'anonymous';
  const [isAuthenticated, setIsAuthenticated] = useState(!encryptData);

  useEffect(() => {
    if (!isLoading && encryptData) {
      (async () => {
        await navigator.credentials.create({
          publicKey: getOptions({
            name,
            id: selectedProfileId
          })
        });

        setIsAuthenticated(true);
      })();
    }
  }, [isLoading, selectedProfileId, name, encryptData]);

  return { isAuthenticated };
};

export { useSecure };
