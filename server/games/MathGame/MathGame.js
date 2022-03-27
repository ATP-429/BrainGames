const { Timestamp } = require('mongodb');
const Game = require('./../common/game');
const MathGamePlayer = require('./MathGamePlayer');

const sleep = (ms) => { return new Promise((resolve) => { setTimeout(resolve, ms); }); }
const getrand = (arr) => { return arr[Math.floor(Math.random()*arr.length)]; }

module.exports = class MathGame extends Game {
    _ops = ['+', '-', '/', '*'];
    _digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    constructor(details) {
        super({
            name: 'MathGame',
            renderOnUpdate: true,

            canvasWidth: 600,
            canvasHeight: 600,
            ...details
        });

        this._playerWait = true;
        this._width = 5;
        this._height = 5;
        this._grid=[];
        for(let i = 0; i < this._width; i++) {
            this._grid[i] = [];
            for(let j = 0; j < this._height; j++) {
                this._grid[i][j] = this.createRandomTile();
            }
        }
        this._grid[2][3].occupied = true;

        this.sendAllStates();
        this.perform();
    }

    async perform() {
        // if(this.$players.length < 2) {
        //     await sleep(1000);
        //     this._playerWait = true;
        //     this.sendAllStates();
        //     this.perform();
        //     return;
        // }
        // else {
            this._playerWait = false;
            this.sendAllStates();
            await sleep(5000);
            this.perform();
        //}
    }

    isOperator(ch) {
        return this._ops.includes(ch);
    }

    input(player, data) {
        if(data.pick) {
            if(!this._grid[data.i][data.j].occupied) {
                this._grid[data.i][data.j].occupied = true;
                this._grid[data.i][data.j].player = player.$id;
                player._picked.push(this._grid[data.i][data.j]);
                if(player._picked.length == 3) {
                    if(this.isOperator(player._picked[1].text)) {
                        console.log(player.eval());
                        if(player.eval()==this.$ans) {
                            player.score++;
                        }
                    }
                }

                this.sendAllStates();
            }
        }
        super.input(player, data);
    }

    createRandomTile() {
        return {occupied: false, player: null, text: getrand(this._ops.concat(this._digits))};
    }

    update() {

    }

    onPlayerJoin(player) {
        super.onPlayerJoin(player);
    }

    //Overrides method from parent class to create our own MathGamePlayer
    createPlayer(socket) {
        return new MathGamePlayer(socket);
    }
}
