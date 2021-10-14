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
    performance: {
      collectCoverage: true,
      collectCoverageFrom: ['https://www.google.com'],
      collectPerfMetrics: true,
      coverageDirectory: 'coverage',
      reportDirectory: 'performance',
      printCoverageSummary: true,
      recordCoverageText: false,
      bundleSizes: [
        {
          path: 'xjs/_/js',
          maxSize: '600 B'
        },
        {
          path: 'og/_/ss',
          maxSize: '10 B'
        }
      ],
      failOnBundleSizeViolation: false
    },
    isHostAgnostic: true,
    mockResponseDir: 'mocks',
    recordRequests: Boolean(process.env.RECORD_REQUESTS),
    // recordScreenshots: true,
    requestPathIgnorePatterns: ['async'],
    screenshotDirectory: 'screenshots',
    shouldUseMocks: Boolean(process.env.MOCK)
  },
  testMatch: ['**/*.ui-test.js'],
  testTimeout: 1000 * 60
};
