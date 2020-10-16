const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

let allResponses = {};
let allCodeCoverages = {};

const state = () => {
  // RESPONSES
  let responsesPath;
  const saveResponsesFile = (responses) =>
    writeFile(responsesPath, JSON.stringify(responses));
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

  // COVERAGES
  let coveragesPath;
  const saveCoveragesFile = (coverages) =>
    writeFile(coveragesPath, JSON.stringify(coverages));
  const setCoveragesPath = (path) => {
    coveragesPath = path;
  };
  const addCodeCoverages = (coverages) => {
    allCodeCoverages = {
      ...allCodeCoverages,
      ...coverages
    };
  };
  const getCoverages = () => allCodeCoverages;
  const saveCoverages = async () => {
    await saveCoveragesFile(allCodeCoverages);
  };

  return {
    // RESPONSES
    addTestResponses,
    getResponses,
    saveResponses,
    setResponsesPath,
    // COVERAGES
    addCodeCoverages,
    getCoverages,
    saveCoverages,
    setCoveragesPath
  };
};

module.exports = state();
