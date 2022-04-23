import { useEffect } from 'preact/hooks';
import FileInput from '../../Form/FileInput';
import { init as initDB, save as saveToDB } from '../../IndexedDB';

const uploadDocument = (event) => {
  const input = event.target;

  for (const file of input.files) {
    saveToDB({ file, type: 'documents' });
  }
};

const Documents = () => {
  useEffect(() => {
    initDB({ database: 'chealt' });
  }, []);

  return (
    <>
      <h1>Documents</h1>
      <FileInput onChange={uploadDocument} multiple>
        Upload
      </FileInput>
    </>
  );
};

export default Documents;
