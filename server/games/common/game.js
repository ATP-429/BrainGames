//This file contains functions for server side management of games, like taking input/output etc

'use strict'

const Player = require('./player');

module.exports = class Game {
    //rawInput: Sends every user input at every 1/60th of a second, that is,
    //          mouse coordinates, mouse presses, key presses at every 1/60th of a second.
    //          Used for continuous games [Like shooting games, for eg]
    //          as opposed to games like candy crush
    details = {rawInput: false, rawState: false} //Default configurations
    privatestate = {}; //This will hold the variables ONLY FOR THE SERVER that'll be used by the game during execution, these variables won't be passed to client
    publicstate = {}; //These variables will be used by either the server or client. They will be passed to client on sendGlobalState() call
    players = []

    constructor(details) {
        this.details = {...this.details, ...details};
        //Just like raw inputs, we send raw state data every given amount of time
        //Again, useful for continuous games like call of duty
        if(this.details.rawState) {
            setInterval(() => {
                this.sendGlobalState();
            }, 1000/this.details.statesPerSec);
        }

        if(this.details.rawServerUpdates) {
            setInterval(() => {
                this.update();
            }, 1000/this.details.serverUpdatesPerSec);
        }
    }

    update() {

    }

    sendGlobalState() {
        for(let player of this.players) {
            player.socket.emit('state', this.publicstate)
            for(let p of this.players) {
                player.socket.emit('state', {[p.id]: p.public2state});
            }
        }
    }

    sendAllStates() {
        for(let player of this.players) {
            player.socket.emit('state', this.publicstate)
            for(let p of this.players) {
                player.socket.emit('state', {[p.id]: p.public2state});
            }
            player.socket.emit('state', player.publicstate);
        }
    }

    sendPlayerState(player) {
        player.socket.emit('state', player.publicstate);
        for(let p of this.players) {
            player.socket.emit('state', {[p.id]: p.public2state});
        }
    }

    sendAllPlayerStates() {
        for(let player of this.players) {
            player.socket.emit('state', player.publicstate)
        }
    }

    sendToPlayer(player, state) {
        player.socket.emit('state', state);
    }

    sendPlayersList() {
        for(let player of this.players) {
            for(let p of this.players) {
                player.socket.emit('players', p.id)
            }
        }
    }

    addPlayer(socket) {
        let player = new Player(socket);
        socket.on('input', (data, callback) => {
            this.input(player, data);
            callback('ok');
        })
        this.players.push(player);
    }

    input(player, data) {
        //console.log(`Received input ${data} from player ${player.id}`);
        // try {
        //     if(data.mouse.click)
        //         console.log(`Click at ${data.mouse.x}, ${data.mouse.y} on canvas`);
        //     if(data.key && data.key.KeyF)
        //         console.log(`Key F pressed`);
        // }
        // catch(e) {
        //     console.log("unknown input");
        // }
    }

    getDetails() {
        return this.details;
    }
}
