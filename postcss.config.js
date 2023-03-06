const precss = require('precss')
const pxToViewport = require('postcss-px-to-viewport')

const postcssConfig = {
    plugins: [
        // 文档：https://github.com/csstools/precss
        // 配置说明：https://cssdb.org/
        precss({
            stage: 3,
            features: {
                'color-mod-function': { unresolved: 'warn' },
            },
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
