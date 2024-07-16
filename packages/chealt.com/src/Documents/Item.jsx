import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';
import { useRoute, useLocation } from 'preact-iso';

import DownloadButton from './DownloadButton';
import EditButton from './EditButton';
import ViewButton from './ViewButton';
import checkUpTags from '../CheckUps/tags.json';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Tag from '../Form/Tag';
import Modal from '../Modal/Modal';
import { add as addToast } from '../Toast/Toast';

import styles from './Item.module.css';

const Item = ({
  addTag,
  children,
  deleteTag,
  documentKey,
  document,
  isTagEditorOpen,
  openTagEditor,
  save,
  tags,
  ...inputProps
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const route = useRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkUpTagLabels = checkUpTags.map((tag) => t(`pages.checkUps.tags.${tag}`));
  const tagSuggestions = [...checkUpTagLabels, t('common.vaccinations')];
  const tagsValue = (tags || []).join(',');

  const saveFormData = async (event) => {
    event.preventDefault();

    const { name, blob, ...rest } = document; // eslint-disable-line no-unused-vars

    try {
      await save({
        key: documentKey,
        value: {
          name: event.target.name.value,
          blob,
          ...rest
        }
      });

      setIsModalOpen(false);
      location.route('/documents');

      addToast({ message: t('pages.documents.saveSuccess') });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      addToast({ message: t('pages.documents.saveFailure'), role: 'alert' });
    }
  };

  useEffect(() => {
    if (route.documentKey) {
      setIsModalOpen(true);
    }
  }, [setIsModalOpen, route.documentKey]);

  return (
    <>
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
      <Modal
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);

          location.route('/documents');
        }}
      >
        <Form name="newVaccination" onSubmit={saveFormData} centered>
          <Input
            type="text"
            name="name"
            required="required"
            list="name"
            value={document.name}
          >
            {t('pages.documents.name')}
          </Input>
          <Button emphasized type="submit">
            {t('common.save')}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Item;
