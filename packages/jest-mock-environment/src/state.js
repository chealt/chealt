const { writeFileSafe } = require('./fileUtils');
const coverageUtils = require('./coverage/utils');

let allResponses = {};
let allCodeCoverages = {};
let config = {};
let logger = {};

const state = () => {
  // CONFIG
  const setConfig = (_config) => {
    config = _config;
  };
  const setLogger = (_logger) => {
    logger = _logger;
  };
  // RESPONSES
  let responsesPath;
  const saveResponsesFile = (responses) => writeFileSafe(responsesPath, JSON.stringify(responses));
  const setResponsesPath = (newPath) => {
    responsesPath = newPath;
  };
  const addTestResponses = (responses) => {
    allResponses = {
      ...allResponses,
      ...responses
    };
  };
  const clearResponses = () => {
    allResponses = {};
  };
  const getResponses = () => allResponses;
  const saveResponses = async () => {
    await saveResponsesFile(allResponses);
  };

  // COVERAGES
  let coveragesPath;
  const saveCoveragesFile = (coverages) =>
    writeFileSafe(coveragesPath, JSON.stringify(coverages));
  const setCoveragesPath = (newPath) => {
    coveragesPath = newPath;
  };
  const addCodeCoverages = (coverages) => {
    allCodeCoverages = {
      ...allCodeCoverages,
      ...coverages
    };
  };
  const getCoverages = () => allCodeCoverages;
  const saveCoverages = async () => {
    if (coveragesPath) {
      await saveCoveragesFile(allCodeCoverages);
    }
  };
  const printCoverages = () => {
    if (config.printCoverageSummary) {
      coverageUtils.printCoverages({ logger, coverages: allCodeCoverages });
    }
  };

  return {
    setConfig,
    setLogger,
    // RESPONSES
    addTestResponses,
    clearResponses,
    getResponses,
    saveResponses,
    setResponsesPath,
    // COVERAGES
    addCodeCoverages,
    getCoverages,
    printCoverages,
    saveCoverages,
    setCoveragesPath
  };
};

module.exports = state();
