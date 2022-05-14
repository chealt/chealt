import { saveFile as saveFileToDB, list as listObjectStore } from '../IndexedDB';

const uploadFile = (file) => saveFileToDB({ file, type: 'documents' });

const getDocuments = async () => {
  const objects = await listObjectStore({ type: 'documents' });
  const sortedObjects = objects.sort((a, b) => b.value.savedTimestamp - a.value.savedTimestamp);

  return sortedObjects;
};

const getFiles = (event) => {
  if (event.target.files.length) {
    return Array.from(event.target.files);
  }

  if (event.dataTransfer.items) {
    return Array.from(event.dataTransfer.items)
      .filter(({ kind }) => kind === 'file')
      .map((item) => item.getAsFile());
  }

  return Array.from(event.dataTransfer.files);
};

const uploadDocuments = async (event) => {
  event.preventDefault();

  await Promise.all(getFiles(event).map(uploadFile));

  return getDocuments();
};

export { uploadDocuments, getDocuments };
