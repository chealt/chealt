const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

const { saveCoverages, printCoverages } = require('./state');

const globalTeardown = async (globalConfig) => {
  await saveCoverages();
  printCoverages();

  // Your global teardown
  await teardownPuppeteer(globalConfig);
};

module.exports = globalTeardown;
