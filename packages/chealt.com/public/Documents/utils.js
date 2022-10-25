import { getContentHash } from '@chealt/browser-utils';

const mapFile = async (file) => {
  const blob = await file.arrayBuffer();
  const hash = await getContentHash({ arrayBuffer: blob });

  const { name, lastModified, size, type } = file;

  return { blob, name, lastModified, size, type, hash };
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

const getFilesFromEvent = (event) => Promise.all(getFiles(event).map(mapFile));

const supportedImageExtensions = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
const isImage = (filename) =>
  supportedImageExtensions.includes(filename.slice(filename.lastIndexOf('.') + 1).toLowerCase());
const isPDF = (filename) => filename.slice(filename.lastIndexOf('.') + 1).toLowerCase() === 'pdf';

const findItems = (items, profileId) =>
  (items.length && items.filter(({ value }) => value.profileId === profileId)) || [];

export { getFilesFromEvent, findItems, isImage, isPDF };
