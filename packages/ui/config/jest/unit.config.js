module.exports = {
    clearMocks: true,
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/config/jest/style-mock.js'
    },
    rootDir: '../../',
    setupTestFrameworkScriptFile: 'jest-enzyme',
    testEnvironment: 'enzyme',
    testMatch: ['**/?(*.)+(spec).js?(x)'],
    verbose: true
};
