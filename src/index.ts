"use strict";
async function delay(duration) {
    return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, duration);
        });
    };
}

async function output() {
    console.log(1);
    await delay(1000);
    console.log(2);
}
output();
