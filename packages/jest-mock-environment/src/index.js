const path = require('path');
const PuppeteerEnvironment = require('jest-environment-puppeteer');

const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const { addCodeCoverages, addTestResponses, setResponsesPath, setCoveragesPath, setConfig, setLogger } = require('./state');
const { isTestStartEvent, isTestEndEvent, isTestsEndEvent, getTestID } = require('./testEventUtils');
const { filterEmptyResponses, getMocks, getFullPath, hasResponses, validateConfig } = require('./envUtils');

const { DEBUG } = process.env;

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config) {
    super(config);

    const cleanConfig = validateConfig(config);
    const { rootDir, collectCoverage, coverageDirectory, mockResponsePath, shouldUseMocks } = cleanConfig;
    const responsesPath = getFullPath(rootDir, mockResponsePath);
    setResponsesPath(responsesPath);

    if (collectCoverage) {
      const coverageFullPath = getFullPath(rootDir, path.join(coverageDirectory, '/coverage.json'));
      setCoveragesPath(coverageFullPath);
      this.coverageFullPath = coverageFullPath;
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
      recordCoverageText
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
        recordCoverageText
      }
    });
  }

  async handleTestEvent(event) {
    const { collectCoverage } = this.config;

    if (isTestStartEvent(event)) {
      const testID = getTestID(event.test);
      this.envInstance.setTestName(testID);

      if (collectCoverage) {
        this.envInstance.startCollectingCoverage();
      }

      await this.envInstance.startInterception();
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
    }
  }

  addTestResponses() {
    const responses = this.envInstance.getResponses();
    const nonEmptyResponses = filterEmptyResponses(responses);

    if (!this.config.shouldUseMocks && hasResponses(nonEmptyResponses)) {
      addTestResponses(nonEmptyResponses);
    }
  }

  async addCodeCoverages() {
    const coverages = await this.envInstance.getCodeCoverages();

    addCodeCoverages(coverages);
  }
}

module.exports = MockEnvironment;
