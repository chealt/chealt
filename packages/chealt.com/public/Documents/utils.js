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

const supportedImageExtensions = ['jpg', 'jpeg', 'bmp', 'png', 'gif', 'webp'];
const isImage = (filename) =>
  supportedImageExtensions.includes(filename.slice(filename.lastIndexOf('.') + 1).toLowerCase());
const isPDF = (filename) => filename.slice(filename.lastIndexOf('.') + 1).toLowerCase() === 'pdf';

const findItems = (items, profileId) =>
  (items.length && items.filter(({ value }) => value.profileId === profileId)) || [];

const bySavedTime = (a, b) => b.value.savedTimestamp - a.value.savedTimestamp;

const byNameOrTag = (filter) => {
  const filterRegExp = filter && new RegExp(filter.toLowerCase(), 'igu');

  return ({ value: { name, tags } }) =>
    !filter ||
    name.toLowerCase().match(filterRegExp) ||
    tags?.some((tag) => tag.toLowerCase().match(filterRegExp));
};

export { bySavedTime, getFilesFromEvent, findItems, isImage, isPDF, byNameOrTag };
