import ViewButton from './ViewButton';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';

import styles from './Item.module.css';

const checkUpTags = ['Blood test', 'Check-up', 'Medical test', 'X-ray'];
const tagSuggestions = [...checkUpTags, 'Vaccinations'];

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
        <ViewButton documentKey={documentKey} refererPage="documents" />
      </div>
      {isTagEditorOpen && (
        <Input
          type="tag"
          name="documentTags"
          list="tags"
          addItem={addTag}
          value={tagsValue}
          deleteItem={deleteTag}
          hideLabel
        >
          New tag
          <datalist id="tags">
            {tagSuggestions.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
        </Input>
      )}
    </div>
  );
};

export { checkUpTags };
export default Item;
