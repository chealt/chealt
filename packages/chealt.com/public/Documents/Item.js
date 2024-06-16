import { useTranslation } from 'preact-i18next';

import DownloadButton from './DownloadButton';
import EditButton from './EditButton';
import ViewButton from './ViewButton';
import checkUpTags from '../CheckUps/tags.json';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';

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
  const { t } = useTranslation();
  const checkUpTagLabels = checkUpTags.map((tag) => t(`pages.checkUps.tags.${tag}`));
  const tagSuggestions = [...checkUpTagLabels, t('common.vaccinations')];
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
        <Button onClick={openTagEditor}>{t('common.tags')}</Button>
        <EditButton documentKey={documentKey}>{t('common.edit')}</EditButton>
        <ViewButton documentKey={documentKey} refererPage="documents" />
        <DownloadButton documentKey={documentKey} />
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
          {t('pages.documents.addTag')}
          <datalist id="tags">
            {tagSuggestions
              .filter((suggestion) => !tags?.includes(suggestion))
              .map((tag) => (
                <option key={tag} value={tag} />
              ))}
          </datalist>
        </Input>
      )}
    </div>
  );
};

export default Item;
