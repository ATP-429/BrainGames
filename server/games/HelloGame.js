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

        this.publicstate.score = 0;
    }

    input(player, data) {
        super.input(player, data);
        if(data.add)
            this.publicstate.score++;
        else if(data.sub)
            this.publicstate.score--;
        this.sendAllStates();
    }

    update() {

    }
}
