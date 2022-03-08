const Game = require('./../common/game');
const DescribeGamePlayer = require('./DescribeGamePlayer');

module.exports = class DescribeGame extends Game {
    _shapes = [{id: 0, type: 'circle', color: 'green', text: 'A'}, {id: 1, type: 'triangle', color: 'red', text: 'B'}];

    constructor() {
        super({
            name: 'DescribeGame',
            rawRender: false,
            renderOnUpdate: true,

            canvasWidth: 600,
            canvasHeight: 600,

            rawClientUpdates: false,
            rawServerUpdates: true,
            serverUpdatesPerSec: 0.5
        });
    }

    input(player, data) {
        super.input(player, data);
        if(data.add)
            player._score++;
        else if(data.sub)
            player._score--;
        this.sendAllStates();

        //NOTE: DEBUG
        this._shapes = [];
    }

    update() {
        this.sendAllStates();
    }

    onPlayerJoin(player) {
        super.onPlayerJoin(player);
        this.sendAllStatesToPlayer(player);
    }

    //Overrides method from parent class to create our own HelloGamePlayer
    createPlayer(socket) {
        return new DescribeGamePlayer(socket);
    }
}
