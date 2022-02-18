const Game = require('./common/game');

module.exports = class HelloGame extends Game {
    constructor() {
        super({
            name: 'HelloGame',
            rawInput: true,
            inputsPerSec: 1,
            rawState: true,
            statesPerSec: 60,
            rawRender: true,
            rendersPerSec: 60,

            canvasWidth: 600,
            canvasHeight: 600,

            clientUpdatesPerSec: 60,
            serverUpdatesPerSec: 60
        });

        this.state.x = 0;
        this.state.y = 0;
    }

    input(player, data) {
        super.input(player, data);
    }

    update() {
        this.state.x += 0.1;
        this.state.y += 0.1;
    }
}
