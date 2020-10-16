const path = require('path');

const filterEmptyResponses = (responses) => {
  const filteredResponses = {};

  Object.keys(responses).forEach((testId) => {
    Object.keys(responses[testId]).forEach((url) => {
      if (responses[testId][url].length) {
        if (!filteredResponses[testId]) {
          filteredResponses[testId] = {};
        }

        filteredResponses[testId][url] = responses[testId][url];
      }
    });
  });

  return filteredResponses;
};

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
    const {
      rootDir,
      testEnvironmentOptions: {
        mockResponsePath,
        isHostAgnostic,
        isPortAgnostic,
        shouldUseMocks
      }
    } = config;

    return { mockResponsePath, isHostAgnostic, isPortAgnostic, rootDir, shouldUseMocks };
  }
};

module.exports = {
  filterEmptyResponses,
  getMocks,
  getResponsesPath,
  hasResponses,
  validateConfig
};
