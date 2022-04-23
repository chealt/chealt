import { useEffect } from 'preact/hooks';
import FileInput from '../../Form/FileInput';
import { init as initDB, save as saveToDB } from '../../IndexedDB';

const uploadFile = (event) => {
  const input = event.target;

  saveToDB({ file: input.files[0], type: 'images' });
};

const Upload = () => {
  useEffect(() => {
    initDB({ database: 'chealt' });
  }, []);

  return (
    <>
      <h1>Upload</h1>
      <FileInput onChange={uploadFile}>Document to upload</FileInput>
    </>
  );
};

export default Upload;
