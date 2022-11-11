import { use } from 'i18next';
import { initReactI18next } from 'preact-i18next';
import { useEffect, useState } from 'preact/hooks';

import en from '../translation/en.json';

const IntlProvider = ({ children }) => {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      use(initReactI18next) // passes i18n down to react-i18next
        .init({
          resources: {
            en: {
              translation: en
            }
          },
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false
          }
        })
        .then(() => setInitialized(true));
    }
  }, [isInitialized]);

  return isInitialized ? children : null;
};

export default IntlProvider;
