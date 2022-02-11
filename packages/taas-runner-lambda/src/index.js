const handler = async (event, context) => {
  console.log('in the handler');
  console.log({ event });
  console.log({ context });

  return {
    statusCode: 200
  };
};

export { handler };
