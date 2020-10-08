const path = require('path');

const getMocks = (responsesPath) => require(responsesPath);

const getResponsesPath = (rootDir, mockResponsePath) => path.join(rootDir, mockResponsePath);

const hasResponses = (responses) => Object.keys(responses).length;

const validateConfig = (config) => {
  if (!config.rootDir) {
    throw new Error('You need to specify the `rootDir` in your jest config!');
  } else if (!config.testEnvironmentOptions) {
    throw new Error('You need to specify the `testEnvironmentOptions` in your jest config!');
  } else if (!config.testEnvironmentOptions.mockResponsePath) {
    throw new Error('Please specify where the mocks should be saved to and loaded from using the `mockResponsePath` test environment option.');
  } else {
    const { rootDir, testEnvironmentOptions: { mockResponsePath, isPortAgnostic, shouldUseMocks } } = config;

    return { mockResponsePath, isPortAgnostic, rootDir, shouldUseMocks };
  }
};

module.exports = {
  getMocks,
  getResponsesPath,
  hasResponses,
  validateConfig
};
