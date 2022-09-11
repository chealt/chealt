const uploadUrlHost = import.meta.env.UPLOAD_URL_HOST;
const getUploadUrl = async () => {
  const uploadUrlResponse = await fetch(uploadUrlHost);
  const { url } = await uploadUrlResponse.json();

  return url;
};

export { getUploadUrl };
