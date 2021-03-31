const path = require('path')
const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)
const jestConfig = {
    rootDir: path.join(__dirname, ''),
    roots: ['<rootDir>/tests'],
    globals: {},
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileMock.js',
        '\\.css$': 'identity-obj-proxy',
        ...moduleNameMapper,
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov'],
    testPathIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/config/',
        '/view/',
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
