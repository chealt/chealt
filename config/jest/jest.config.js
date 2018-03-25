module.exports = {
    rootDir: '../../',
    collectCoverageFrom: [
        'src/**',
    ],
    setupTestFrameworkScriptFile: '<rootDir>/config/jest/jest.setup.js',
    coveragePathIgnorePatterns: [
        '/node-modules/'
    ],
    coverageReporters: [
        "lcov",
        "text"
    ],
    coverageDirectory: 'coverage',
    transformIgnorePatterns: [
        'node_modules/'
    ]
};
