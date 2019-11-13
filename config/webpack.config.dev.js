// 开发环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.config.base.js')
const DashboardPlugin = require('webpack-dashboard/plugin')
const {
    dev: {
        include,
        exclude
    }
} = require('./config.js')

const webpackDev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'static/js/[name].[hash:8].bundle.js'
    },
    devServer: {
        contentBase: './dist/',
        historyApiFallback: true,
        overlay: true,
        inline: true,
        hot: true,
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || '8082',
        useLocalIp: true,
        proxy: {}
    },
    module: {
        rules: [
            {
                test: /\.(le|sa|sc|c)ss$/,
                include,
                exclude,
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ]
}
module.exports = webpackMerge(webpackBase, webpackDev)
