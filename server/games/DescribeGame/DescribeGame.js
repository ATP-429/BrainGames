const Game = require('./../common/game');
const DescribeGamePlayer = require('./DescribeGamePlayer');

const sleep = (ms) => { return new Promise((resolve) => { setTimeout(resolve, ms); }); }
const getrand = (arr) => { return arr[Math.floor(Math.random()*arr.length)]; }

//Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => { let currentIndex = array.length,  randomIndex; while (currentIndex != 0) {    randomIndex = Math.floor(Math.random() * currentIndex);currentIndex--;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];} return array; }

module.exports = class DescribeGame extends Game {
    $shape_type = ['circle', 'triangle', 'hexagon', 'star'];
    $shape_text = ['A', 'B', 'C', 'D'];
    $shape_color = ['red', 'green', 'blue', 'yellow'];
    $queries = ['type', 'text', 'color'];
    _nShapes = 3;
    _shapes = [];
    _answerTime = 5000; //Time which user gets to answer
    _visibleTime = 5000; //Time for which shapes are visible
    _intervalTime = 1000; //Time between two rounds

    constructor(details) {
        super({
            name: 'DescribeGame',
            rawRender: false,
            renderOnUpdate: true,

            canvasWidth: 600,
            canvasHeight: 600,

            rawClientUpdates: false,
            ...details
        });


        this.perform();
    }

    //Every step of the game will run here. This function calls itself at the end
    async perform() {
        this.reset();
        await sleep(this._intervalTime);
        this.genNewShapes(4);
        this.sendStateToAllPlayers({win: 0});
        this.sendAllStates();
        await sleep(this._visibleTime);
        //await sleep();
        let query = getrand(this.$queries);
        let queryid = Math.floor(Math.random()*this._shapes.length);
        this.$ans = this._shapes[queryid][query];
        this.sendStateToAllPlayers({input: true, query: `${query}, figure ${queryid+1}`, options: this.genOptions(query, this.$ans, 5)});
        this.$shapes = this._shapes;
        this._shapes = [];
        await sleep(this._answerTime);
        this.sendAllStates();
        this.sendStateToAllPlayers({input: false});

        this.perform();
    }

    //resets all variables
    reset() {
        this.answer_index = -1; //GLOBAL public variable set to -1
    }

    //Generates n random options, one of which is the correct answer
    genOptions(query, ans, n) {
        let options = []
        let genOption = () => {
            let option = {}
            option.type = getrand(this.$queries);
            option.value = getrand(this['$shape_'+option.type]);
            return option;
        }
        options[0] = {type: query, value: ans};
        for(let i = 0; i < n-1; i++) {
            let option = genOption();
            if(options.findIndex(element => element.type == option.type && element.value == option.value) == -1)
                options.push(option);
            else
                i--;
        }
        shuffle(options);
        this.$answer_index = options.findIndex(element => element.type == query && element.value == ans); //Index at which real answer is put
        return options;
    }

    genNewShapes(n) {
        this._shapes = []
        for(let i = 0; i < this._nShapes; i++) {
            this._shapes.push({
                id: i,
                type: this.$shape_type[Math.floor(Math.random()*this.$shape_type.length)],
                color: this.$shape_color[Math.floor(Math.random()*this.$shape_color.length)],
                text: this.$shape_text[Math.floor(Math.random()*this.$shape_text.length)]
            });
        }
    }

    hide() {
        this._shapes = this._shapes.map(x => {});
    }

    input(player, data) {
        super.input(player, data);
        if(data.answer != undefined) {
            if(data.answer.toUpperCase() === this.$ans.toUpperCase()) {
                player._score++;
                this.sendToPlayer(player, {win: 1, answer_index: this.$answer_index, _shapes: this.$shapes});
            }
            else {
                player._score--;
                this.sendToPlayer(player, {win: -1, answer_index: this.$answer_index, _shapes: this.$shapes});
            }
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
