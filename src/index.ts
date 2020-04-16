'use strict'
const delay = (duration: number): Promise<unknown> =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve()
        }, duration),
    )

const output = async () => {
    console.log(1)
    await delay(1000)
    console.log(2)
}
output()
