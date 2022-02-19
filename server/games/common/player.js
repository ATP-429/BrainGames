'use strict'

const { v4 : uuidv4 } = require('uuid');

module.exports = class Player {
    privatestate = {} //Variables of player hidden from client
    publicstate = {} //Variables of player that'll be sent to client
    public2state = {} //Variables of player that'll be sent to all other players [Named public2state for public squared state, or publicpublicstate]

    constructor(socket) {
        this.socket = socket;
        this.id = uuidv4();
    }

    addInputListener(inputListener) {
        this.socket.on('input', (data, callback) => {
            inputListener(this, data);
            callback('ok');
        })
    }
}
