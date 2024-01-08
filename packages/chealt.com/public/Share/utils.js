import { decrypt, encrypt } from '../Crypto/utils';
import { objectStoreNames } from '../IndexedDB/IndexedDB';

const uploadHost = import.meta.env.UPLOAD_HOST;
const downloadHost = import.meta.env.UPLOAD_HOST;

if (!uploadHost) {
  throw Error('Must define an upload host');
}

const getUploadUrl = () => uploadHost;
const getDownloadUrl = () => downloadHost;

const upload = async (
  { bloodType, documents, personalDetails, profiles, vaccinations, familyHistory },
  { encryptData, password } = {}
) => {
  const url = getUploadUrl();

  // strip out the blob, we will upload it separately
  const documentsMetaOnly = documents ? [] : undefined;

  if (documents) {
    for (const {
      key,
      value: { blob, ...rest }
    } of documents) {
      const body = encryptData ? await encrypt({ secretData: blob, password, isFile: true }) : blob;

      // Upload file first
      await fetch(url, {
        method: 'PUT',
        body,
        headers: { 'x-hash': rest.hash }
      });

      // Add meta data of the file to the details upload
      documentsMetaOnly.push({
        key,
        value: rest
      });
    }
  }

  const data = JSON.stringify({
    bloodType,
    personalDetails,
    profiles,
    documents: documentsMetaOnly,
    familyHistory,
    vaccinations
  });
  const encryptedData = encryptData ? await encrypt({ secretData: data, password }) : undefined;

  const uploadResponse = await fetch(url, {
    method: 'PUT',
    body: encryptData ? encryptedData : data
  });

  const { objectName } = await uploadResponse.json();

  return `${getDownloadUrl()}/${objectName}`;
};

const download = async (url, { encryptData, password } = {}) => {
  const response = await fetch(url);
  const data = encryptData ? await response.text() : await response.json();

  const {
    bloodType,
    documents: documentsMetaOnly,
    personalDetails,
    profiles,
    familyHistory,
    vaccinations
  } = encryptData ? JSON.parse(await decrypt({ encryptedData: data, password })) : data;

  const documents = await Promise.all(
    documentsMetaOnly.map(async ({ key, value: { savedTimestamp, ...rest } }) => {
      const fileContent = await fetch(`${getDownloadUrl()}/${rest.hash}`);
      const blob = encryptData
        ? await decrypt({ encryptedData: await fileContent.arrayBuffer(), password, isFile: true })
        : await fileContent.arrayBuffer();

      return {
        key,
        value: {
          // remove saved timestamp
          ...rest,
          blob
        }
      };
    })
  );

  return {
    bloodType,
    documents,
    familyHistory,
    personalDetails,
    profiles,
    vaccinations
  };
};

const downloadAllUrl = ({ data }) => {
  const decoder = new TextDecoder();
  const serializedData = {};

  for (const name of objectStoreNames) {
    if (data[name]) {
      serializedData[name] = [];

      for (const item of data[name]) {
        const { key, value } = item;

        if (name === 'documents') {
          serializedData[name].push({
            key,
            value: {
              ...value,
              blob: undefined,
              serializedBlob: decoder.decode(new Uint8Array(value.blob))
            }
          });
        } else {
          serializedData[name].push({ key, value });
        }
      }
    }
  }

  return URL.createObjectURL(new Blob([JSON.stringify(serializedData)]), {
    type: 'application/json'
  });
};

export { upload, download, downloadAllUrl };
