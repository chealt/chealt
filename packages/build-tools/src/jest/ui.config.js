module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js'],
    preset: 'jest-puppeteer',
    rootDir: '../../',
    setupTestFrameworkScriptFile: '<rootDir>/config/jest/ui.setup.js',
    testMatch: ['**/*.ui-spec.js']
};
