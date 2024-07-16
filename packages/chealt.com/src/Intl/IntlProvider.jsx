import { use } from 'i18next';
import { useContext, useEffect } from 'preact/hooks';
import { initReactI18next, useTranslation } from 'preact-i18next';

import { defaultLanguage } from './defaults';
import { setSelectedLanguage } from './signals';
import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import da from '../translation/da.json';
import enGB from '../translation/en-GB.json';
import enUS from '../translation/en-US.json';
import hu from '../translation/hu.json';
import po from '../translation/po.json';

use(initReactI18next).init({
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
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false
  },
  returnEmptyString: false
});

const IntlProvider = ({ children }) => {
  const translation = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items: profiles, isLoading } = useObjectStore('profiles');
  const selectedProfile =
    !isLoading && profiles?.find(({ value: { id } }) => id === selectedProfileId.value);
  const savedLanguage = !isLoading && selectedProfileId.value && (selectedProfile?.value.language || defaultLanguage);

  useEffect(() => {
    if (savedLanguage) {
      translation.i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, [savedLanguage, translation.i18n]);

  return children;
};

export default IntlProvider;
