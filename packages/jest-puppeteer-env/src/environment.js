const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');

const accessibilityUtils = require('./accessibility');
const { readConfig, getPuppeteer, validateConfig } = require('./configUtils');
const { filterEmptyResponses, getMocks, getFullPath, hasResponses } = require('./envUtils');
const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const {
  addCodeCoverages,
  addTestResponses,
  saveResponses,
  setResponsesPath,
  setCoveragesPath,
  setConfig,
  setLogger,
  clearResponses,
  setPerformancePath,
  savePerformanceMetrics,
  setBundleSizeViolationsPath,
  saveBundleSizeViolations,
  saveA11YResults
} = require('./state');
const {
  isTestStartEvent,
  isTestEndEvent,
  isTestFailureEvent,
  isTestsEndEvent,
  getTestID
} = require('./testEventUtils');
const path = require('path');

const handleError = (error) => {
  process.emit('uncaughtException', error);
};

const KEYS = {
  CONTROL_C: '\u0003',
  CONTROL_D: '\u0004',
  ENTER: '\r'
};

const { DEBUG } = process.env;

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);

    const cleanConfig = validateConfig(config);
    const {
      rootDir,
      performance,
      mockResponseDir,
      recordRequests,
      screenshotDirectory,
      shouldUseMocks
    } = cleanConfig;

    if (recordRequests || shouldUseMocks) {
      const relativeTestPath = `${context.testPath.replace(rootDir, '')}.mocks.json`;
      const responsesPath = getFullPath(rootDir, mockResponseDir, relativeTestPath);
      setResponsesPath(responsesPath);
      clearResponses();

      this.mocks = shouldUseMocks && getMocks(responsesPath);
      this.globalMocks =
        shouldUseMocks && getMocks(getFullPath(rootDir, mockResponseDir, 'global.mocks.json'));
    }

    if (performance?.collectCoverage) {
      const coverageFullPath = getFullPath(
        rootDir,
        path.join(performance.coverageDirectory, '/coverage.json')
      );
      setCoveragesPath(coverageFullPath);
      this.coverageFullPath = coverageFullPath;
    }

    if (performance?.collectPerfMetrics) {
      const relativePerfPath = `${context.testPath.replace(rootDir, '')}.perfMetrics.json`;
      const performancePath = getFullPath(rootDir, performance.reportDirectory, relativePerfPath);
      setPerformancePath(performancePath);
    }

    if (performance?.bundleSizes) {
      const relativeBundleSizePath = `${context.testPath.replace(
        rootDir,
        ''
      )}.bundleSizeViolations.json`;
      const bundleSizeViolationsPath = getFullPath(
        rootDir,
        performance.reportDirectory,
        relativeBundleSizePath
      );
      setBundleSizeViolationsPath(bundleSizeViolationsPath);
    }

    const screenshotFullPath = getFullPath(rootDir, screenshotDirectory);
    this.screenshotFullPath = screenshotFullPath;

    setConfig(cleanConfig);
    this.config = cleanConfig;
    this.testPath = context.testPath;
  }
  // Jest is not available here, so we have to reverse engineer
  // the setTimeout function, see https://github.com/facebook/jest/blob/v23.1.0/packages/jest-runtime/src/index.js#L823
  setTimeout(timeout) {
    if (this.global.jasmine) {
      this.global.jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    } else {
      this.global[Symbol.for('TEST_TIMEOUT_SYMBOL')] = timeout;
    }
  }

  async setup({ logger = getLogger(DEBUG ? logLevels.debug : logLevels.default) } = {}) {
    const config = await readConfig();
    const puppeteer = getPuppeteer(config);
    this.global.puppeteerConfig = config;

    const wsEndpoint = process.env.PUPPETEER_WS_ENDPOINT;

    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    this.global.jestPuppeteer = {
      debug: async () => {
        // eslint-disable-next-line no-eval
        // Set timeout to 4 days
        this.setTimeout(345600000);
        // Run a debugger (in case Puppeteer has been launched with `{ devtools: true }`)
        await this.global.page.evaluate(() => {
          // eslint-disable-next-line no-debugger
          debugger;
        });
        // eslint-disable-next-line no-console
        console.log(chalk.blue('\n\n🕵️‍  Code is paused, press enter to resume'));

        // Run an infinite promise
        return new Promise((resolve) => {
          const { stdin } = process;
          const listening = stdin.listenerCount('data') > 0;
          const onKeyPress = (key) => {
            if (key === KEYS.CONTROL_C || key === KEYS.CONTROL_D || key === KEYS.ENTER) {
              stdin.removeListener('data', onKeyPress);

              if (!listening) {
                if (stdin.isTTY) {
                  stdin.setRawMode(false);
                }

                stdin.pause();
              }

              resolve();
            }
          };

          if (!listening) {
            if (stdin.isTTY) {
              stdin.setRawMode(true);
            }

            stdin.resume();
            stdin.setEncoding('utf8');
          }

          stdin.on('data', onKeyPress);
        });
      },
      resetPage: async () => {
        if (this.global.page) {
          this.global.page.removeListener('pageerror', handleError);
          await this.global.page.close();
        }

        this.global.page = await this.global.context.newPage();

        if (config && config.exitOnPageError) {
          this.global.page.addListener('pageerror', handleError);
        }
      },
      resetBrowser: async () => {
        if (this.global.page) {
          this.global.page.removeListener('pageerror', handleError);
        }

        if (config.browserContext === 'incognito' && this.global.context) {
          await this.global.context.close();
        } else if (this.global.page) {
          await this.global.page.close();
        }

        this.global.page = null;

        if (this.global.browser) {
          await this.global.browser.disconnect();
        }

        this.global.browser = await puppeteer.connect({
          ...config.connect,
          ...config.launch,
          browserURL: undefined,
          browserWSEndpoint: wsEndpoint
        });

        if (config.browserContext === 'incognito') {
          // Using this, pages will be created in a pristine context.
          this.global.context = await this.global.browser.createIncognitoBrowserContext();
        } else if (config.browserContext === 'default' || !config.browserContext) {
          /**
           * Since this is a new browser, browserContexts() will return only one instance
           * https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browserbrowsercontexts
           */
          this.global.context = await this.global.browser.browserContexts()[0];
        } else {
          throw new Error(
            `browserContext should be either 'incognito' or 'default'. Received '${config.browserContext}'`
          );
        }

        await this.global.jestPuppeteer.resetPage();
      }
    };

    await this.global.jestPuppeteer.resetBrowser();

    // Your setup
    logger.debug(`Setting up environment with config: ${JSON.stringify(this.config, null, 4)}`);

    const {
      isHostAgnostic,
      isPortAgnostic,
      performance,
      recordRequests,
      requestPathIgnorePatterns,
      requestPathSwallowPatterns
    } = this.config;

    if (performance?.collectCoverage) {
      logger.debug(`Will collect coverage information in: ${this.coverageFullPath}`);
    }

    setLogger(logger);

    this.logger = logger;
    this.envInstance = await factory({
      page: this.global.page,
      mocks: this.mocks,
      globalMocks: this.globalMocks,
      logger,
      config: {
        isPortAgnostic,
        isHostAgnostic,
        performance,
        recordRequests,
        requestPathIgnorePatterns,
        requestPathSwallowPatterns
      }
    });
  }

  async handleTestEvent(event) {
    if (isTestStartEvent(event)) {
      await this.handleStartEvent(event);
    } else if (isTestsEndEvent(event)) {
      await this.handleTestsEndEvent();
    } else if (isTestEndEvent(event)) {
      await this.handleTestEndEvent();
    } else if (isTestFailureEvent(event)) {
      await this.handleTestFailEvent();
    }
  }

  async handleStartEvent(event) {
    const { performance, recordScreenshots } = this.config;

    const testID = getTestID(event.test);
    this.envInstance.setTestName(testID);
    this.testID = testID;

    if (performance?.collectCoverage) {
      this.envInstance.startCollectingCoverage();
    }

    await this.envInstance.startInterception();

    if (recordScreenshots) {
      await this.envInstance.startRecording();
    }
  }

  async handleTestsEndEvent() {
    const { performance, recordRequests } = this.config;

    if (recordRequests) {
      this.addTestResponses();
    }

    if (performance?.collectCoverage) {
      await this.addCodeCoverages();
    }
  }

  // eslint-disable-next-line complexity
  async handleTestEndEvent() {
    const failures = [];
    const { performance, recordScreenshots, rootDir, accessibility } = this.config;

    await this.envInstance.stopInterception();

    if (performance?.collectCoverage) {
      await this.envInstance.stopCollectingCoverage();
    }

    if (performance?.collectPerfMetrics) {
      await savePerformanceMetrics(await this.envInstance.getMetrics());
    }

    if (performance?.bundleSizes) {
      const violations = this.envInstance.getBundleSizeViolations();

      if (violations?.length) {
        if (performance?.failOnBundleSizeViolation) {
          failures.push('Found bundle size violations, check the report for more information.');
        }

        await saveBundleSizeViolations(violations);
      }
    }

    if (recordScreenshots) {
      await this.envInstance.stopRecording(this.screenshotFullPath);
    }

    if (accessibility?.shouldCheck) {
      const { analyze, checkViolations } = accessibilityUtils;
      const relativeA11YPath = `${this.testPath.replace(rootDir, '')}.a11y.json`;
      const a11yPath = getFullPath(rootDir, accessibility.reportDirectory, relativeA11YPath);
      const results = await analyze(this.global.page);

      await saveA11YResults(a11yPath, results);

      if (accessibility.failLevel) {
        const failingViolations = checkViolations({
          violations: results.violations,
          failLevel: accessibility.failLevel
        });

        if (failingViolations.length) {
          failures.push('Found a11y violations, check the report for more information.');
        }
      }
    }

    if (failures.length) {
      failures.forEach((failure) => this.logger.error(failure));
      throw new Error(`Failing test: ${this.testID}`);
    }
  }

  handleTestFailEvent() {
    return this.envInstance.takeScreenshot(this.screenshotFullPath);
  }

  addTestResponses() {
    const responses = this.envInstance.getResponses();
    const nonEmptyResponses = filterEmptyResponses(responses);

    if (!this.config.shouldUseMocks && hasResponses(nonEmptyResponses)) {
      addTestResponses(nonEmptyResponses);
      saveResponses();
    }
  }

  async addCodeCoverages() {
    const coverages = await this.envInstance.getCodeCoverages();

    addCodeCoverages(coverages);
  }

  async teardown() {
    const { page, context, browser, puppeteerConfig } = this.global;

    if (page) {
      page.removeListener('pageerror', handleError);
    }

    if (puppeteerConfig.browserContext === 'incognito') {
      if (context) {
        await context.close();
      }
    } else if (page) {
      await page.close();
    }

    if (browser) {
      await browser.disconnect();
    }
  }
}

module.exports = PuppeteerEnvironment;
