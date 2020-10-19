const fs = require('fs');
const { promisify } = require('util');
const coverageUtils = require('./coverage/utils');

const writeFile = promisify(fs.writeFile);

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
