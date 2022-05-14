import { useEffect, useState } from 'preact/hooks';
import FileInput from '../Form/FileInput';
import { init as initDB, saveFile as saveFileToDB, list as listObjectStore } from '../IndexedDB';
import PageTitle from '../PageTitle';

const uploadDocuments = (event) => {
  const input = event.target;

  return Array.from(input.files).map((file) => saveFileToDB({ file, type: 'documents' }));
};

const getDocuments = async () => {
  const objects = await listObjectStore({ type: 'documents' });
  const sortedObjects = objects.sort((a, b) => b.value.savedTimestamp - a.value.savedTimestamp);

  return sortedObjects;
};

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
          const uploadPromises = uploadDocuments(event);
          await Promise.all(uploadPromises);
          const documents = await getDocuments();

          setDocuments(documents);
          event.target.value = null; // clear the input after saving
        }}
        multiple
      >
        Upload
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
