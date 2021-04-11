// 开发环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.config.base.js')
// https://www.npmjs.com/package/stylelint-webpack-plugin CSS 格式化
const StyleLintPlugin = require('stylelint-webpack-plugin')
const {
    dev: { include, exclude },
    style,
} = require('./config.js')

const webpackDev = {
    mode: 'development',
    stats: {
        colors: true,
    },
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: 'static/js/[name].[hash:8].bundle.js',
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        overlay: true,
        inline: true,
        hot: true,
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || '8082',
        useLocalIp: true,
        proxy: {},
        https: false,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new StyleLintPlugin({
            configFile: './.stylelintrc',
            context: style,
            files: ['*.css', '**/*.css', '**/**/*.css', '**/**/**/*.css'],
            formatter: 'unix',
        }),
    ],
}
module.exports = webpackMerge(webpackBase, webpackDev)
