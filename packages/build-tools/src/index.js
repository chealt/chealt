module.exports = {
    webpackConfig: require('./webpack.config.js'),
    jestUnitConfig: require('./jest/unit.config.js'),
    jestPuppeteerConfig: require('./jest/puppeteer.config.js'),
    jestUIConfig: require('./jest/ui.config.js'),
    jestUISetupConfig: require('./jest/ui.setup.js')
};
