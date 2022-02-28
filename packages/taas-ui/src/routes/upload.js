export const post = async ({ request }) => {
  const data = await request.formData();

  console.log(data.get('accessToken'));
  console.log(data.get('testScript'));

  return {
    status: 200
  };
};
