# ying-template

## 项目信息

这是一个基于 `webpack@^5.27.2` + `typescript@^4.2.3` + `@babel/core@^7.2.2` + `jest@^26.6.3` + `eslint@^7.22.0` 的多页面脚手架。

本库支持增量更新，支持 `gzip` 打包，支持第三方资源别名引入，支持静态文件引入，支持使用环境变量。

## 运行环境

### 安装配置

1. 下载并安装 node: https://nodejs.org/zh-cn/download/

### 运行命令

```bash
# 安装依赖
yarn

# 启动开发服务器
yarn dev

# 项目打包
yarn build

# 单元测试
yarn jest

# css 代码自动格式化
yarn lint:css

# js 代码自动格式化
yarn lint:js

# js & css 代码自动格式化
yarn lint

# 核心代码格式测试以及纠正
yarn prettier

# 所有代码格式测试以及纠正
prettier:all

# 一键上传以及格式化源码
yarn cz

# 安装 husky
yarn prepare

```

## 项目说明

### **项目结构**

```txt
├─.babelrc // babel配置文件
├─.browserslistrc // 浏览器兼容配置
├─.cz-config.js // commitizen 配置
├─.editorconfig // 编辑器配置
├─.env // 环境变量配置
├─.eslintignore // eslint 忽略配置
├─.eslintrc // eslint 配置
├─.gitignore // git 忽略配置
├─.prettierignore // prettier 忽略配置
├─.prettierrc // prettier 配置
├─.stylelintignore // stylelint 忽略配置
├─.stylelintrc // stylelint 配置
├─Dockerfile // docker 配置
├─LICENSE // LICENSE许可
├─README.md // 项目说明文档
├─commitlint.config.js // commitlint 配置
├─default.conf // 项目运行 nginx 配置
├─docker-compose.yml
├─fileMock.js // jest 兼容文件夹
├─jest.config.js // Jest 配置文件
├─nginx.conf // 项目运行 nginx 配置
├─package.json
├─postcss.config.js // postcss 配置文件
├─tsconfig.json // ts 配置
├─yarn.lock
├─views // 页面文件夹
├─tests // 测试文件夹
├─static // 静态资源文件夹
├─src // 核心代码
├─dist // 构建产物
├─coverage // 单元测试结果文件夹
├─config // 核心配置夹
|   ├─config.js // 根配置
|   ├─dev-server.js // 开发环境服务器
|   ├─webpack.config.base.js // 基础配置
|   ├─webpack.config.dev.js // 开发环境配置
|   └webpack.config.prod.js // 生产环境配置
├─.husky
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
    "@typescript-eslint/no-explicit-any": 2,
    "prettier/prettier": "error",
    "no-var": "error",
    "@typescript-eslint/consistent-type-definitions": [
        "error",
        "interface"
    ],
    "no-empty-function": ["error", { "allow": ["constructors"] }],
    "@typescript-eslint/no-empty-function": "off"
}
```

`eslint`文档链接如下：

<https://eslint.org/>

### 提交规范

代码提交规范使用 `cz-customizable`，配置文件为`.cz-config.js`，主要配置如下：

```javascript
const czConfig = {
    ...,
    types: [
        { value: 'feat', name: '特性: 新增一个功能' },
        { value: 'fix', name: '修复: 修复一个Bug' },
        { value: 'docs', name: '文档: 文档变更' },
        { value: 'style', name: '格式: 代码格式' },
        { value: 'refactor', name: '重构: 代码重构' },
        { value: 'perf', name: '性能: 改善性能' },
        { value: 'test', name: '测试: 测试代码' },
        {
            value: 'build',
            name:
                '工具: 变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等）',
        },
        {
            value: 'ci',
            name:
                '集成: 更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等',
        },
        {
            value: 'style',
            name: '代码格式（不影响功能，例如空格、分号等格式修正）',
        },
        {
            value: 'revert',
            name: '回退: 代码回退',
        },
    ],
}
```

