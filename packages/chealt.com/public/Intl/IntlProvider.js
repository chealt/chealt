import { use } from 'i18next';
import { initReactI18next } from 'preact-i18next';
import { useEffect, useState } from 'preact/hooks';

import da from '../translation/da.json';
import enGB from '../translation/en-GB.json';
import enUS from '../translation/en-US.json';
import hu from '../translation/hu.json';
import po from '../translation/po.json';

const IntlProvider = ({ children }) => {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
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
          }
        })
        .then(() => setInitialized(true));
    }
  }, [isInitialized]);

  return isInitialized ? children : null;
};

export default IntlProvider;
