const Game = require('./../common/game');
const DescribeGamePlayer = require('./DescribeGamePlayer');

module.exports = class DescribeGame extends Game {
    $shape_types = ['circle', 'triangle', 'hexagon', 'star'];
    $shape_texts = ['A', 'B', 'C', 'D'];
    $shape_colors = ['red', 'green', 'lightblue', 'gold'];

    _shapes = [];

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

        this.genNewShapes(4);
    }

    genNewShapes(n) {
        this._shapes = []
        for(let i = 0; i < n; i++) {
            this._shapes.push({
                id: i,
                type: this.$shape_types[Math.floor(Math.random()*this.$shape_types.length)],
                color: this.$shape_colors[Math.floor(Math.random()*this.$shape_colors.length)],
                text: this.$shape_texts[Math.floor(Math.random()*this.$shape_texts.length)]
            });
        }
    }

    hide() {
        this._shapes = this._shapes.map(x => {});
    }

    input(player, data) {
        super.input(player, data);
        if(data.hide) {
            this.hide();
        }
        this.sendAllStates();
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
