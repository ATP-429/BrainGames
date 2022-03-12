const Game = require('./../common/game');
const DescribeGamePlayer = require('./DescribeGamePlayer');

const sleep = (ms) => { return new Promise((resolve) => { setTimeout(resolve, ms); }); }

module.exports = class DescribeGame extends Game {
    $shape_types = ['circle', 'triangle', 'hexagon', 'star'];
    $shape_texts = ['A', 'B', 'C', 'D'];
    $shape_colors = ['red', 'green', 'blue', 'yellow'];
    $queries = ['type', 'text', 'color'];
    _nShapes = 2;
    _shapes = [];

    constructor() {
        super({
            name: 'DescribeGame',
            rawRender: false,
            renderOnUpdate: true,

            canvasWidth: 600,
            canvasHeight: 600,

            rawClientUpdates: false,
        });


        this.perform();
    }

    //Every step of the game will run here. This function calls itself at the end
    async perform() {
        await sleep(1000);
        this.genNewShapes(4);
        this.sendStateToAllPlayers({win: 0});
        this.sendAllStates();
        await sleep(4000);
        //await sleep();
        let query = this.$queries[Math.floor(Math.random()*3)];
        let queryid = Math.floor(Math.random()*this._shapes.length);
        this.$ans = this._shapes[queryid][query];
        console.log(this.$ans);
        this.sendStateToAllPlayers({'input': true, 'query': `${query}, figure ${queryid+1}` });
        this.$shapes = this._shapes;
        this._shapes = [];
        await sleep(5000);
        this.sendAllStates();
        this.sendStateToAllPlayers({input: false});

        this.perform();
    }

    genNewShapes(n) {
        this._shapes = []
        for(let i = 0; i < this._nShapes; i++) {
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
        if(data.answer.toUpperCase() === this.$ans.toUpperCase()) {
            console.log("Player won");
            player._score++;
            this.sendToPlayer(player, {win: 1});
            this.sendAllStates();
        }
        else {
            this.sendToPlayer(player, {win: -1});
        }
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
