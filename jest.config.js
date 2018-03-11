module.exports = {
    collectCoverageFrom: [
        'src/**',
    ],
    coveragePathIgnorePatterns: [
        '/node-modules/'
    ],
    coverageReporters: [
        "lcov"
    ],
    coverageDirectory: 'coverage',
    transformIgnorePatterns: [
        'node_modules/'
    ]
};
