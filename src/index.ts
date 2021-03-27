import '@/style/index.css'
import qrcodeImg from 'static/img/qrcode-all1.png'

window.onload = () => {
    const radio = 0.25
    const width = 914
    const height = 439

    const qrcode: Element = document.querySelector('.qrcode')
    qrcode.setAttribute('src', qrcodeImg)
    qrcode.setAttribute('y-width', width + 'px')
    qrcode.setAttribute('y-height', height + 'px')

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
