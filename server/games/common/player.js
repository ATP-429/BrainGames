'use strict'

const { v4 : uuidv4 } = require('uuid');

module.exports = class Player {
    constructor(socket) {
        this.socket = socket;
        this.id = uuidv4();
    }

    addInputListener(inputListener) {
        this.socket.on('input', (data) => {
            inputListener(this, data);
        })
    }
}
