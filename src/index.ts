'use strict'
import 'src/style/index.css'

import qrcodeImg from './img/qrcode-all1.png'
const radio = 0.5
const width = 914
const height = 439

console.log(qrcodeImg)
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
