const { AxePuppeteer } = require('@axe-core/puppeteer');

const accessibility = (page) => new AxePuppeteer(page).analyze();

module.exports = accessibility;
