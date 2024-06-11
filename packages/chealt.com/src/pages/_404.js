import { useTranslation } from 'preact-i18next';

import PageTitle from '../PageTitle/PageTitle';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pages.notFound.title')}</PageTitle>
      <p>{t('pages.notFound.message')}</p>
    </>
  );
};

export default NotFound;
