const path = require('path')
const fs = require('fs')
// https://www.npmjs.com/package/html-webpack-plugin 简化了 HTML 文件的创建
const HTMLWebpackPlugin = require('html-webpack-plugin')
// https://www.npmjs.com/package/copy-webpack-plugin 复制文件夹到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
    views,
    src,
    root,
    dev: { alias, include, exclude },
    dist,
} = require('./config.js')
// 生成 html 处理插件以及入口
const genHTMLPluginsAndEntries = viewsPath => {
    // 获取html文件名，生成多页面入口
    const getViewEntries = viewsPath => {
        const viewsDir = fs.readdirSync(viewsPath)
        const genViewsNameWithoutSuffix = viewsDir
            .filter(e => e.indexOf('html') >= 0)
            .map(e => e.replace('.html', ''))
        return genViewsNameWithoutSuffix
    }
    const viewEntries = getViewEntries(viewsPath)
    // 保存HTMLWebpackPlugin实例
    const plugins = []
    // 保存入口列表
    const entries = {}
    // 生成HTMLWebpackPlugin实例和入口列表
    viewEntries.forEach(view => {
        const htmlConfig = {
            filename: `${view}.html`,
            template: path.join(views, `./${view}.html`), // 模板文件
        }
        const entryFile = path.join(src, `./${view}.ts`)
        if (!fs.existsSync(entryFile)) {
            htmlConfig.chunks = []
        } else {
            htmlConfig.chunks = [view, 'vendors']
            entries[view] = `./src/${view}.ts`
        }
        const htmlPlugin = new HTMLWebpackPlugin(htmlConfig)
        plugins.push(htmlPlugin)
    })
    return {
        entries,
        plugins,
    }
}

const { entries, plugins: htmlPlugins } = genHTMLPluginsAndEntries(views)

const baseConfig = {
    // 入口路径
    context: root,
    entry: entries,
    // https://webpack.js.org/concepts/output/#root
    output: {
        // 打包路径
        path: dist,
        // https://webpack.js.org/configuration/output/#librarytarget-umd
        libraryTarget: 'umd',
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
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: 'es2015',
                            tsconfig: './tsconfig.json',
                        },
                    },
                ],
                include,
                exclude,
            },
        ],
    },
    // https://webpack.js.org/configuration/externals/#root
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
