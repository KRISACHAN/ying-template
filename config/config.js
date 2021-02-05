const path = require('path')
const dotenv = require('dotenv')
const project = process.cwd()
const resolve = dir => path.join(__dirname, '..', dir) // 获取文件夹
dotenv.config() // 添加环境变量

const corePath = {
    src: resolve('src'),
    views: resolve('views'),
    dist: resolve('dist'),
}

const assetsPath = {
    nodeModules: resolve('node_modules'),
    static: resolve('static'),
    tests: resolve('tests'),
}

const config = {
    project, // 项目目录
    config: path.resolve(__dirname, '../'), // 配置文件目录
    dev: {
        // 开发环境配置
        alias: {
            // 路径重定向
            '@': corePath.src,
            src: corePath.src,
            tests: assetsPath.tests,
            static: assetsPath.static,
        },
        include: [
            // 处理的文件夹
            corePath.src,
            assetsPath.tests,
            assetsPath.static,
        ],
        exclude: [
            // 不处理的文件夹
            assetsPath.nodeModules,
        ],
    },
    pro: {
        // 生产环境配置
        exclude: [
            // 不处理的文件夹
            assetsPath.nodeModules,
            assetsPath.static,
        ],
    },
    src: corePath.src, // 源文件目录
    build: corePath.dist, // 打包目录
    views: corePath.views, // html文件目录
    node_modules: corePath.nodeModules, // node_modules目录
    static: corePath.static, // 静态资源文件夹
}
module.exports = config
