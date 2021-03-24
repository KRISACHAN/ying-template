// 生产环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
// https://www.npmjs.com/package/clean-webpack-plugin  清除文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin')
// https://www.npmjs.com/package/uglifyjs-webpack-plugin 压缩文件夹
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
// https://www.npmjs.com/package/mini-css-extract-plugin 将 CSS 提取到单独的文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// https://www.npmjs.com/package/optimize-css-assets-webpack-plugin CSS 优化
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// https://www.npmjs.com/package/compression-webpack-plugin 提供带 Content-Encoding 编码的压缩版的资源
const compressionPlugin = require('compression-webpack-plugin')
// https://www.npmjs.com/package/webpack-bundle-analyzer 可视化的输出文件详情
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpackBase = require('./webpack.config.base.js')
const { root, prod } = require('./config.js')

const plugins = [
    new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash:8].css',
        chunkFilename: 'css/[id].[chunkhash:8].css',
    }),
    new cleanWebpackPlugin(['./dist/'], {
        root,
    }),
    new compressionPlugin({
        filename: '[path].gz[query]',
        test: /(\.js|\.css|\.html|\.png|\.jpg|\.webp|\.svg)(\?.*)?$/,
        cache: true,
        algorithm: 'gzip',
        deleteOriginalAssets: false,
        minRatio: 0.8,
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorPluginOptions: {
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        },
        canPrint: true,
    }),
]

const WATCH_ANALYZER = process.env.WATCH_ANALYZER !== 'false'

if (WATCH_ANALYZER) {
    plugins.push(new BundleAnalyzerPlugin())
}

const webpackProd = {
    mode: 'production',
    stats: {
        colors: true,
    },
    // 可与 hidden-source-map 之间二选一
    // 打开 https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps
    // https://webpack.js.org/configuration/devtool/
    devtool: 'nosources-source-map',
    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
        publicPath: process.env.PUBLIC_PATH || '/',
    },
    optimization: {
        moduleIds: 'deterministic',
        minimizer: [
            new uglifyJSPlugin({
                sourceMap: true,
                exclude: prod.exclude,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                    comments: false,
                },
            }),
        ],
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins,
}
module.exports = webpackMerge(webpackBase, webpackProd)
