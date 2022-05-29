import Button from '../Form/Button';
import Input from '../Form/Input';
import Launch from '../Icons/Launch';

import styles from './Item.module.css';

const Item = ({ key, children, ...inputProps }) => (
  <div class={styles.item}>
    <div class={styles.content}>
      <Input type="checkbox" value={key} {...inputProps}>
        {children}
      </Input>
    </div>
    <Button ghost>
      <Launch />
    </Button>
  </div>
);

export default Item;
