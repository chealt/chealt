module.exports = {
  rootDir: '../../',
  preset: '@chealt/jest-puppeteer-env-preset',
  verbose: !process.env.CI,
  testEnvironmentOptions: {
    isHostAgnostic: true,
    mockResponseDir: 'mocks',
    shouldUseMocks: Boolean(process.env.MOCK),
    collectCoverage: true,
    coverageDirectory: 'coverage',
    printCoverageSummary: true,
    recordCoverageText: false,
    // eslint-disable-next-line no-useless-escape
    collectCoverageFrom: ['https://www.google.com'],
    recordScreenshots: true,
    screenshotDirectory: 'screenshots',
    requestPathIgnorePatterns: ['async'],
    collectPerfMetrics: true,
    perfMetricsDirectory: 'performance'
  },
  testMatch: ['**/*.ui-test.js'],
  testTimeout: 1000 * 60
};
