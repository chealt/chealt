/* eslint-disable no-console */
const mock = {
  S3: function S3() {
    return {
      putObject: () => ({
        promise: () => Promise.resolve()
      })
    };
  }
};

export default mock;
