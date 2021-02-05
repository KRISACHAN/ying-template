const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
    views,
    src,
    project,
    dev: { alias, include, exclude },
    build,
} = require('./config.js')
// 获取html文件名，生成多页面入口
const getPagesEnter = path => {
    const dirArr = fs.readdirSync(path)
    const filesArr = dirArr
        .filter(e => e.indexOf('html') >= 0)
        .map(e => e.replace('.html', ''))
    return filesArr
}
const viewEntries = getPagesEnter(views)
const htmlPlugins = [] // 保存HTMLWebpackPlugin实例
const entries = {} // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
viewEntries.forEach(page => {
    const htmlConfig = {
        filename: `${page}.html`,
        template: path.join(views, `./${page}.html`), // 模板文件
    }
    const entryFile = path.join(src, `./${page}.ts`)
    if (!fs.existsSync(entryFile)) {
        htmlConfig.chunks = []
    } else {
        htmlConfig.chunks = [page, 'vendors']
        entries[page] = `./src/${page}.ts`
    }
    const htmlPlugin = new HTMLWebpackPlugin(htmlConfig)
    htmlPlugins.push(htmlPlugin)
})

const baseConfig = {
    context: project, // 入口、插件路径会基于context查找
    entry: entries,
    output: {
        path: build, // 打包路径
    },
    resolve: {
        alias, // 文件名简写
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'], // 文件查询扩展
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'font/[name]-[hash:8].[ext]',
                    },
                },
                include,
                exclude,
            },
            {
                test: /\.(png|svg|jpg|gif)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name]-[hash:8].[ext]',
                    },
                },
                include,
                exclude,
            },
            {
                test: /\.(t|j)sx?$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: true,
                        },
                    },
                ],
                include,
                exclude,
            },
        ],
    },
    externals: {},
    plugins: [
        ...htmlPlugins,
        new CopyWebpackPlugin([
            {
                from: 'static',
                to: 'static',
            },
        ]),
    ],
}
module.exports = baseConfig
