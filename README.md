# ying-template

## 项目信息

这是一个基于 `webpack@4.28.1` + `typescript@3.7.2` + `babel@7.2.2` + `jest@24.9.0` + `eslint@5.12.0`  + `node-sass@4.12.0` + `less@3.9.0` 的多页面脚手架。

本库支持增量更新，支持 `gzip` 打包，支持第三方资源别名引入，支持静态文件引入，支持使用环境变量。

## 运行环境

### 安装配置

1. 下载并安装node: https://nodejs.org/zh-cn/download/

### 运行命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 项目打包
npm run build

# 单元测试
npm run test
```

## 项目说明

### **项目结构**

```txt
│  .babelrc // babel配置文件
│  .editorconfig // 编辑器配置
│  .env // 环境变量配置
│  .eslintignore // eslint忽略配置
│  .eslintrc // eslint配置
│  .gitignore // git忽略配置
│  .prettierignore // prettier忽略配置
│  .prettierrc // prettier配置
│  build.sh // bash脚本
│  jest.config.js // Jest配置文件
│  LICENSE // LICENSE许可
│  package-lock.json
│  package.json
│  postcss.config.js // postcss配置文件
│  README.md // 项目说明文档
│  tsconfig.json // ts语言配置
│  
├─config // 核心配置
│      config.js // 根配置
│      webpack.config.base.js // 基础配置
│      webpack.config.dev.js // 开发环境配置
│      webpack.config.prod.js // 生产环境配置
│      
├─coverage // 单元测试结果文件
|
├─src // 用户代码
│          
├─static // 静态资源
│      
├─tests // 测试文件夹
│      
└─views // 页面目标
```

### 格式化方案

#### prettier

格式化方案为 `prettier`，主要配置如下：

```javascript
// ./.prettierrc
{
    "tabWidth": 4,
    "printWidth": 80,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "bracketSpacing": true,
    "arrowParens": "avoid",
    "requirePragma": false,
    "endOfLine": "auto" 
}
```

 `prettier`文档链接如下：

<https://prettier.io/>

#### eslint

代码格式验证规则为`eslint`，主要配置如下：

```javascript
// ./.eslintrc
"rules": {
    "indent": [0, 4],
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "no-debugger": 0,
    "eol-last": 0,
    "eqeqeq": 2,
    "camelcase": 0,
    "space-before-function-paren": 0,
    "quotes": ["error", "single"],
    "@typescript-eslint/explicit-function-return-type": [
        "off",
        {
            "allowExpressions": true,
            "allowTypedFunctionExpressions": true
        }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": "error"
}
```

`eslint`文档链接如下：

<https://eslint.org/>

### 适配方案

适配方案为 `postcss-px-to-viewport` ，主要配置如下：

```javascript
// ./postcss.config.js
'postcss-px-to-viewport': {
    unitToConvert: 'px',
    viewportWidth: 750,
    viewportHeight: 1334,
    unitPrecision: 3,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    mediaQuery: false
},
```

 `postcss-px-to-viewport` 文档链接：

<https://evrone.com/postcss-px-viewport>

### CSS语法方案

CSS语法方案为 `postcss-preset-env`，主要配置如下：

```javascript
// ./postcss.config.js
'postcss-preset-env': {
    browsers: 'last 2 versions',
    stage: 3,
    features: {},
    cssnano: {}
},
```

`postcss-preset-env`文档链接：

<https://preset-env.cssdb.org/>

### 支持的CSS扩展语言

#### sass

`sass`文档如下：

<https://sass-lang.com/>

#### less

`less`文档如下：

<http://lesscss.org/>

### ECMA语法方案

#### 基础方案

ECMA语法的基础方案为`@babel/preset-env`，主要配置如下：

```javascript
// ./.babelrc
"presets": [
    [
        "@babel/preset-env",
        {
            "useBuiltIns": "usage",
            "corejs": 3,
            "targets": {
                "esmodules": true,
                "chrome": "49"
            }
        }
    ],
    "@babel/preset-typescript"
],
```

`@babel/preset-env`文档如下：

<https://babeljs.io/docs/en/babel-preset-env>

#### 拓展语法

可按需增删需要的ECMA提案插件，主要配置如下：

```javascript
// ./.babelrc
"plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    [
        "@babel/plugin-proposal-class-properties",
        {
            "loose": true
        }
    ],
    [
        "@babel/plugin-proposal-decorators",
        {
            "legacy": true
        }
    ],
    [
        "@babel/plugin-proposal-private-methods",
        {
            "loose": true
        }
    ]
]
```

### typescript

支持`typescript@3.7.2`语法，`typescript`文档链接如下：

<https://www.typescriptlang.org/>

### 环境变量

使用者可在根目录下的`.env`文件添加环境变量，示例如下：

```bash
HOST=0.0.0.0
PORT=8099
VERSION=1.0.0
PUBLIC_PATH=/
```

### 单元测试

本库使用的单元测试框架为`jest@24.9.0`，`jest@24.9.0`文档链接如下：

<https://jestjs.io/>

### 其他配置

#### 第三方插件URL引入

当用户使用url的形式（例如CDN）引入第三方JS文件时，可通过 `./config/webpack.config.base.js` 的 `externals` 进行配置，例子如下：

```javascript
const baseConfig = {
  //...
    externals: {
		// ...
       jquery: 'jQuery',
    },
}
```

#### 请求转发

用户可以在 `./config/webpack.config.dev.js` 里的 `devServer.proxy` 进行转发请求配置，例子如下：

```javascript
const webpackDev = {
  //...
    devServer: {
		// ...
        proxy: {
            '/api': 'http://localhost:3000'
        },
    },
}
```

文档链接：

<https://webpack.js.org/configuration/dev-server/#devserverproxy>

## 后记

如果你喜欢探讨技术，或者对本仓库有任何的意见或建议，非常欢迎加鱼头微信好友一起探讨，当然，鱼头也非常希望能跟你一起聊生活，聊爱好，谈天说地。
鱼头的微信号是：krisChans95
也可以扫码关注公众号，订阅更多精彩内容。

![./static/qrcode-all1.png](./static/qrcode-all1.png)



