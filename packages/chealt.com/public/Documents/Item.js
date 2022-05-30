import { useLocation } from 'preact-iso';

import Button from '../Form/Button';
import Input from '../Form/Input';
import Launch from '../Icons/Launch';

import styles from './Item.module.css';

const Item = ({ documentKey, children, ...inputProps }) => {
  const { route } = useLocation();

  return (
    <div class={styles.item}>
      <div class={styles.content}>
        <Input type="checkbox" value={documentKey} {...inputProps}>
          {children}
        </Input>
      </div>
      <Button
        ghost
        onClick={(event) => {
          event.preventDefault();

          route(`/documents/view/${btoa(documentKey)}`);
        }}
      >
        <Launch />
      </Button>
    </div>
  );
};

export default Item;
