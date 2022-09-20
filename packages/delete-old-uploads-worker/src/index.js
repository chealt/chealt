/* eslint-disable no-console */
const deleteOldUploads = async (bucket) => {
  console.log('Old object delete scheduled');

  const { objects } = await bucket.list();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  for (const object of objects) {
    const { key, uploaded } = object;
    const uploadedDate = new Date(uploaded);

    if (uploadedDate < yesterday) {
      try {
        await bucket.delete(key);

        console.log(`Old object with key: '${key}' deleted`);
      } catch {
        console.log(`Could not delete object with key: '${key}'`);
      }
    }
  }
};

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(deleteOldUploads(env.UPLOAD_BUCKET));
  }
};
