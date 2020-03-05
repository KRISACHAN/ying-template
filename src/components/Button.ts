interface ButtonClickType {
    (ev: Event): void
}
interface ButtonOptionsType {
    parent?: HTMLElement
    htmlType?: string
    ariaLabel?: string
    variant?: string
    color?: string
    text?: string
    id?: string
    click?: ButtonClickType
}

class Button {
    options: ButtonOptionsType = {}
    constructor(options: ButtonOptionsType = {}) {
        this.options = options
        customElements.define('button-group',
            class extends HTMLElement {
                constructor() {
                    super()
                    const shadowRoot = this.attachShadow({
                        mode: 'open'
                    })
                    const style = document.createElement('style')
                    style.textContent = ``
                    shadowRoot.appendChild(style)
                }
            }
        )
    }
}
export default Button