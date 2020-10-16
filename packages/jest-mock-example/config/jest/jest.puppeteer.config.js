module.exports = {
  rootDir: '../../',
  preset: '@chealt/jest-puppeteer-mock-preset',
  verbose: !process.env.CI,
  testEnvironmentOptions: {
    isHostAgnostic: true,
    mockResponsePath: 'mocks/responses.json',
    shouldUseMocks: Boolean(process.env.MOCK)
  },
  testMatch: ['**/*.ui-test.js'],
  testTimeout: 1000 * 60,
  setupFilesAfterEnv: ['<rootDir>/config/jest/puppeteer.setup.js']
};
