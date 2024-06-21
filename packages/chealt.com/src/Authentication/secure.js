import { startRegistration } from '@simplewebauthn/browser';
import { useContext, useEffect, useState } from 'preact/hooks';

import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import { findPersonalDetails } from '../PersonalDetails/utils';

const authnChallengeHost = import.meta.env.VITE_AUTHN_CHALLENGE_HOST;
const authnCredentialValidationHost = import.meta.env.VITE_AUTHN_CREDENTIAL_VALIDATION_HOST;

const getOptions = ({ name, id, challenge }) => ({
  challenge,
  rp: {
    name: 'Chealt',
    id: location.host.replace(/:[0-9]*/gu, '')
  },
  user: {
    id,
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
    if (!isLoading && !encryptData) {
      (async () => {
        try {
          const userId = selectedProfileId.value;

          const { challenge } = await fetch(authnChallengeHost, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uuid: userId })
          }).then((r) => r.json());

          const credentialOptions = getOptions({
            name,
            id: userId,
            challenge
          });

          const credential = await startRegistration(credentialOptions);

          await fetch(authnCredentialValidationHost, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uuid: userId,
              rpId: credentialOptions.rp.id,
              credential
            })
          });
        } catch (error) {
          // TODO: trace errors
          // eslint-disable-next-line no-console
          console.error(error);
        }

        setIsAuthenticated(true);
      })();
    }
  }, [isLoading, selectedProfileId, name, encryptData]);

  return { isAuthenticated };
};

export { useSecure };
