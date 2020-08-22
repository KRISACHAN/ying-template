'use strict'
const obj: any = Object.create(null)
const count = obj?.a?.b || 10
const a = '10'
console.log(a)
export const add = (a: number, b: number): number => a + b
