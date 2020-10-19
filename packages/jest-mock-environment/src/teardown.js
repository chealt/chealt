const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

const { saveResponses, saveCoverages, printCoverages } = require('./state');

const { MOCK } = process.env;

const globalTeardown = async (globalConfig) => {
  if (!MOCK) {
    await saveResponses();
  }

  await saveCoverages();
  printCoverages();

  // Your global teardown
  await teardownPuppeteer(globalConfig);
};

module.exports = globalTeardown;
