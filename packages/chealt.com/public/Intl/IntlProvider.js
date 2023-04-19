import { use } from 'i18next';
import { useContext, useEffect, useState } from 'preact/hooks';
import { initReactI18next } from 'preact-i18next';

import { setSelectedLanguage } from './signals';
import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import da from '../translation/da.json';
import enGB from '../translation/en-GB.json';
import enUS from '../translation/en-US.json';
import hu from '../translation/hu.json';
import po from '../translation/po.json';

export const defaultLanguage = 'en-US';

const IntlProvider = ({ children }) => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isInitialized, setInitialized] = useState(false);
  const { items: profiles, isLoading } = useObjectStore('profiles');
  const selectedProfile =
    !isLoading && profiles?.find(({ value: { id } }) => id === selectedProfileId.value);
  const savedLanguage = !isLoading && selectedProfileId.value && selectedProfile?.value.language;

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      use(initReactI18next) // passes i18n down to react-i18next
        .init({
          resources: {
            'en-GB': {
              translation: enGB
            },
            'en-US': {
              translation: enUS
            },
            hu: {
              translation: hu
            },
            po: {
              translation: po
            },
            da: {
              translation: da
            }
          },
          fallbackLng: 'en-US',
          interpolation: {
            escapeValue: false
          },
          lng: savedLanguage || defaultLanguage
        })
        .then(() => {
          setInitialized(true);
          setSelectedLanguage(savedLanguage);
        });
    }
  }, [isInitialized, savedLanguage]);

  return isInitialized ? children : null;
};

export default IntlProvider;
