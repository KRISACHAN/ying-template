// 生产环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const compressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpackBase = require('./webpack.config.base.js')
const { root, prod } = require('./config.js')

const plugins = [
    new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash:8].css',
        chunkFilename: 'css/[id].[chunkhash:8].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
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
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
        publicPath: process.env.PUBLIC_PATH || '/',
    },
    optimization: {
        minimizer: [
            new uglifyJSPlugin({
                sourceMap: true,
                exclude: prod.exclude,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        warnings: false,
                    },
                    comments: false,
                },
            }),
        ],
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
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
            {
                test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins,
}
module.exports = webpackMerge(webpackBase, webpackProd)
