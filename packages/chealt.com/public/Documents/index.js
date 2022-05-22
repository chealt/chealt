import { useEffect, useState } from 'preact/hooks';
import FileInput from '../Form/FileInput';
import { init as initDB } from '../IndexedDB';
import PageTitle from '../PageTitle';
import { getDocuments, uploadDocuments } from './utils';

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      await initDB({ database: 'chealt' });
      const documents = await getDocuments();

      setDocuments(documents);
    })();
  }, []);

  return (
    <>
      <PageTitle>Documents</PageTitle>
      <FileInput
        onChange={async (event) => {
          const documents = await uploadDocuments(event);

          setDocuments(documents);
          event.target.value = null; // clear the input after saving
        }}
        multiple
        ondrop={async (event) => {
          const documents = await uploadDocuments(event);

          setDocuments(documents);
        }}
      >
        Upload documents
      </FileInput>
      <ul>
        {documents.map((doc) => (
          <li key={doc.key}>{doc.key}</li>
        ))}
      </ul>
    </>
  );
};

export default Documents;
