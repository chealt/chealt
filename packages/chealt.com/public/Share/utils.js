const uploadHost = import.meta.env.UPLOAD_HOST;
const downloadHost = import.meta.env.UPLOAD_HOST;

if (!uploadHost) {
  throw Error('Must define an upload host');
}

const getUploadUrl = () => uploadHost;
const getDownloadUrl = () => downloadHost;

const upload = async ({ personalDetails, documents, vaccinations }) => {
  const url = getUploadUrl();

  // strip out the blob, we will upload it separately
  const documentsMetaOnly = documents ? [] : undefined;

  if (documents) {
    for (const {
      key,
      value: { blob, ...rest }
    } of documents) {
      // Upload file first
      await fetch(url, { method: 'PUT', body: blob, headers: { 'x-hash': rest.hash } });

      // Add meta data of the file to the details upload
      documentsMetaOnly.push({
        key,
        value: rest
      });
    }
  }

  const uploadResponse = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ personalDetails, documents: documentsMetaOnly, vaccinations })
  });

  const { objectName } = await uploadResponse.json();

  return `${getDownloadUrl()}/${objectName}`;
};

const download = async (url) => {
  const {
    documents: documentsMetaOnly,
    personalDetails,
    profiles,
    vaccinations
  } = await fetch(url).then((response) => response.json());

  const documents = await Promise.all(
    documentsMetaOnly.map(async ({ key, value: { savedTimestamp, ...rest } }) => {
      const fileContent = await fetch(`${getDownloadUrl()}/${rest.hash}`);

      return {
        key,
        value: {
          // remove saved timestamp
          ...rest,
          blob: await fileContent.arrayBuffer()
        }
      };
    })
  );

  return {
    documents,
    personalDetails,
    profiles,
    vaccinations
  };
};

export { upload, download };
