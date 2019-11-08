const postcssObj = {
    'plugins': {
        'precss': {},
        'postcss-preset-env': {
            'browsers': 'last 2 versions',
            'stage': 3,
            'features': {},
            "cssnano": {}
        },
        'postcss-px-to-viewport': {
            'unitToConvert': 'px',
            'viewportWidth': 750,
            'viewportHeight': 1334,
            'unitPrecision': 3,
            'viewportUnit': 'vw',
            'fontViewportUnit': 'vw',
            'mediaQuery': false
        },
        'autoprefixer': {},
        'postcss-image-set-function': {
            'oninvalid': 'throw',
            'preserve': false
        },
        'postcss-nesting': {}
    }
};

module.exports = postcssObj;
