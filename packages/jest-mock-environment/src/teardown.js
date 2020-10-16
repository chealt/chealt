const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

const { saveResponses, saveCoverages } = require('./state');

const { MOCK } = process.env;

const globalTeardown = async (globalConfig) => {
  if (!MOCK) {
    await saveResponses();
  }

  await saveCoverages();

  // Your global teardown
  await teardownPuppeteer(globalConfig);
};

module.exports = globalTeardown;
