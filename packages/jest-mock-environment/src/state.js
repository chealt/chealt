const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

let allResponses = {};

const state = () => {
  let responsesPath;
  const saveResponsesFile = (responses) =>
    writeFile(responsesPath, JSON.stringify(responses, '', 4));
  const setResponsesPath = (path) => {
    responsesPath = path;
  };
  const addTestResponses = (responses) => {
    allResponses = {
      ...allResponses,
      ...responses
    };
  };
  const getResponses = () => allResponses;
  const saveResponses = async () => {
    await saveResponsesFile(allResponses);
  };

  return {
    addTestResponses,
    getResponses,
    saveResponses,
    setResponsesPath
  };
};

module.exports = state();
