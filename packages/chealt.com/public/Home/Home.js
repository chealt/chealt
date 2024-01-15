import { useTranslation } from 'preact-i18next';

import PageTitle from '../PageTitle/PageTitle';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pages.home.title')}</PageTitle>
      <h2>{t('pages.home.mainTitle')}</h2>
      <p>{t('pages.home.mainDescription')}</p>
      <h2>{t('pages.home.privacyTitle')}</h2>
      <p>{t('pages.home.privacyDescription')}</p>
    </>
  );
};

export default Home;
