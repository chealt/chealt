import { useTranslation } from 'preact-i18next';

import Button from '../Form/Button';

import styles from './Controls.module.css';

const Controls = ({ onDelete }) => {
  const { t } = useTranslation();

  return (
    <div class={styles.controls}>
      <Button
        disabled={!onDelete}
        onClick={(event) => {
          event.preventDefault();

          onDelete();
        }}
      >
        {t('common.delete')}
      </Button>
    </div>
  );
};

export default Controls;
