import { getContentHash } from '@chealt/browser-utils';

const uploadFile = (instance) => async (file) => {
  const blob = await file.arrayBuffer();
  const hash = await getContentHash({ arrayBuffer: blob });

  const { name, lastModified, size, type } = file;

  return instance.save({
    type: 'documents',
    key: name,
    value: { blob, name, lastModified, size, type, hash }
  });
};

const getDocument =
  (instance) =>
  ({ documentKey: key }) =>
    instance.get({ type: 'documents', key });

const getDocuments = (instance) => async () => {
  const objects = await instance.list({ type: 'documents' });
  const sortedObjects = objects.sort((a, b) => b.value.savedTimestamp - a.value.savedTimestamp);

  return sortedObjects;
};

const getFiles = (event) => {
  if (event.target.files?.length) {
    return Array.from(event.target.files);
  }

  if (event.dataTransfer.items) {
    return Array.from(event.dataTransfer.items)
      .filter(({ kind }) => kind === 'file')
      .map((item) => item.getAsFile());
  }

  return Array.from(event.dataTransfer.files);
};

const uploadDocuments = (instance) => async (event) => {
  event.preventDefault();

  await Promise.all(getFiles(event).map(uploadFile(instance)));

  return getDocuments(instance)();
};

const deleteDocuments = (instance) => async (documents) => {
  await Promise.all(documents.map((key) => instance.deleteItem({ type: 'documents', key })));

  return getDocuments(instance)();
};

const supportedImageExtensions = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
const isImage = (filename) =>
  supportedImageExtensions.includes(filename.slice(filename.lastIndexOf('.') + 1).toLowerCase());
const isPDF = (filename) => filename.slice(filename.lastIndexOf('.') + 1).toLowerCase() === 'pdf';

export { uploadDocuments, getDocuments, getDocument, deleteDocuments, isImage, isPDF };
