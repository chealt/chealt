import { useTranslation } from 'preact-i18next';

import FitbitAuthButton from '../Fitbit/FitbitAuthButton';
import PageTitle from '../PageTitle/PageTitle';

const Integrations = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pages.integrations.title')}</PageTitle>
      <FitbitAuthButton />
    </>
  );
};

export default Integrations;
