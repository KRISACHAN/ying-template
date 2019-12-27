'use strict'
import YButton from './components/y-button'
const clickHandler = (ev: Event): void => {
    console.log(ev)
}
const yButton = new YButton({
    parent: document.querySelector('body'),
    htmlType: 'submit',
    ariaLabel: 'add',
    variant: 'contained',
    color: 'rgba(17, 82, 147, 1)',
    text: '添加',
    id: 'y-button',
    click: clickHandler
})
