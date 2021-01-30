'use strict'
import '@/style/index.css'
import '@/style/index.scss'
window.onload = () => {
    const obj: any = Object.create(null)
    const count = obj?.a?.b || 10
    const a = '10'
    console.log(a)
    const h1 = document.querySelector('h1')
    h1.innerHTML = `本设备的DPR为：${window.devicePixelRatio}`
    const box = document.querySelector('.box')
    const { width: boxWidth, height: boxHeight } = getComputedStyle(box, null)
    box.innerHTML = `本盒子的高度: ${boxHeight}, 宽度：${boxWidth}，页面宽度为：${window.innerWidth}`
    console.log(count)
}
export const add = (a: number, b: number): number => a + b
