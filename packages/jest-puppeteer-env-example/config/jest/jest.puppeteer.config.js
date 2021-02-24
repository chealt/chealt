module.exports = {
  rootDir: '../../',
  preset: '@chealt/jest-puppeteer-env/preset',
  verbose: !process.env.CI,
  testEnvironmentOptions: {
    accessibility: {
      shouldCheck: true,
      // failLevel: 'critical',
      reportDirectory: 'accessibility'
    },
    collectCoverage: true,
    collectCoverageFrom: ['https://www.google.com'],
    collectPerfMetrics: true,
    coverageDirectory: 'coverage',
    isHostAgnostic: true,
    mockResponseDir: 'mocks',
    perfMetricsDirectory: 'performance',
    printCoverageSummary: true,
    recordCoverageText: false,
    recordRequests: Boolean(process.env.RECORD_REQUESTS),
    recordScreenshots: true,
    requestPathIgnorePatterns: ['async'],
    screenshotDirectory: 'screenshots',
    shouldUseMocks: Boolean(process.env.MOCK)
  },
  testMatch: ['**/*.ui-test.js'],
  testTimeout: 1000 * 60
};
