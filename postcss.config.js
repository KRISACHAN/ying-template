const postcssConfig = {
    plugins: {
        precss: {},
        'postcss-preset-env': {
            browsers: 'last 2 versions',
            stage: 3,
            features: {},
            cssnano: {},
        },
        // 'postcss-px2rem': {
        //     remUnit: 75,
        // },
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            mediaQuery: false,
        },
        autoprefixer: {},
        'postcss-image-set-function': {
            oninvalid: 'throw',
            preserve: false,
        },
        'postcss-nesting': {},
    },
}
if (process.env.IS_MOBILE === 'false') {
    delete postcssConfig.plugins['postcss-px-to-viewport']
}
module.exports = postcssConfig
