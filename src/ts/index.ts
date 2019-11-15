'use strict'
import '@/css/index.css'
import '@/sass/index.scss'
import {
    sum
} from '@/ts/math'
let a: number = 100
let b: number = 500
console.log(sum(a, b))
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