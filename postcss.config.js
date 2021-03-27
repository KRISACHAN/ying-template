const precss = require('precss')
const presetEnv = require('postcss-preset-env')
const pxToViewport = require('postcss-px-to-viewport')

const postcssConfig = {
    plugins: [
        /**
         * @url https://cssdb.org/
         */
        precss(),
        /**
         * @todo 需要确定是否 preset-env 的 options 可以直接在 precss 里调用
         */
        presetEnv({
            stage: 3, // 拥抱阶段。稳定且变化不大，此功能可能会成为标准。
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
