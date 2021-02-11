const path = require('path')
const dotenv = require('dotenv')
const root = process.cwd()
// 获取当前项目下的文件夹路径
const resolve = dir => path.join(__dirname, '..', dir)
// 环境变量初始化
const initEnv = () => {
    dotenv.config({
        path: resolve(`.env.${process.env.NODE_ENV || 'production'}`),
    })
}
initEnv()
// 核心的文件路径
const corePath = {
    src: resolve('src'),
    views: resolve('views'),
    dist: resolve('dist'),
}
// 资源文件路径
const assetsPath = {
    nodeModules: resolve('node_modules'),
    static: resolve('static'),
    tests: resolve('tests'),
}
// 输出的配置
const config = {
    // 项目目录
    root,
    // 配置文件目录
    config: path.resolve(__dirname, '../'),
    // 开发环境配置
    dev: {
        // 路径重定向
        alias: {
            '@': corePath.src,
            src: corePath.src,
            tests: assetsPath.tests,
            static: assetsPath.static,
        },
        // 处理的文件夹
        include: [corePath.src, assetsPath.tests, assetsPath.static],
        // 不处理的文件夹
        exclude: [assetsPath.nodeModules],
    },
    // 生产环境配置
    prod: {
        // 不处理的文件夹
        exclude: [assetsPath.nodeModules, assetsPath.static],
    },
    // 源文件目录
    src: corePath.src,
    // 打包目录
    dist: corePath.dist,
    // html文件目录
    views: corePath.views,
    // node_modules目录
    node_modules: corePath.nodeModules,
    // 静态资源文件夹
    static: corePath.static,
}
module.exports = config
