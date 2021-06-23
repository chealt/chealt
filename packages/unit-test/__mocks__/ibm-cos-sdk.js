/* eslint-disable no-console */
const mock = {
  S3: function S3() {
    return {
      putObject: () => ({
        promise: () => Promise.resolve()
      }),
      getObject: () => ({
        promise: () => Promise.resolve({ Body: [] })
      })
    };
  }
};

export default mock;
