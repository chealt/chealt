import classnames from 'classnames';
import { useTranslation } from 'preact-i18next';

import styles from './LoadingIndicator.module.css';

const LoadingIndicator = ({ size = 'medium' }) => {
  const { t } = useTranslation();

  return (
    <div
      class={classnames({
        [styles.container]: true
      })}
    >
      <svg
        class={classnames({
          [styles.svg]: true,
          [styles[size]]: true
        })}
        style="fill:none;"
        viewBox="0 0 100 100"
      >
        <title>{t('common.loading')}</title>
        <circle class={styles.stroke} cx="50%" cy="50%" r="44" />
      </svg>
    </div>
  );
};

export default LoadingIndicator;
