const path = require('path')
const dotenv = require('dotenv')
const project = process.cwd()
const resolve = dir => path.join(__dirname, '..', dir) // 获取文件夹
dotenv.config() // 添加环境变量
const config = {
    project, // 项目目录
    config: path.resolve(__dirname, '../'), // 配置文件目录
    dev: {
        // 开发环境配置
        alias: {
            // 路径重定向
            '@': resolve('src'),
            src: resolve('src'),
            tests: resolve('tests'),
            core: resolve('core'),
            static: resolve('static'),
        },
        include: [
            // 处理的文件夹
            resolve('src'),
            resolve('tests'),
            resolve('core'),
            resolve('static'),
        ],
        exclude: [
            // 不处理的文件夹
            resolve('node_modules'),
        ],
    },
    pro: {
        // 生产环境配置
        exclude: [
            // 不处理的文件夹
            resolve('node_modules'),
            resolve('static'),
        ],
    },
    src: resolve('src'), // 源文件目录
    build: resolve('dist'), // 打包目录
    html: resolve('views'), // html文件目录
    node_modules: resolve('node_modules'), // node_modules目录
    static: resolve('static'), // 静态资源文件夹
    ignorePages: [''], // 标识没有入口js文件的html
}
module.exports = config
