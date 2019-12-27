'use strict'
interface YButtonClickType {
    (ev: Event): void
}
interface YButtonOptionsType {
    parent?: HTMLElement
    htmlType?: string
    ariaLabel?: string
    variant?: string
    color?: string
    text?: string
    id?: string
    click?: YButtonClickType
}

class YButton {
    options: YButtonOptionsType = {}
    constructor(options: YButtonOptionsType = {}) {
        this.options = options
        this.createDom()
    }
    registeComponent() {
        const YButtonText: string = 'y-button'
        const YButtonOptions = {}
        class YButtonComponent extends HTMLElement {
            constructor() {
                super()
                const shadow = this.attachShadow({mode: 'open'})
                const style = document.createElement('style')
                const button = document.createElement('button')
                shadow.appendChild(style)
                shadow.appendChild(button)
            }
            connectedCallback() {
                console.log('connectedCallback')
            }
            disconnectedCallback() {
                console.log('disconnectedCallback')
            }
            adoptedCallback() {
                console.log('adoptedCallback')
            }
            attributeChangedCallback(name: string, oldValue: any, newValue: any) {
                console.log({
                    name,
                    oldValue,
                    newValue
                })
                console.log('attributeChangedCallback')
            }
        }
        customElements.define(
            YButtonText,
            YButtonComponent,
            YButtonOptions
        )
    }
    createDom() {
        const {
            parent,
            htmlType,
            ariaLabel,
            variant,
            color,
            text,
            id
        } = this.options
        this.registeComponent()
        const Node = parent || document.querySelector('body')
        const YButton = document.createElement('y-button')
        YButton.setAttribute('htmlType', htmlType)
        YButton.setAttribute('aria-label', ariaLabel)
        YButton.setAttribute('variant', variant)
        YButton.setAttribute('color', color)
        YButton.setAttribute('text', text)
        YButton.setAttribute('id', id)
        Node.appendChild(YButton)
    }
}

export default YButton
