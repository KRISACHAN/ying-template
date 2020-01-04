const path = require('path')
const jestConfig = {
    rootDir: path.join(__dirname, ''),
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node'
    ],
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/config/',
        '/view/'
    ],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover',
        'html',
        'text-summary'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
        '<rootDir>/tests/*.(ts|tsx|js|jsx)',
        '<rootDir>/tests/**/*.(ts|tsx|js|jsx)'
    ],
    collectCoverage: true
}
module.exports = jestConfig