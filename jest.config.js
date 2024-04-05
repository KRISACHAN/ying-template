// 引入path模块
const path = require('path')
// 引入tsconfig.json文件
const tsconfig = require('./tsconfig.json')
// 使用tsconfig-paths-jest模块处理tsconfig.json文件
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)
// 可以查看这个链接了解更多: https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
// 定义jest配置对象
const jestConfig = {
    // 设置项目的根目录
    rootDir: path.join(__dirname, ''),
    // 设置测试文件的根目录
    roots: ['<rootDir>/tests'],
    // 设置全局变量
    globals: {},
    // 设置模块文件扩展名
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    // 设置模块名映射
    moduleNameMapper: {
        // 设置各种文件的mock
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileMock.js',
        // 设置css文件的mock
        '\\.css$': 'identity-obj-proxy',
        // 设置tsconfig.json中的路径别名
        ...moduleNameMapper,
    },
    // 设置覆盖率报告的输出目录
    coverageDirectory: 'coverage',
    // 设置覆盖率报告的格式
    coverageReporters: ['lcov'],
    // 设置测试路径的忽略模式
    testPathIgnorePatterns: ['/node_modules/'],
    // 设置覆盖率报告的忽略模式
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/config/',
        '/view/',
    ],
    // 设置覆盖率报告的格式
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover',
        'html',
        'text-summary',
    ],
    // 设置文件的转换器
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    // 设置测试文件的匹配模式
    testMatch: [
        '<rootDir>/tests/*.(ts|tsx|js|jsx)',
        '<rootDir>/tests/**/*.(ts|tsx|js|jsx)',
    ],
    // 设置是否收集覆盖率信息
    collectCoverage: true,
}
// 导出jest配置对象
module.exports = jestConfig
