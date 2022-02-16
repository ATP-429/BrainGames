'use strict'

const Player = require('./player');

module.exports = class Game {
    players = []

    addPlayer(socket) {
        let player = new Player(socket);
        player.addInputListener(this.input);
        this.players.push(player);
    }

    input(player, data) {

    }
}
