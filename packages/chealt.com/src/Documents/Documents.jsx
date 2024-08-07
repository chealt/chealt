import { useCallback, useState, useRef, useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import Controls from './Controls';
import Item from './Item';
import { byNameOrTag, bySavedTime, getFilesFromEvent } from './utils';
import { AppState } from '../App/state';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Form/Button';
import FileInput from '../Form/FileInput';
import { toggleItem } from '../Helpers/array';
import DocumentsIcon from '../Icons/Documents';
import { useObjectStore } from '../IndexedDB/hooks';
import { findItems } from '../IndexedDB/utils';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle/PageTitle';
import { add as addToast } from '../Toast/Toast';

import styles from './Documents.module.css';

const Documents = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [filter, setFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [openTagsDocumentKey, setOpenTagsDocumentKey] = useState();
  const uploadDocumentInput = useRef(null);
  const deleteEnabled = Boolean(selectedItems.length);
  const { deleteItems, isLoading, items, save } = useObjectStore('documents');
  const documents = findItems(items, selectedProfileId.value);

  const deleteSelectedItems = useCallback(async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(t('pages.documents.confirmDelete'))) {
      return;
    }

    try {
      await deleteItems(selectedItems);

      addToast({ message: 'Document(s) deleted' });
    } catch {
      addToast({ message: 'Failed to delete document(s)', role: 'alert' });
    }
  }, [deleteItems, selectedItems, t]);

  const uploadDocuments = async (event) => {
    event.preventDefault();

    try {
      const newDocuments = await getFilesFromEvent(event);

      for (const document of newDocuments) {
        await save({
          key: crypto.randomUUID(),
          value: { ...document, profileId: selectedProfileId.value }
        });
      }

      addToast({ message: 'Successfully uploaded document(s)' });
    } catch {
      addToast({ message: 'Failed to upload documents, please try again', role: 'alert' });
    }

    event.target.value = null; // clear the input after saving
  };

  const toggleTagEditor = (documentKey) => {
    if (openTagsDocumentKey === documentKey) {
      setOpenTagsDocumentKey();
    } else {
      setOpenTagsDocumentKey(documentKey);
    }
  };

  const addTag = (documentKey) => (value) => {
    const document = documents.find(({ key }) => key === documentKey);

    save({
      key: documentKey,
      value: { ...document.value, tags: [...(document.value.tags || []), value] }
    });
  };

  const deleteTag = (documentKey) => (value) => {
    const document = documents.find(({ key }) => key === documentKey);
    const tags = document.value.tags.filter((tag) => tag !== value);

    save({
      key: documentKey,
      value: { ...document.value, tags }
    });
  };

  const showDocuments = Boolean(documents.length);
  const noDocuments = !documents.length;
  const filteredDocuments = documents.sort(bySavedTime).filter(byNameOrTag(filter));

  return isLoading ? null : (
    <div class={styles.documents}>
      <PageTitle>{t('pages.documents.title')}</PageTitle>
      <section>
        <FileInput
          multiple
          onChange={uploadDocuments}
          ondrop={uploadDocuments}
          inputRef={uploadDocumentInput}
        >
          {t('pages.documents.upload')}
        </FileInput>
      </section>
      {noDocuments && (
        <section>
          <EmptyState>
            <DocumentsIcon />
            <p>{t('pages.documents.empty')}</p>
            <Button
              emphasized
              onClick={(event) => {
                event.preventDefault();

                uploadDocumentInput.current.click();
              }}
            >
              {t('pages.documents.startUploading')}
            </Button>
          </EmptyState>
        </section>
      )}
      {showDocuments && (
        <section>
          <Controls
            filter={filter}
            setFilter={setFilter}
            onDelete={deleteEnabled && deleteSelectedItems}
          />
          {(filteredDocuments.length && (
            <List isSimple={false}>
              {filteredDocuments.map((doc) => (
                <ListItem key={doc.key}>
                  <Item
                    onClick={() => {
                      setSelectedItems(toggleItem(doc.key, selectedItems));
                    }}
                    documentKey={doc.key}
                    document={doc.value}
                    tags={doc.value.tags}
                    openTagEditor={() => toggleTagEditor(doc.key)}
                    isTagEditorOpen={openTagsDocumentKey === doc.key}
                    addTag={addTag(doc.key)}
                    deleteTag={deleteTag(doc.key)}
                    save={save}
                  >
                    {doc.value.name}
                  </Item>
                </ListItem>
              ))}
            </List>
          )) || <p>{t('pages.documents.noMatches')}</p>}
        </section>
      )}
    </div>
  );
};

export default Documents;
