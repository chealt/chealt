import { use } from 'i18next';
import { initReactI18next } from 'preact-i18next';
import { useContext, useEffect, useState } from 'preact/hooks';

import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import da from '../translation/da.json';
import enGB from '../translation/en-GB.json';
import enUS from '../translation/en-US.json';
import hu from '../translation/hu.json';
import po from '../translation/po.json';
import { setSelectedLanguage } from './signals';

const defaultLanguage = 'en-US';

const IntlProvider = ({ children }) => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isInitialized, setInitialized] = useState(false);
  const { items: settings, isLoading } = useObjectStore('settings');
  const savedLanguage =
    !isLoading &&
    selectedProfileId.value &&
    (settings
      ?.filter(({ value: { profileId } }) => profileId === selectedProfileId.value)
      ?.find(({ key }) => key === 'selectedLanguage')?.value.language ||
      defaultLanguage);

  useEffect(() => {
    if (!isInitialized && savedLanguage) {
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
          lng: savedLanguage
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
