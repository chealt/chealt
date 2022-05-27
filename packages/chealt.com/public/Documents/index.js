import { useEffect, useState } from 'preact/hooks';
import FileInput from '../Form/FileInput';
import Form from '../Form/Form';
import PageTitle from '../PageTitle';
import Controls from './Controls';
import Item from './Item';
import { getDocuments, uploadDocuments } from './utils';
import database from '../IndexedDB';
import styles from './index.module.css';
import { toggleItem } from '../Helpers/array';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [instance, setInstance] = useState();

  useEffect(() => {
    (async () => {
      if (!instance) {
        setInstance(await database({ database: 'chealt' }));
      } else {
        const documents = await getDocuments(instance)();
        setDocuments(documents);
      }
    })();
  }, [instance]);

  return (
    <div class={styles.documents}>
      <PageTitle>Documents</PageTitle>
      <FileInput
        onChange={async (event) => {
          const documents = await uploadDocuments(instance)(event);

          setDocuments(documents);
          event.target.value = null; // clear the input after saving
        }}
        multiple
        ondrop={async (event) => {
          const documents = await uploadDocuments(instance)(event);

          setDocuments(documents);
        }}
      >
        Upload documents
      </FileInput>
      <Form name="documents">
        <Controls instance={instance} setDocuments={setDocuments} selectedDocuments={selectedDocuments} />
        <ul>
          {documents.map((doc) => (
            <li key={doc.key}>
              <Item
                onClick={() => {
                  setSelectedDocuments(toggleItem(doc.key, selectedDocuments));
                }}
                key={doc.key}
              >
                {doc.key}
              </Item>
            </li>
          ))}
        </ul>
      </Form>
    </div>
  );
};

export default Documents;
