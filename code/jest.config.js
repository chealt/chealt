module.exports = {
    collectCoverageFrom: [
        'src/**',
    ],
    coveragePathIgnorePatterns: [
        '/node-modules/'
    ],
    coverageDirectory: '../coverage',
    transformIgnorePatterns: [
        'node_modules/'
    ]
};
