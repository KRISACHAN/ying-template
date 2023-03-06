import '@/style/demo.css'
import test from '@/core/test'
declare global {
    interface Window {
        jsBridge: boolean
    }
}

class BaseBridge {
    constructor() {}

    login() {
        throw '必须被继承调用'
    }
}

class WxaBridge extends BaseBridge {
    constructor() {
        super()
    }

    login() {
        console.log('WxaBridge')
    }
}

class WapBridge extends BaseBridge {
    constructor() {
        super()
    }

    login() {
        console.log('WapBridge')
    }
}

class OfflineBridge extends BaseBridge {
    constructor() {
        super()
    }

    login() {
        console.log('OfflineBridge')
    }
}

class Bridge {
    constructor() {}

    #currentBridge: BaseBridge = undefined

    get envs() {
        return {
            WXA: 'wxa',
            WAP: 'wap',
            OFFLINE: 'offline',
        }
    }

    get useEnv() {
        if (window.jsBridge) {
            return this.envs.OFFLINE
        }
        if (!window) {
            return this.envs.WXA
        }
        return this.envs.WAP
    }

    get useBridge() {
        if (this.#currentBridge) {
            return this.#currentBridge
        }
        if (this.useEnv === this.envs.WXA) {
            this.#currentBridge = new WxaBridge()
        }
        if (this.useEnv === this.envs.WAP) {
            this.#currentBridge = new WapBridge()
        }
        if (this.useEnv === this.envs.OFFLINE) {
            this.#currentBridge = new OfflineBridge()
        }
        return this.#currentBridge
    }

    public login() {
        return this.useBridge.login()
    }
}

const bridge = new Bridge()
bridge.login()
console.log(bridge.envs)

const a = '100'
test()
