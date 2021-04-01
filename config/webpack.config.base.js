const path = require('path')
const fs = require('fs')
// https://www.npmjs.com/package/html-webpack-plugin 简化了 HTML 文件的创建
const HTMLWebpackPlugin = require('html-webpack-plugin')
// https://www.npmjs.com/package/copy-webpack-plugin 复制文件夹到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin')

const routesMap = require('./create-routes-map')

const {
    views,
    src,
    root,
    dev: { alias, include, exclude },
    dist,
} = require('./config.js')

const genRouteConfigs = (routes, type) => {
    const plugins = []
    const entries = {}

    routes.forEach(entry => {
        const {
            key,
            value
        } = entry
        if (key === 'national-day') {
            return
        }
        const htmlConfig = {
            filename: `./${type}/${key}.html`,
            template: path.join(views, './tpl.ejs'),
            templateParameters: {
                title: value
            },
            inject: true,
        }
        const entryFile = path.join(src, `./${type}/${key}/index.ts`)
        if (!fs.existsSync(entryFile)) {
            htmlConfig.chunks = []
        } else {
            htmlConfig.chunks = [`${type}/${key}`, 'vendors']
            entries[`${type}/${key}`] = `./src/${type}/${key}/index.ts`
        }
        const htmlPlugin = new HTMLWebpackPlugin(htmlConfig)
        plugins.push(htmlPlugin)
    })

    return {
        plugins,
        entries
    }
}

const { entries: mobileEntries, plugins: mobileHtmlPlugins } = genRouteConfigs(routesMap.mobileRoutesMap, 'mobile')
const { entries: pcEntries, plugins: pcHtmlPlugins } = genRouteConfigs(routesMap.pcRoutesMap, 'pc')

const entries = {
    ...mobileEntries,
    ...pcEntries
}

const htmlPlugins = [
    ...mobileHtmlPlugins,
    ...pcHtmlPlugins
]

const baseConfig = {
    // 入口路径
    context: root,
    entry: entries,
    output: {
        // 打包路径
        path: dist,
        filename: './[name].js',
    },
    resolve: {
        // 文件名简写
        alias,
        // 文件查询扩展
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
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
                    // https://www.npmjs.com/package/thread-loader 将下方的 loader 放入 worker 池里。每个 worker 都是一个单独的有 600ms 限制的 node.js 进程。同时跨进程的数据交换也会被限制。
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
