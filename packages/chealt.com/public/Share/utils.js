const uploadHost = import.meta.env.UPLOAD_HOST;
const downloadHost = import.meta.env.UPLOAD_HOST;

if (!uploadHost) {
  throw Error('Must define an upload host');
}

const getUploadUrl = () => uploadHost;
const getDownloadUrl = () => downloadHost;

const upload = async ({ personalDetails, documents }) => {
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
    body: JSON.stringify({ personalDetails, documents: documentsMetaOnly })
  });

  const { objectName } = await uploadResponse.json();

  return `${getDownloadUrl()}/${objectName}`;
};

const download = async (url) => {
  const { personalDetails, documents: documentsMetaOnly } = await fetch(url).then((response) =>
    response.json()
  );

  const documents = Promise.all(
    documentsMetaOnly.map(async (document) => {
      const fileContent = await fetch(`${getDownloadUrl()}/${document.value.hash}`);

      return {
        ...document,
        value: {
          ...document.value,
          blob: fileContent
        }
      };
    })
  );

  return {
    personalDetails,
    documents
  };
};

export { upload, download };
