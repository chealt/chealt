const path = require('path');
const PuppeteerEnvironment = require('@chealt/jest-puppeteer-env');

const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const {
  addCodeCoverages,
  addTestResponses,
  saveResponses,
  setResponsesPath,
  setCoveragesPath,
  setConfig,
  setLogger,
  clearResponses,
  setPerformancePath,
  savePerformanceMetrics
} = require('./state');
const {
  isTestStartEvent,
  isTestEndEvent,
  isTestFailureEvent,
  isTestsEndEvent,
  getTestID
} = require('./testEventUtils');
const { filterEmptyResponses, getMocks, getFullPath, hasResponses, validateConfig } = require('./envUtils');

const { DEBUG } = process.env;

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config, context) {
    super(config, context);

    const cleanConfig = validateConfig(config);
    const {
      rootDir,
      collectCoverage,
      collectPerfMetrics,
      perfMetricsDirectory,
      coverageDirectory,
      mockResponseDir,
      recordScreenshots,
      screenshotDirectory,
      shouldUseMocks
    } = cleanConfig;
    const relativeTestPath = `${context.testPath.replace(rootDir, '')}.mocks.json`;
    const responsesPath = getFullPath(rootDir, mockResponseDir, relativeTestPath);
    setResponsesPath(responsesPath);
    clearResponses();

    if (collectCoverage) {
      const coverageFullPath = getFullPath(rootDir, path.join(coverageDirectory, '/coverage.json'));
      setCoveragesPath(coverageFullPath);
      this.coverageFullPath = coverageFullPath;
    }

    if (recordScreenshots) {
      const screenshotFullPath = getFullPath(rootDir, screenshotDirectory);
      this.screenshotFullPath = screenshotFullPath;
    }

    if (collectPerfMetrics) {
      const relativePerfPath = `${context.testPath.replace(rootDir, '')}.perfMetrics.json`;
      const performancePath = getFullPath(rootDir, perfMetricsDirectory, relativePerfPath);
      setPerformancePath(performancePath);
    }

    setConfig(cleanConfig);
    this.config = cleanConfig;
    this.mocks = shouldUseMocks && getMocks(responsesPath);
    this.globalMocks = shouldUseMocks && getMocks(getFullPath(rootDir, mockResponseDir, 'global.mocks.json'));
  }

  async setup({ logger = getLogger(DEBUG ? logLevels.debug : logLevels.default) } = {}) {
    await super.setup();
    // Your setup
    logger.debug(`Setting up environemnt with config: ${JSON.stringify(this.config, null, 4)}`);

    const {
      collectCoverage,
      collectCoverageFrom,
      isHostAgnostic,
      isPortAgnostic,
      printCoverageSummary,
      recordCoverageText,
      requestPathIgnorePatterns
    } = this.config;

    if (collectCoverage) {
      logger.debug(`Will collect coverage information in: ${this.coverageFullPath}`);
    }

    setLogger(logger);

    this.logger = logger;
    this.envInstance = await factory({
      page: this.global.page,
      mocks: this.mocks,
      globalMocks: this.globalMocks,
      logger,
      config: {
        isPortAgnostic,
        isHostAgnostic,
        collectCoverageFrom,
        printCoverageSummary,
        recordCoverageText,
        requestPathIgnorePatterns
      }
    });
  }

  async handleTestEvent(event) {
    if (isTestStartEvent(event)) {
      await this.handleStartEvent(event);
    } else if (isTestsEndEvent(event)) {
      await this.handleTestsEndEvent();
    } else if (isTestEndEvent(event)) {
      await this.handleTestEndEvent();
    } else if (isTestFailureEvent(event)) {
      await this.handleTestFailEvent();
    }
  }

  async handleStartEvent(event) {
    const { collectCoverage, recordScreenshots } = this.config;

    const testID = getTestID(event.test);
    this.envInstance.setTestName(testID);

    if (collectCoverage) {
      this.envInstance.startCollectingCoverage();
    }

    await this.envInstance.startInterception();

    if (recordScreenshots) {
      await this.envInstance.startRecording();
    }
  }

  async handleTestsEndEvent() {
    const { collectCoverage } = this.config;

    this.addTestResponses();

    if (collectCoverage) {
      await this.addCodeCoverages();
    }
  }

  async handleTestEndEvent() {
    const { collectCoverage, recordScreenshots, collectPerfMetrics } = this.config;

    await this.envInstance.stopInterception();

    if (collectCoverage) {
      await this.envInstance.stopCollectingCoverage();
    }

    if (recordScreenshots) {
      await this.envInstance.stopRecording(this.screenshotFullPath);
    }

    if (collectPerfMetrics) {
      await savePerformanceMetrics(await this.envInstance.getMetrics());
    }
  }

  handleTestFailEvent() {
    return this.envInstance.takeScreenshot(this.screenshotFullPath);
  }

  addTestResponses() {
    const responses = this.envInstance.getResponses();
    const nonEmptyResponses = filterEmptyResponses(responses);

    if (!this.config.shouldUseMocks && hasResponses(nonEmptyResponses)) {
      addTestResponses(nonEmptyResponses);
      saveResponses();
    }
  }

  async addCodeCoverages() {
    const coverages = await this.envInstance.getCodeCoverages();

    addCodeCoverages(coverages);
  }
}

module.exports = MockEnvironment;
