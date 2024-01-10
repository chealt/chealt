import { useTranslation } from 'preact-i18next';

import Button from '../Form/Button';

import * as styles from './FitbitAuthButton.module.css';

const FitbitAuthButton = () => {
  const { t } = useTranslation();

  return (
    <Button ghost className={styles.container}>
      <img class={styles.logo} src="/Fitbit/Fitbit_app_icon.png" alt={t('fitbit.iconAlt')} />
      {t('fitbit.signIn')}
    </Button>
  );
};

export default FitbitAuthButton;
