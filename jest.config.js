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
        'node_modules/',
        'dist/',
        'config/',
        'view/'
    ],
    coverageReporters: [
        'html',
        'text-summary'
    ],
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    testMatch: [
        "<rootDir>/tests/**/__tests__/**/*.[jt]s?(x)",
        "<rootDir>/tests/**/*(*.)@(spec|test).[tj]s?(x)"
    ],
    collectCoverage: true
}
module.exports = jestConfig