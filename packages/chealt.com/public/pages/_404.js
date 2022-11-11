import { useTranslation } from 'preact-i18next';

import PageTitle from '../PageTitle/PageTitle';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('notFound.title')}</PageTitle>
      <p>{t('notFound.message')}</p>
    </>
  );
};

export default NotFound;
