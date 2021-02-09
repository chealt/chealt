const path = require('path');
const PuppeteerEnvironment = require('@chealt/jest-puppeteer-env');

const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const { addCodeCoverages, addTestResponses, saveResponses, setResponsesPath, setCoveragesPath, setConfig, setLogger, clearResponses } = require('./state');
const { isTestStartEvent, isTestEndEvent, isTestFailureEvent, isTestsEndEvent, getTestID } = require('./testEventUtils');
const { filterEmptyResponses, getMocks, getFullPath, hasResponses, validateConfig } = require('./envUtils');

const { DEBUG } = process.env;

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config, context) {
    super(config, context);

    const cleanConfig = validateConfig(config);
    const {
      rootDir,
      collectCoverage,
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

    setConfig(cleanConfig);
    this.config = cleanConfig;
    this.mocks = shouldUseMocks && getMocks(responsesPath);
  }

  async setup({
    logger = getLogger(DEBUG ? logLevels.debug : logLevels.default)
  } = {}) {
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
    const { collectCoverage, recordScreenshots } = this.config;

    if (isTestStartEvent(event)) {
      const testID = getTestID(event.test);
      this.envInstance.setTestName(testID);

      if (collectCoverage) {
        this.envInstance.startCollectingCoverage();
      }

      await this.envInstance.startInterception();

      if (recordScreenshots) {
        await this.envInstance.startRecording();
      }
    } else if (isTestsEndEvent(event)) {
      this.addTestResponses();

      if (collectCoverage) {
        await this.addCodeCoverages();
      }
    } else if (isTestEndEvent(event)) {
      await this.envInstance.stopInterception();

      if (collectCoverage) {
        await this.envInstance.stopCollectingCoverage();
      }

      if (recordScreenshots) {
        await this.envInstance.stopRecording(this.screenshotFullPath);
      }
    } else if (isTestFailureEvent(event)) {
      await this.envInstance.takeScreenshot(this.screenshotFullPath);
    }
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
