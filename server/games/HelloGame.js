const Game = require('./common/game');

module.exports = class HelloGame extends Game {
    constructor() {
        super({
            name: 'HelloGame',
            rawInput: true,
            inputsPerSec: 1,
            rawState: true,
            statesPerSec: 1,
            rawRender: true,
            rendersPerSec: 60,

            canvasWidth: 600,
            canvasHeight: 600,

            rawClientUpdates: true,
            clientUpdatesPerSec: 60,
            rawServerUpdates: true,
            serverUpdatesPerSec: 60
        });

        this.publicstate.x = 0;
        this.publicstate.y = 0;
    }

    input(player, data) {
        super.input(player, data);
    }

    update() {
        this.publicstate.x += 0.1;
        this.publicstate.y += 0.1;
    }
}
