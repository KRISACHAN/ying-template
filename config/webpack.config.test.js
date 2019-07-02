// 测试环境配置
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');

const webpackTest = {
    'mode': 'none',
    'devtool': '#inline-source-map',
    'module': {
        'rules': []
    }
};

delete webpackBase.entry;

module.exports = webpackMerge(webpackBase, webpackTest);
