const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.config.dev.js')
const options = {
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
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(options.port, () => {
    console.log(options.port)
})

// const webpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');
// const devConfig = require('./webpack.config.dev.js');

// console.log(devConfig)

// const options = {
//     contentBase: './dist',
//     historyApiFallback: true,
//     overlay: true,
//     inline: true,
//     hot: true,
//     host: process.env.HOST || '0.0.0.0',
//     port: process.env.PORT || '8082',
//     useLocalIp: true,
//     proxy: {},
//     https: false,
//     open: true,
// }

// webpackDevServer.addDevServerEntrypoints(
//     options,
//     devConfig
// )
// const compiler = webpack(options)
// const server = new webpackDevServer(compiler, options)
// server.listen(options.port, options.host, () => {
//     console.log(`运行地址：${options.host}:${options.port}`)
// })
