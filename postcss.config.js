const precss = require('precss')
const pxToViewport = require('postcss-px-to-viewport')

const postcssConfig = {
    plugins: [
        /**
         * @url https://cssdb.org/
         */
        precss({
            stage: 3,
            features: {
                'color-mod-function': { unresolved: 'warn' }
            }
        }),
        pxToViewport({
            unitToConvert: 'px',
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            mediaQuery: false,
        }),
    ],
}

module.exports = postcssConfig
