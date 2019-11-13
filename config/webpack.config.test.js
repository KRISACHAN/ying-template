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
    }
}
delete webpackBase.entry
module.exports = webpackMerge(webpackBase, webpackTest)
