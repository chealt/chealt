const uploadHost = import.meta.env.UPLOAD_HOST;
const downloadHost = import.meta.env.UPLOAD_HOST;

if (!uploadHost) {
  throw Error('Must define an upload host');
}

const getUploadUrl = () => uploadHost;
const getDownloadUrl = () => downloadHost;

const upload = async (data) => {
  const url = getUploadUrl();

  const uploadResponse = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  const { objectName } = await uploadResponse.json();

  return `${getDownloadUrl()}/${objectName}`;
};

export { upload };
