'use strict'
/**
 * @jjjjjjjjjjjjjjjjjjjjjjjj
 */
debugger
const delay1 = (duration: number): Promise<unknown> =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve()
        }, duration),
    )

const output1 = async () => {
    console.log(1)
    await delay1(1000)
    console.log(2)
}
output1()
console.log('a')
console.log(output1)
