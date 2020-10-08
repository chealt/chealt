const PuppeteerEnvironment = require('jest-environment-puppeteer');
const path = require('path');

const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const { addTestResponses, setResponsesPath } = require('./state');
const { isTestStartEvent, isTestsEndEvent, getTestID } = require('./testEventUtils');

const { MOCK, DEBUG } = process.env;

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config) {
    super(config);

    MockEnvironment.validateConfig(config);
    const { testEnvironmentOptions: { mockResponsePath, isPortAgnostic } } = config;
    const responsesPath = path.join(config.rootDir, mockResponsePath);
    setResponsesPath(responsesPath);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    this.mocks = MOCK && require(responsesPath);
    this.isPortAgnostic = isPortAgnostic;
  }

  static shouldSaveResponses(responses) {
    return !MOCK && Object.keys(responses).length;
  }

  static validateConfig(config) {
    if (!config.testEnvironmentOptions) {
      throw new Error('You need to specify the `testEnvironmentOptions` in your jest config!');
    } else if (!config.testEnvironmentOptions.mockResponsePath) {
      throw new Error('Please specify where the mocks should be saved to and loaded from using the `mockResponsePath` test environment option.');
    } else {
      return true;
    }
  }

  async setup({
    logger = getLogger(DEBUG ? logLevels.debug : logLevels.default)
  } = {}) {
    await super.setup();
    // Your setup
    this.logger = logger;
    this.envInstance = await factory({
      page: this.global.page,
      mocks: this.mocks,
      logger,
      config: { isPortAgnostic: this.isPortAgnostic }
    });
  }

  async handleTestEvent(event) {
    if (isTestStartEvent(event)) {
      const testID = getTestID(event.test);
      this.envInstance.setTestName(testID);
    } else if (isTestsEndEvent(event)) {
      this.addTestResponses();
    }
  }

  addTestResponses() {
    const responses = this.envInstance.getResponses();

    if (MockEnvironment.shouldSaveResponses(responses)) {
      addTestResponses(responses);
    }
  }
}

module.exports = MockEnvironment;
