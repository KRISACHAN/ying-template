// 测试环境配置
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.config.base.js')
const {
    dev: {
        include,
        exclude
    }
} = require('./config.js')
const webpackTest = {
    mode: 'none',
    devtool: '#inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    }
}
delete webpackBase.entry
module.exports = webpackMerge(webpackBase, webpackTest)
