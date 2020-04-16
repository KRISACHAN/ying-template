// 生产环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const compressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const webpackBase = require('./webpack.config.base.js')
const { project, pro } = require('./config.js')

const webpackProd = {
    mode: 'production',
    stats: {
        colors: true,
    },
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
    },
    optimization: {
        minimizer: [
            new uglifyJSPlugin({
                sourceMap: true,
                exclude: pro.exclude,
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
                // jquery: {
                //     name: 'jquery',
                //     test: /[\\/]node_modules[\\/]jquery[\\/]/,
                // },
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
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    'less-loader',
                ],
            },
            {
                test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[id].[chunkhash:8].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new cleanWebpackPlugin(['./dist/'], {
            root: project,
        }),
        new compressionPlugin({
            filename: '[path].gz[query]',
            test: /(\.js|\.css|\.html|\.png|\.jpg|\.webp|\.svg)$/,
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
        new BundleAnalyzerPlugin(),
    ],
}
module.exports = webpackMerge(webpackBase, webpackProd)
