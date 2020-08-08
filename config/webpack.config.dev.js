// 开发环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.config.base.js')
const {
    dev: { include, exclude },
} = require('./config.js')

const webpackDev = {
    mode: 'development',
    stats: {
        colors: true,
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'static/js/[name].[hash:8].bundle.js',
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
        proxy: {},
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                include,
                exclude,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                include,
                exclude,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}
module.exports = webpackMerge(webpackBase, webpackDev)
