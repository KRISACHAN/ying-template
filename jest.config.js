const path = require('path')
const jestConfig = {
    rootDir: path.join(__dirname, ''),
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx'
    ],
    testMatch: [
        '**/tests/**/?(*.)(spec).(js|ts|jsx|tsx)'
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
        '^.+\\.(tsx|ts)?$': 'ts-jest'
    }
}
module.exports = jestConfig