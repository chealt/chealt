const { setup: setupPuppeteer } = require('@chealt/jest-puppeteer-env');

const globalSetup = async (globalConfig) => {
  await setupPuppeteer(globalConfig);
  // Your global setup
};

module.exports = globalSetup;
