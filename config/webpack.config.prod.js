// 生产环境配置
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const compressionPlugin = require('compression-webpack-plugin');
const webpackBase = require('./webpack.config.base.js');
const {
    project
} = require('./config.js');

const webpackProd = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
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
                use: [
                    'babel-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash:8].css',
            chunkFilename: 'static/css/[id].[chunkhash:8].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new cleanWebpackPlugin(['./dist/'], {
            root: project
        }),
        new uglifyJSPlugin({
            sourceMap: true,
            exclude: /node_modules/,
            uglifyOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    warnings: false 
                },
                comments: false
            }
        }),
        new compressionPlugin({
            filename: '[path].gz[query]',
            test: /(\.jsx|\.js|\.css|\.html|\.png|\.jpg|\.webp|\.svg)$/,
            cache: true,
            algorithm: 'gzip',
            deleteOriginalAssets: false,
            minRatio: 0.8
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default', 
                    { 
                        discardComments: { 
                            removeAll: true 
                        } 
                    }
                ],
            },
            canPrint: true
        })
    ],
    optimization: {}
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /([\\/]node_modules[\\/]|[\\/]vendors[\\/])/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //                 enforce: true
    //             }
    //         }
    //     }
    // }
};

module.exports = webpackMerge(webpackBase, webpackProd);
