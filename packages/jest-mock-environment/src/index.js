const PuppeteerEnvironment = require('jest-environment-puppeteer');

const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const { addCodeCoverages, addTestResponses, setResponsesPath, setCoveragesPath } = require('./state');
const { isTestStartEvent, isTestEndEvent, isTestsEndEvent, getTestID } = require('./testEventUtils');
const { filterEmptyResponses, getMocks, getFullPath, hasResponses, validateConfig } = require('./envUtils');

const { DEBUG } = process.env;

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config) {
    super(config);

    const {
      mockResponsePath,
      isHostAgnostic,
      isPortAgnostic,
      rootDir,
      shouldUseMocks,
      coveragePath
    } = validateConfig(config);
    const responsesPath = getFullPath(rootDir, mockResponsePath);
    setResponsesPath(responsesPath);

    if (coveragePath) {
      const coverageFullPath = getFullPath(rootDir, coveragePath);
      setCoveragesPath(coverageFullPath);
      this.shouldCollectCoverage = true;
    }

    this.config = config;
    this.shouldUseMocks = shouldUseMocks;
    this.mocks = shouldUseMocks && getMocks(responsesPath);
    this.isHostAgnostic = isHostAgnostic;
    this.isPortAgnostic = isPortAgnostic;
  }

  async setup({
    logger = getLogger(DEBUG ? logLevels.debug : logLevels.default)
  } = {}) {
    await super.setup();
    // Your setup
    logger.debug(`Setting up environemnt with config: ${JSON.stringify(this.config, null, 4)}`);
    this.logger = logger;
    this.envInstance = await factory({
      page: this.global.page,
      mocks: this.mocks,
      logger,
      config: { isPortAgnostic: this.isPortAgnostic, isHostAgnostic: this.isHostAgnostic }
    });
  }

  async handleTestEvent(event) {
    if (isTestStartEvent(event)) {
      const testID = getTestID(event.test);
      this.envInstance.setTestName(testID);

      if (this.shouldCollectCoverage) {
        await this.envInstance.startCollectingCoverage();
      }

      await this.envInstance.startInterception();
    } else if (isTestsEndEvent(event)) {
      this.addTestResponses();

      if (this.shouldCollectCoverage) {
        await this.addCodeCoverages();
      }
    } else if (isTestEndEvent(event)) {
      if (this.shouldCollectCoverage) {
        await this.envInstance.stopCollectingCoverage();
      }
    }
  }

  addTestResponses() {
    const responses = this.envInstance.getResponses();
    const nonEmptyResponses = filterEmptyResponses(responses);

    if (!this.shouldUseMocks && hasResponses(nonEmptyResponses)) {
      addTestResponses(nonEmptyResponses);
    }
  }

  async addCodeCoverages() {
    const coverages = await this.envInstance.getCodeCoverages();

    addCodeCoverages(coverages);
  }
}

module.exports = MockEnvironment;
