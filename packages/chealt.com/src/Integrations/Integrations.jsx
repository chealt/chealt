import { useTranslation } from 'preact-i18next';

import FitbitProfile from '../Fitbit/FitbitProfile';
import GoogleProfile from '../Google/GoogleProfile';
import PageTitle from '../PageTitle/PageTitle';

import * as styles from './Integrations.module.css';

const Integrations = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pages.integrations.title')}</PageTitle>
      <section class={styles.section}>
        <h2>{t('pages.integrations.fitbit')}</h2>
        <FitbitProfile />
      </section>
      <section class={styles.section}>
        <h2>{t('pages.integrations.google')}</h2>
        <GoogleProfile />
      </section>
    </>
  );
};

export default Integrations;
