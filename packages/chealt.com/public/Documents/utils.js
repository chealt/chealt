import { saveFile as saveFileToDB, list as listObjectStore } from '../IndexedDB';

const uploadDocuments = (event) => {
  const input = event.target;

  return Array.from(input.files).map((file) => saveFileToDB({ file, type: 'documents' }));
};

const getDocuments = async () => {
  const objects = await listObjectStore({ type: 'documents' });
  const sortedObjects = objects.sort((a, b) => b.value.savedTimestamp - a.value.savedTimestamp);

  return sortedObjects;
};

export { uploadDocuments, getDocuments };
