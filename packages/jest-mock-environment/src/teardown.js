const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

const { saveResponses } = require('./state');

const { MOCK } = process.env;

const globalTeardown = async (globalConfig) => {
  if (!MOCK) {
    await saveResponses();
  }

  // Your global teardown
  await teardownPuppeteer(globalConfig);
};

module.exports = globalTeardown;
