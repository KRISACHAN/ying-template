  
const webpackConfig = require('./config/webpack.config.test.js')
const karmaConfig = config => {
    config.set({
        browsers: [
            'PhantomJS'
        ],
        frameworks: [
            'mocha',
            'sinon-chai',
            'phantomjs-shim'
        ],
        reporters: [
            'spec',
            'coverage'
        ],
        files: [
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': [
                'webpack',
                'sourcemap'
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: 'test/coverage',
            reporters: [
                {
                    type: 'lcov',
                    subdir: '.'
                },
                {
                    type: 'text-summary'
                }
            ]
        }
    })
}
module.exports = karmaConfig