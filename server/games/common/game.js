//This file contains functions for server side management of games, like taking input/output etc

'use strict'

const Player = require('./player');

module.exports = class Game {
    //rawInput: Sends every user input at every 1/60th of a second, that is,
    //          mouse coordinates, mouse presses, key presses at every 1/60th of a second.
    //          Used for continuous games [Like shooting games, for eg]
    //          as opposed to games like candy crush
    details = {rawInput: false, rawState: false} //Default configurations
    state = {}; //This will hold the variables that'll be used by the game during execution
    players = []

    constructor(details) {
        this.details = {...this.details, ...details};
        //Just like raw inputs, we send raw state data every given amount of time
        //Again, useful for continuous games like call of duty
        if(this.details.rawState) {
            setInterval(() => {
                this.sendState();
            }, 1000/this.details.statesPerSec);
        }

        setInterval(() => {
            this.update();
        }, 1000/this.details.serverUpdatesPerSec);
    }

    update() {

    }

    sendState() {
        for(let player of this.players) {
            player.socket.emit('state', this.state)
        }
    }

    addPlayer(socket) {
        let player = new Player(socket);
        player.addInputListener(this.input);
        this.players.push(player);
    }

    input(player, data) {
        //console.log(`Received input ${data} from player ${player.id}`);
        if(data.mouse.click)
            console.log(`Click at ${data.mouse.x}, ${data.mouse.y} on canvas`);
        if(data.key && data.key.KeyF)
            console.log(`Key F pressed`);
    }

    getDetails() {
        return this.details;
    }
}
