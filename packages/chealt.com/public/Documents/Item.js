import { useLocation } from 'preact-iso';

import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';
import Launch from '../Icons/Launch';

import styles from './Item.module.css';

const Item = ({
  addTag,
  children,
  deleteTag,
  documentKey,
  isTagEditorOpen,
  openTagEditor,
  tags,
  ...inputProps
}) => {
  const { route } = useLocation();
  const tagsValue = (tags || []).join(',');

  return (
    <div class={styles.item}>
      <div class={styles.container}>
        <div class={styles.content}>
          <Input type="checkbox" value={documentKey} {...inputProps}>
            {children}
          </Input>
          {!isTagEditorOpen && <Tag value={tagsValue} />}
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
      {isTagEditorOpen && (
        <Input
          type="tag"
          name="documentTags"
          addItem={addTag}
          value={tagsValue}
          deleteItem={deleteTag}
          hideLabel
        >
          New tag
        </Input>
      )}
    </div>
  );
};

export default Item;
