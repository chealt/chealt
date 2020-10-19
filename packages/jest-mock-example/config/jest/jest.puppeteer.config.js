module.exports = {
  rootDir: '../../',
  preset: '@chealt/jest-puppeteer-mock-preset',
  verbose: !process.env.CI,
  testEnvironmentOptions: {
    isHostAgnostic: true,
    mockResponsePath: 'mocks/responses.json',
    shouldUseMocks: Boolean(process.env.MOCK),
    collectCoverage: true,
    coverageDirectory: 'coverage',
    recordCoverageText: false,
    // eslint-disable-next-line no-useless-escape
    collectCoverageFrom: ['https:\/\/www\.google\.com']
  },
  testMatch: ['**/*.ui-test.js'],
  testTimeout: 1000 * 60
};