CV 自 [Cz 工具集使用介绍 - 规范 Git 提交说明](https://juejin.im/post/6844903831893966856)

使用方式，利用 `git cz` 代替 `git commit`

文档链接：

https://github.com/leoforfree/cz-customizable

### commit 信息检测

用 `husky` + `commitlint` 进行检测 commit 信息检测，配置代码如下：

```javascript
// ./commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'fix', //  修复
                'docs', // 文档变更
                'style', // 代码格式（不影响代码运行的变动）
                'refactor', // 重构（既不是增加feature）,也不是修复bug
                'pref', // 性能优化
                'test', // 增加测试
                'build', // 打包
                'ci', // 集成
                'style', // 代码格式
                'revert', // 回退
            ],
        ],
        // subject 大小写不做校验
        'subject-case': [0],
    },
}
```

CV 自 [规范化 Git 提交日志（Commitizen + husky + Git hooks ）](https://juejin.cn/post/7038550916106027044)

文档链接：https://commitlint.js.org/#/

### 容器化

**ying-template** 添加了 **Docker** 部署 **nginx** 服务器的脚本。执行命令如下：

```bash
yarn build
docker-compose up
```

**Dockerfile** 内容如下

```bash
FROM nginx:1.13.12-alpine as production-stage

ENV SERVER_PORT=$SERVER_PORT \
    EXPOSE_PORT=$EXPOSE_PORT \
    CONTAINER_NAME=$CONTAINER_NAME \
    IMAGE_NAME=$IMAGE_NAME

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE ${SERVER_PORT}

```

**docker-compose.yml** 内容如下：

```yml
version: '3.7'
services:
    ying-front:
        env_file:
            - .env
        container_name: ${CONTAINER_NAME}
        image: ${IMAGE_NAME}
        build:
            context: .
            dockerfile: Dockerfile
        volumes:
            - ./dist:/usr/share/nginx/html:ro
        ports:
            - target: ${EXPOSE_PORT}
              published: ${SERVER_PORT}
              protocol: tcp
              mode: host
```

关于 **Docker** 的教程，推荐大家看这个网站：https://yeasy.gitbooks.io/docker_practice/content/ ，具体语法就不作说明了

因为不想把镜像弄得太大，所以项目打包是在 `docker build` 之前完成的，有需要的可以根据各位 **DEVOPS** 的实际情况来修改

### 适配方案

适配方案为 `postcss-px-to-viewport` ，主要配置如下：

```javascript
// ./postcss.config.js
pxToViewport({
    unitToConvert: 'px',
    viewportWidth: 750,
    viewportHeight: 1334,
    unitPrecision: 3,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    mediaQuery: false,
}),
```

`postcss-px-to-viewport` 文档链接：

<https://evrone.com/postcss-px-viewport>

### CSS 语法方案

CSS 语法方案为 `precss`，主要配置如下：

```javascript
// ./postcss.config.js
precss({
    stage: 3,
    features: {
      	'color-mod-function': { unresolved: 'warn' }
    }
}),
```

`precss`文档链接：

<https://github.com/jonathantneal/precss>

### ECMA 语法方案

#### 基础方案

ECMA 语法的基础方案为`@babel/preset-env`，主要配置如下：

```javascript
// ./.babelrc
"presets": [
    // 文档：https://babeljs.io/docs/babel-preset-env
    [
        "@babel/preset-env",
        {
            // 配置：https://babeljs.io/docs/options#targets
            "targets": {
                "esmodules": true
            },
            // 配置：https://babeljs.io/docs/babel-preset-env#usebuiltins
            "useBuiltIns": "usage",
            // 配置：https://babeljs.io/docs/babel-preset-env#corejs
            "corejs": {
                "version": 3,
                "proposals": true
            }
        }
    ],
    [
        "@babel/preset-typescript",
        {
            "optimizeConstEnums": true
        }
    ]
],
```

`@babel/preset-env`文档如下：

<https://babeljs.io/docs/en/babel-preset-env>

#### 拓展语法

可按需增删需要的 ECMA 提案插件，主要配置如下：

```javascript
// ./.babelrc
"plugins": [
    // 文档：https://babeljs.io/docs/babel-plugin-transform-runtime
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-arrow-functions",
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

支持`typescript@4.2.3`语法，`typescript`文档链接如下：

<https://www.typescriptlang.org/>

### 环境变量

使用者可在根目录下的`.env`文件添加环境变量，示例如下：

```bash
HOST=0.0.0.0 # 运行host
PORT=8099 # 运行端口
VERSION=2.0.0 # 当前项目版本
PUBLIC_PATH=/ # 公共路径 https://webpack.js.org/guides/public-path/
WATCH_ANALYZER=false # 生产环境下是否看火焰图
IS_MOBILE=false # 判断是否是移动端，如果是，则打开postcss-px-to-viewport
```

### 单元测试

### 基本说明

本库使用的单元测试框架为`jest@^26.6.3`，`jest@^26.6.3`文档链接如下：

<https://jestjs.io/>

### 注意事项

**jest** 测试 **dom** 时，相关代码需要包裹在 **window.onload** 里，否则会报错。例如

```
'use strict'
import '@/style/index.css'
import qrcodeImg from 'static/img/qrcode-all1.png'

window.onload = () => {
    const radio = 0.25
    const width = 914
    const height = 439

    const qrcode: Element = document.querySelector('.qrcode')
    qrcode.setAttribute('src', qrcodeImg)

    console.group('%c快来撩我啊', 'color: #894e54; font-size: 60px;')
    console.log(
        '%c+',
        `
            font-size: 1px;
            padding: ${height * radio}px ${width * radio}px;
            background-image: url(https://fish-pond-1253945200.cos.ap-guangzhou.myqcloud.com/img/base/qrcode-all1.png);
            background-size: contain;
            background-repeat: no-repeat;
            color: transparent;
        `,
    )
    console.groupEnd()
}

export const add = (a: number, b: number): number => a + b
```

### 其他配置

#### 第三方插件 URL 引入

当用户使用 url 的形式（例如 CDN）引入第三方 JS 文件时，可通过 `./config/webpack.config.base.js` 的 `externals` 进行配置，例子如下：

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
            '/api': 'http://localhost:3000',
        },
    },
}
```

文档链接：

<https://webpack.js.org/configuration/dev-server/#devserverproxy>

### 路径重定向

用户可以在 `./config/config.js` 里的 `dev.alias` 配置路径重定向，例子如下：

```javascript
const config = {
    // ...
    dev: {
        alias: {
            static: resolve('static'),
        },
    },
}

// .js/ts里
import '@/style/index.css'

// .css里
// background: url('~static/img/qrcode-all1.png') 50% 50% / cover no-repeat;
```

文档链接：

https://webpack.js.org/configuration/resolve/#resolvealias

## 后记

如果你喜欢探讨技术，或者对本仓库有任何的意见或建议，非常欢迎加鱼头微信好友一起探讨，当然，鱼头也非常希望能跟你一起聊生活，聊爱好，谈天说地。
鱼头的微信号是：krisChans95
也可以扫码关注公众号，订阅更多精彩内容。

![./static/img/qrcode-all1.png](./static/img/qrcode-all1.png)
