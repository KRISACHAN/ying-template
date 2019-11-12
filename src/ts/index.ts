'use strict'
import '@/css/index.css'
import '@/sass/index.scss'
let a: number = 100
let b: number = 500
const add = (a: number, b: number): number => (a + b)
console.log(add(a, b))
let c: string = 'abc'
console.log(c)

class biu {
    static a: string = 'foo'
    static b: any
    a = 'bar'
    b = 'yingyingying'
}

const foo = {
    bar: {
        baz() {
            return '10'
        }
    }
}

let x = foo?.bar.baz()

console.log(x)