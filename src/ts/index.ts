'use strict'
import '@/sass/index.scss'
let a: number = 100
let b: number = 500
const add = (a: number, b: number): number => (a + b)
console.log(add(a, b))
let c: string = 'abc'
console.log(c)

class Point {
  constructor(x: any, y: any) {
    this.x = x
    this.y = y
  }
}

let p1 = new Point(1, 2)