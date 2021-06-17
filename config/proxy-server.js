const express = require('express')
const createProxyMiddleware = require('http-proxy-middleware')

const app = express()

app.use(
    '/',
    createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/v1': 'http://localhost:3000/v1',
            '^/v2': 'http://localhost:3000/v2',
            '^/v3': 'http://localhost:3000/v3',
            '^/v4': 'http://localhost:3000/v4',
        },
    }),
)
app.listen(3000)
