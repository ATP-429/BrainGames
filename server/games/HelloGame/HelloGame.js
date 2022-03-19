const Game = require('./../common/game');
const HelloGamePlayer = require('./HelloGamePlayer');

module.exports = class HelloGame extends Game {
    constructor(details) {
        super({
            name: 'HelloGame',
            rawRender: true,
            rendersPerSec: 60,
            renderOnUpdate: true,

            canvasWidth: 600,
            canvasHeight: 600,

            rawClientUpdates: true,
            clientUpdatesPerSec: 60,
            rawServerUpdates: true,
            serverUpdatesPerSec: 60,
            ...details
        });
    }

    input(player, data) {
        super.input(player, data);
        if(data.add)
            player._score++;
        else if(data.sub)
            player._score--;
        this.sendAllStates();
    }

    update() {

    }

    onPlayerJoin(player) {
        super.onPlayerJoin(player);
    }

    //Overrides method from parent class to create our own HelloGamePlayer
    createPlayer(socket) {
        return new HelloGamePlayer(socket);
    }
}
