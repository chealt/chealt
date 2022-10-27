import { useLocation } from 'preact-iso';

import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';
import Launch from '../Icons/Launch';

import styles from './Item.module.css';

const Item = ({ documentKey, children, tags, openTagEditor, ...inputProps }) => {
  const { route } = useLocation();

  return (
    <div class={styles.item}>
      <div class={styles.content}>
        <Input type="checkbox" value={documentKey} {...inputProps}>
          {children}
        </Input>
        <Tag value={tags || [].join(',')} />
      </div>
      <Button onClick={openTagEditor}>Tags</Button>
      <Button
        ghost
        onClick={() => {
          route(`/documents/view/${btoa(documentKey)}`);
        }}
      >
        <Launch />
      </Button>
    </div>
  );
};

export default Item;
