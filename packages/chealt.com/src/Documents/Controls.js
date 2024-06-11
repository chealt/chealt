import { useTranslation } from 'preact-i18next';

import Button from '../Form/Button';
import Input from '../Form/Input';
import Search from '../Icons/Search';

import styles from './Controls.module.css';

const Controls = ({ filter, setFilter, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div class={styles.controls}>
      <Input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        icon={<Search />}
        hideLabel
      >
        {t('common.filter')}
      </Input>
      <Button
        disabled={!onDelete}
        onClick={async (event) => {
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
