const postcssObj = {
    'plugins': {
        'postcss-cssnext': {},
        'precss': {},
        // 'postcss-px2rem': {
        //     'remUnit': 75
        // }
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            mediaQuery: false

            // propList: ['*'],
            // viewportUnit: 'vw',
            // fontViewportUnit: 'vw',
            // selectorBlackList: [],
            // minPixelValue: 1,
            // mediaQuery: false,
            // replace: true,
            // exclude: [],
            // landscape: false,
            // landscapeUnit: 'vw',
            // landscapeWidth: 568
        }
    }
};

module.exports = postcssObj;
