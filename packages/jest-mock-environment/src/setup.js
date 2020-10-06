const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

const globalSetup = async (globalConfig) => {
  await setupPuppeteer(globalConfig);
  // Your global setup
};

module.exports = globalSetup;
