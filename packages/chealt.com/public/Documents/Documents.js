import { useCallback, useState, useRef, useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Form/Button';
import FileInput from '../Form/FileInput';
import { toggleItem } from '../Helpers/array';
import DocumentsIcon from '../Icons/Documents';
import { useObjectStore } from '../IndexedDB/hooks';
import PageTitle from '../PageTitle/PageTitle';
import { add as addToast } from '../Toast/Toast';
import Controls from './Controls';
import Item from './Item';
import { bySavedTime, findItems, getFilesFromEvent } from './utils';

import styles from './Documents.module.css';

const Documents = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [selectedItems, setSelectedItems] = useState([]);
  const uploadDocumentInput = useRef(null);
  const deleteEnabled = Boolean(selectedItems.length);
  const { deleteItems, items, save } = useObjectStore('documents');
  const documents = findItems(items, selectedProfileId.value);

  const deleteSelectedItems = useCallback(async () => {
    try {
      await deleteItems(selectedItems);

      addToast({ message: 'Document(s) deleted' });
    } catch {
      addToast({ message: 'Failed to delete document(s)', role: 'alert' });
    }
  }, [deleteItems, selectedItems]);

  const uploadDocuments = async (event) => {
    event.preventDefault();

    try {
      const documents = await getFilesFromEvent(event);

      for (const document of documents) {
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

  const showDocuments = Boolean(documents.length);
  const noDocuments = !documents.length;
  const sortedDocuments = documents.sort(bySavedTime);

  return (
    <div class={styles.documents}>
      <PageTitle>Documents</PageTitle>
      <FileInput
        multiple
        onChange={uploadDocuments}
        ondrop={uploadDocuments}
        inputRef={uploadDocumentInput}
      >
        Upload documents
      </FileInput>
      {noDocuments && (
        <EmptyState>
          <DocumentsIcon />
          <p>Your uploaded documents will be shown here.</p>
          <Button
            emphasized
            onClick={(event) => {
              event.preventDefault();

              uploadDocumentInput.current.click();
            }}
          >
            Start uploading
          </Button>
        </EmptyState>
      )}
      {showDocuments && (
        <>
          <Controls onDelete={deleteEnabled && deleteSelectedItems} />
          <ul>
            {sortedDocuments.map((doc) => (
              <li key={doc.key}>
                <Item
                  onClick={() => {
                    setSelectedItems(toggleItem(doc.key, selectedItems));
                  }}
                  documentKey={doc.key}
                >
                  {doc.value.name}
                </Item>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Documents;