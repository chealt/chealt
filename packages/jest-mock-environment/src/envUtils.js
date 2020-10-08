const path = require('path');

const { MOCK } = process.env;

const getMocks = (responsesPath) => require(responsesPath);

const getResponsesPath = (rootDir, mockResponsePath) => path.join(rootDir, mockResponsePath);

const shouldSaveResponses = (responses) => !MOCK && Object.keys(responses).length;

const validateConfig = (config) => {
  if (!config.rootDir) {
    throw new Error('You need to specify the `rootDir` in your jest config!');
  } else if (!config.testEnvironmentOptions) {
    throw new Error('You need to specify the `testEnvironmentOptions` in your jest config!');
  } else if (!config.testEnvironmentOptions.mockResponsePath) {
    throw new Error('Please specify where the mocks should be saved to and loaded from using the `mockResponsePath` test environment option.');
  } else {
    const { rootDir, testEnvironmentOptions: { mockResponsePath, isPortAgnostic } } = config;

    return { mockResponsePath, isPortAgnostic, rootDir, isMock: Boolean(MOCK) };
  }
};

module.exports = {
  getMocks,
  getResponsesPath,
  shouldSaveResponses,
  validateConfig
};
