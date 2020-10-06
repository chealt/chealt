const PuppeteerEnvironment = require("jest-environment-puppeteer");
const path = require("path");

const factory = require("./factory");
const { getLogger, logLevels } = require("./logger");
const { addTestResponses, setResponsesPath } = require("./state");

const { MOCK, DEBUG } = process.env;

const isTestStartEvent = (event) => event.name === "test_fn_start";
const isTestsEndEvent = (event) => event.name === "teardown";
const getTestID = (event) => {
  let id = event.name;

  if (event.parent && event.parent.name !== "ROOT_DESCRIBE_BLOCK") {
    const parentID = getTestID(event.parent); // eslint-disable-line no-unused-vars
    id = `${parentID}/${id}`;
  }

  return id;
};

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config) {
    super(config);

    const responsesPath = path.join(
      config.rootDir,
      config.testEnvironmentOptions.mockResponsePath
    );
    setResponsesPath(responsesPath);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    this.mocks = MOCK && require(responsesPath);
  }

  static shouldSaveResponses(responses) {
    return !MOCK && Object.keys(responses).length;
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
      logger
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
