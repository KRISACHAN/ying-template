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
        const {
            htmlType,
            ariaLabel,
            variant,
            color,
            text,
            id,
            click
        } = this.options
        const YButtonText: string = 'y-button'
        const YButtonOptions = {}
        class YButtonComponent extends HTMLElement {
            constructor() {
                super()
                const shadow = this.attachShadow({ mode: 'open' })
                const style = document.createElement('style')
                const button = document.createElement('button')
                button.textContent = text
                button.setAttribute('type', htmlType)
                button.setAttribute('aria-label', ariaLabel)
                button.setAttribute('variant', variant)
                button.setAttribute('id', id)
                button.addEventListener('click', click)
                style.textContent = `
                    #${id} {
                        padding: 4px 10px;
                        font-size: 0.875rem;
                        min-width: 64px;
                        box-sizing: border-box;
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                        font-weight: 500;
                        line-height: 1.75;
                        border-radius: 4px;
                        letter-spacing: .02857em;
                        text-transform: uppercase;
                        border: 0;
                        cursor: pointer;
                        display: inline-flex;
                        text-align: center;
                        text-decoration: none;
                        vertical-align: middle;
                        position: relative;
                        align-items: center;
                        -webkit-appearance: none;
                        -webkit-tap-highlight-color: transparent;
                        outline: 0;
                        color: rgba(0, 0, 0, 0.87);
                        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2),
                                    0px 2px 2px 0px rgba(0, 0, 0, .14),
                                    0px 1px 5px 0px rgba(0, 0, 0, .12);
                        background-color: #e0e0e0;
                    }
                `
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
            parent
        } = this.options
        this.registeComponent()
        const Node = parent || document.querySelector('body')
        const YButton = document.createElement('y-button')
        Node.appendChild(YButton)
    }
}

export default YButton
