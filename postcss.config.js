const precss = require('precss')
const pxToViewport = require('postcss-px-to-viewport')

const postcssConfig = api => {
    console.log('-------api.context------')
    console.log(api.file)
    console.log('-------api.context------')
    const plugins = [
        /**
         * @url https://cssdb.org/
         */
        precss({
            stage: 3,
            features: {
                'color-mod-function': { unresolved: 'warn' },
            },
        }),
    ]
    if (api.file.indexOf('src/mobile') >= 0) {
        plugins.push(pxToViewport({
            unitToConvert: 'px',
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            mediaQuery: false,
        }),)
    }
    return {
        plugins,
    }
}

module.exports = postcssConfig
