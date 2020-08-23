const path = require('path')
const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)
const jestConfig = {
    rootDir: path.join(__dirname, ''),
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    moduleNameMapper: {
        ...moduleNameMapper,
        '\\.(scss|less|css)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/config/',
        '/view/',
        '/src/',
    ],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover',
        'html',
        'text-summary',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '<rootDir>/tests/*.(ts|tsx|js|jsx)',
        '<rootDir>/tests/**/*.(ts|tsx|js|jsx)',
    ],
    collectCoverage: true,
}
module.exports = jestConfig
