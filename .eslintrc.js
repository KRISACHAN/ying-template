// https://eslint.org/docs/user-guide/configuring
const eslintObj = {
    'root': true,
    'parserOptions': {
        'parser': 'babel-eslint'
    },
    'env': {
        'browser': true,
    },
    'extends': [
        'standard'
    ],
    'rules': {
        'indent': [
            0, 4
        ], //缩进风格
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'eol-last': 0,
        'camelcase': 0,
        'space-before-function-paren': 0
    }
};

module.exports = eslintObj;