"use strict";
class MyClass {
    constructor() {}
    output(data) {
        console.log(data)
    }
    send(data) {
        this.output(data)
    }
}

const my = new MyClass()
my.send('1')