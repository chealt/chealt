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

const getMocks = (responsesPath) => {
  let mocks;

  try {
    mocks = require(responsesPath);
  } catch {
    // if there are no mocks we don't do anything
  }

  return mocks;
};

const getFullPath = (...paths) => path.join(...paths);

const hasResponses = (responses) => Object.keys(responses).length;

module.exports = {
  filterEmptyResponses,
  getMocks,
  getFullPath,
  hasResponses
};
