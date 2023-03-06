import '@/style/index.css'
import { startCase } from 'lodash'
import qrcodeImg from 'static/img/qrcode-all1.png'
import test from '@/core/test'

window.onload = () => {
    const radio = 0.25
    const width = 914
    const height = 439

    const qrcode: Element = document.querySelector('.qrcode')
    const helloWord = 'hello, world'
    const helloWordNoed = document.createTextNode(startCase(helloWord))
    document.body.appendChild(helloWordNoed)
    document.querySelector('#desc').innerHTML =
        '下面是我的公众号『鱼头的Web海洋』二维码，以及我个人微信二维码，有兴趣的可以扫码一起来分享技术以及谈天说地。'
    qrcode.setAttribute('src', qrcodeImg)
    qrcode.setAttribute('y-width', width + 'px')
    qrcode.setAttribute('y-height', height + 'px')

    console.group('%c快来撩我啊', 'color: #894e54; font-size: 60px;')
    console.log(
        '%c+',
        `
            font-size: 1px;
            padding: ${height * radio}px ${width * radio}px;
            background-image: url(https://bucket.krissarea.com/img/base/qrcode-all1.png);
            background-size: contain;
            background-repeat: no-repeat;
            color: transparent;
        `,
    )
    console.groupEnd()
}

export const add = (a: number, b: number): number => a + b
