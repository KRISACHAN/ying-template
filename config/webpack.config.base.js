const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
    html,
    ignorePages,
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
const HTMLArr = getPagesEnter(html)
const HTMLPlugins = [] // 保存HTMLWebpackPlugin实例
const Entries = {} // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
HTMLArr.forEach(page => {
    const htmlConfig = {
        filename: `${page}.html`,
        template: path.join(html, `./${page}.html`), // 模板文件
    }
    const hasIgnorePages = ignorePages.findIndex(val => val === page)
    if (hasIgnorePages === -1) {
        // 有入口js文件的html，添加本页的入口js，与公共js，并将入口js写入Entries中
        htmlConfig.chunks = [page, 'vendors']
        Entries[page] = `./src/${page}.ts`
    } else {
        // 没有入口js文件，chunk为空
        htmlConfig.chunks = []
    }
    const htmlPlugin = new HTMLWebpackPlugin(htmlConfig)
    HTMLPlugins.push(htmlPlugin)
})

const baseConfig = {
    context: project, // 入口、插件路径会基于context查找
    entry: {
        ...Entries,
    },
    output: {
        path: build, // 打包路径
    },
    resolve: {
        alias, // 文件名简写
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'], // 文件查询扩展
    },
    module: {
        /**
         * @date 2020/7/21
         * @author kris
         * @desc 现在利用资源loader给图片加上hash之后，在页面引用也得加hash，不加无法识别，需要解决这个问题，所以暂时先去掉资源hash，解决再改回去
         */
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        // name: 'font/[name]-[hash:8].[ext]',
                        name: 'font/[name].[ext]',
                    },
                },
                include,
                exclude,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        // name: 'img/[name]-[hash:8].[ext]',
                        name: 'img/[name].[ext]',
                    },
                },
                include,
                exclude,
            },
            {
                test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                include,
                exclude,
            },
        ],
    },
    externals: {
        // jquery: 'jQuery',
    },
    plugins: [
        ...HTMLPlugins,
        new CopyWebpackPlugin([
            {
                from: 'static',
                to: 'static',
            },
        ]),
    ],
}
module.exports = baseConfig
