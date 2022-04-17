const { Timestamp } = require('mongodb');
const { timeout } = require('nodemon/lib/config');
const Game = require('./../common/game');
const MathGamePlayer = require('./MathGamePlayer');

const sleep = (ms) => { return new Promise((resolve) => { setTimeout(resolve, ms); }); }
const getrand = (arr) => { return arr[Math.floor(Math.random()*arr.length)]; }

module.exports = class MathGame extends Game {
    _ops = ['+', '-', '/', '*', '%'];
    _digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    _maxInvSize = 5;
    _answerTime = 5000;

    $randomization = 0.3; //Probability of a tile being changed after every round
    $grabability = 0.1; //Probability of tile being able to be grabbed

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
            this._ans = Math.floor(Math.random()*20);
            await this.sendStateToAllPlayers({input: true});
            this.reset();
            for(let player of this.$players) {
                player.reset();
            }
            await this.sendAllStates();
            await sleep(this._answerTime);
            await this.sendAllStates();
            await sleep(1000);
            await this.sendStateToAllPlayers({input: false});
            await this.sendAllStates();
            this.perform();
        //}
    }

    reset() {
        for(let i = 0; i < this._width; i++) {
            for(let j = 0; j < this._height; j++) {
                if(this._grid[i][j].change || Math.random() < this.$randomization) {
                    this._grid[i][j] = this.createRandomTile();
                }
            }
        }
    }

    async checkAnswer(player) {
        if(player._picked.length == 3) {
            if(this.isOperator(player._picked[1].text)) {
                if(player.eval()==this._ans) {
                    player._score++;
                    await this.sendToPlayer(player, {win: true});
                    for(let tile of player._picked) {
                        tile.status='right';
                        tile.occupied=null;
                        tile.change = true;
                    }
                }
                else {
                    player._score--;
                    for(let tile of player._picked) {
                        tile.status='wrong';
                        tile.occupied=null;
                        tile.change = true;
                    }
                }
            }
        }

        this.sendAllStates();
    }

    async input(player, data) {
        if(data.put && player._picked.length < 3) {
            player._picked.push(player._inventory[data.i]);

            this.checkAnswer(player);
            this.sendAllStates();
        }
        else if(data.pick) {
            if(this._grid[data.i][data.j].grabbable && this._grid[data.i][data.j].status != "disabled") {
                if(player._inventory.length < this._maxInvSize) {
                    player._inventory.push({...(this._grid[data.i][data.j])});
                    this._grid[data.i][data.j].status='disabled';
                    this._grid[data.i][data.j].change = true; //Set change to true so tile changes next round
                    await this.sendAllStates();
                }
            }
            else if(player._picked.length < 3) {
                if(!this._grid[data.i][data.j].occupied && this._grid[data.i][data.j].text != '') {
                    this._grid[data.i][data.j].occupied = true;
                    this._grid[data.i][data.j].player = player.$id;
                    this._grid[data.i][data.j].change = true; //Set change to true so tile changes next round
                    player._picked.push(this._grid[data.i][data.j]);

                    this.checkAnswer(player);
                    this.sendAllStates();
                }
            }
        }
    }

    isOperator(ch) {
        return this._ops.includes(ch);
    }

    createRandomTile() {
        return {occupied: false, player: null, text: getrand(this._ops.concat(this._digits)), grabbable: (Math.random() < this.$grabability ? true : false)};
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
