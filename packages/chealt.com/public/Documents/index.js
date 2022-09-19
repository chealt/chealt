import { useEffect, useState, useRef } from 'preact/hooks';
import FileInput from '../Form/FileInput';
import Form from '../Form/Form';
import PageTitle from '../PageTitle';
import Controls from './Controls';
import Item from './Item';
import { getDocuments, uploadDocuments as getDocumentUploader } from './utils';
import database from '../IndexedDB';
import styles from './index.module.css';
import { toggleItem } from '../Helpers/array';
import DocumentsIcon from '../Icons/Documents';
import EmptyState from '../EmptyState';
import Button from '../Form/Button';
import { add as addToast } from '../Toast';

const Documents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [instance, setInstance] = useState();
  const uploadDocumentInput = useRef(null);

  const showDocuments = !isLoading && Boolean(documents.length);
  const noDocuments = !isLoading && !documents.length;

  const uploadDocuments = async (event) => {
    try {
      const documents = await getDocumentUploader(instance)(event);

      setDocuments(documents);
      addToast({ message: 'Successfully uploaded document(s)' });
    } catch {
      addToast({ message: 'Failed to upload documents, please try again', role: 'alert' });
    }

    event.target.value = null; // clear the input after saving
  };

  useEffect(() => {
    (async () => {
      if (!instance) {
        setInstance(await database({ database: 'chealt' }));
      } else {
        const documents = await getDocuments(instance)();
        setDocuments(documents);
        setIsLoading(false);
      }
    })();
  }, [instance]);

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
      <Form name="documents">
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
            <Controls
              instance={instance}
              setDocuments={setDocuments}
              selectedDocuments={selectedDocuments}
            />
            <ul>
              {documents.map((doc) => (
                <li key={doc.key}>
                  <Item
                    onClick={() => {
                      setSelectedDocuments(toggleItem(doc.key, selectedDocuments));
                    }}
                    documentKey={doc.key}
                  >
                    {doc.key}
                  </Item>
                </li>
              ))}
            </ul>
          </>
        )}
      </Form>
    </div>
  );
};

export default Documents;
