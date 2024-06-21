import { decrypt, encrypt } from '../Crypto/utils';
import { isPDF } from '../Documents/utils';
import { objectStoreNames } from '../IndexedDB/IndexedDB';

const uploadHost = import.meta.env.VITE_UPLOAD_HOST;
const downloadHost = import.meta.env.VITE_UPLOAD_HOST;

if (!uploadHost) {
  throw Error('Must define an upload host');
}

const getUploadUrl = () => uploadHost;
const getDownloadUrl = () => downloadHost;

/* eslint-disable-next-line complexity */
const upload = async (
  { bloodType, documents, personalDetails, profiles, vaccinations, familyHistory },
  { encryptData, password } = {}
) => {
  const url = getUploadUrl();

  // strip out the blob, we will upload it separately
  const documentsMetaOnly = documents ? [] : undefined;
  const profilesMetaOnly = profiles ? [] : undefined;

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

  if (profiles) {
    for (const {
      key,
      value: { profilePicture, ...rest }
    } of profiles) {
      if (profilePicture) {
        const { blob, ...restProfilePicture } = profilePicture;

        const body = encryptData ? await encrypt({ secretData: blob, password, isFile: true }) : blob;

        // Upload file first
        await fetch(url, {
          method: 'PUT',
          body,
          headers: { 'x-hash': restProfilePicture.hash }
        });

        // Add meta data of the file to the details upload
        profilesMetaOnly.push({
          key,
          value: {
            ...rest,
            profilePicture: restProfilePicture
          }
        });
      } else {
        profilesMetaOnly.push({
          key,
          value: {
            ...rest,
            profilePicture
          }
        })
      }
    }
  }

  const data = JSON.stringify({
    bloodType,
    personalDetails,
    profiles: profilesMetaOnly,
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
    profiles: profilesMetaOnly,
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

  const profiles = await Promise.all(
    profilesMetaOnly.map(async ({ key, value: { savedTimestamp, profilePicture, ...rest } }) => {
      const fileContent = await fetch(`${getDownloadUrl()}/${profilePicture.hash}`);
      const blob = encryptData
        ? await decrypt({ encryptedData: await fileContent.arrayBuffer(), password, isFile: true })
        : await fileContent.arrayBuffer();

      return {
        key,
        value: {
          // remove saved timestamp
          ...rest,
          profilePicture: {
            blob,
            ...profilePicture
          }
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

const triggerDocumentDownload = ({ blob, filename }) => {
  const url = isPDF(filename)
    ? URL.createObjectURL(new Blob([blob]), { type: 'application/pdf' })
    : URL.createObjectURL(new Blob([blob]));
  const a = document.createElement('a');

  a.href = url;
  a.download = filename;

  // Remove potential memory leaks
  const remove = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      removeEventListener('click', remove);
    }, 200);
  };

  a.addEventListener('click', remove, false);

  // trigger download
  a.click();
};

const triggerDocumentsDownload = ({ documents }) => {
  for (const {
    value: { blob, name }
  } of documents) {
    triggerDocumentDownload({ blob, filename: name });
  }
};

const downloadAllUrl = ({ data }) => {
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
              blob: undefined
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

export { upload, download, downloadAllUrl, triggerDocumentsDownload };
