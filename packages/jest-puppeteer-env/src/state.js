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
  const saveCoveragesFile = (coverages) => writeFileSafe(coveragesPath, JSON.stringify(coverages));
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
    if (config.performance?.printCoverageSummary) {
      coverageUtils.printCoverages({ logger, coverages: allCodeCoverages });
    }
  };

  // PERFORMANCE
  let metricsPath;
  const setPerformancePath = (newPath) => {
    metricsPath = newPath;
  };
  const savePerformanceMetrics = async (metrics) => {
    await writeFileSafe(metricsPath, JSON.stringify(metrics));
  };

  // A11Y
  const saveA11YResults = async (a11yPath, findings) => {
    await writeFileSafe(a11yPath, JSON.stringify(findings));
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
    setCoveragesPath,
    // PERFORMANCE
    savePerformanceMetrics,
    setPerformancePath,
    // A11Y
    saveA11YResults
  };
};

module.exports = state();
