const { setup: setupServer, teardown: teardownServer } = require('jest-dev-server');
const { readConfig, getPuppeteer } = require('./configUtils');
const { saveCoverages, printCoverages } = require('./state');

let browser;

let didAlreadyRunInWatchMode = false;

const setup = async (jestConfig = {}) => {
  const config = await readConfig();
  const puppeteer = getPuppeteer(config);

  if (config.connect) {
    browser = await puppeteer.connect(config.connect);
  } else {
    browser = await puppeteer.launch(config.launch);
  }

  process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();

  // If we are in watch mode, - only setupServer() once.
  if (jestConfig.watch || jestConfig.watchAll) {
    if (didAlreadyRunInWatchMode) {
      return;
    }

    didAlreadyRunInWatchMode = true;
  }

  if (config.server) {
    await setupServer(config.server);
  }
};

const teardown = async (jestConfig = {}) => {
  await saveCoverages();
  printCoverages();

  const config = await readConfig();

  if (config.connect) {
    await browser.disconnect();
  } else {
    await browser.close();
  }

  if (!jestConfig.watch && !jestConfig.watchAll) {
    await teardownServer();
  }
};

module.exports = {
  setup,
  teardown
};
