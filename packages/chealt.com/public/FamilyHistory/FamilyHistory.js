import { useTranslation } from 'preact-i18next';

import PageTitle from '../PageTitle/PageTitle';

const FamilyHistory = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageTitle>{t('pages.familyHistory.title')}</PageTitle>
    </div>
  );
};

export default FamilyHistory;
