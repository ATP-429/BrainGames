'use strict'

const { v4 : uuidv4 } = require('uuid');
const cookie = require('cookie');

module.exports = class Player {
    /* $ : Variables starting with $ are private. They'll never be shared with anyone. They only exist on the server
     * _ : Variables starting with _ are public. They'll be shared with every single player in the game
     * Variables starting with neither in a player class, are variables that will be shared with all the players in the game
     */
    $socket;
    //The $id is the only private variable that's shared to ALL players.
    //This is because we just send the id in the players list and we want to omit it all other times.
    //If this was not made private, it would unnecessarily be sent every time anything is sent
    $id;

    constructor(socket) {
        let playerCookie = cookie.parse(socket.handshake.headers.cookie);
        this.$socket = socket;
        this.$id = playerCookie.userID;
    }

    emit(eventName, obj) {
        this.$socket.emit(eventName, obj);
    }

    getPlayerVars() {
        let vars = {}
        for(let prop in this) {
            if(prop.charAt(0) != '$' && prop.charAt(0) != '_')
                vars[prop] = this[prop];
        }
        return vars;
    }

    getGlobalVars() {
        let vars = {}
        for(let prop in this) {
            if(prop.charAt(0) == '_')
                vars[prop] = this[prop];
        }
        return vars;
    }
}
