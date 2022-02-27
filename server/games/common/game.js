//This file contains functions for server side management of games, like taking input/output etc

'use strict'

const Player = require('./player');

module.exports = class Game {
    //rawInput: Sends every user input at every 1/60th of a second, that is,
    //          mouse coordinates, mouse presses, key presses at every 1/60th of a second.
    //          Used for continuous games [Like shooting games, for eg]
    //          as opposed to games like candy crush
    $details = {rawInput: false, rawState: false} //Default configurations
    $players = []
    $chats_count = 0

    constructor(details) {
        this.$details = {...this.$details, ...details};
        //Just like raw inputs, we send raw state data every given amount of time
        //Again, useful for continuous games like call of duty
        if(this.$details.rawState) {
            setInterval(() => {
                this.sendGlobalState();
            }, 1000/this.$details.statesPerSec);
        }

        if(this.$details.rawServerUpdates) {
            setInterval(() => {
                this.update();
            }, 1000/this.$details.serverUpdatesPerSec);
        }
    }

    update() {

    }

    //Send the environment variables (Public variables of this game object)
    sendGlobalState() {
        for(let player of this.$players) {
            player.emit('state', this.getPublicVars())
        }
    }

    //Send ALL of the variables that the client has access to
    sendAllStates() {
        for(let player of this.$players) {
            let pdata = {};
            for(let p of this.$players) {
                pdata[p.$id] = p.getGlobalVars();
            }
            player.emit('state', {pdata: pdata, ...this.getPublicVars()});
        }
    }

    //Send only the players' variables to themselves
    sendAllPlayerStates() {
        for(let player of this.$players) {
            player.emit('state', {pdata: {[player.$id]: player.getPlayerVars()}});
        }
    }

    //Send specific update to specific player
    sendToPlayer(player, state) {
        player.emit('state', state);
    }

    sendStateToAllPlayers(state) {
        for(let player of this.$players) {
            player.emit('state', state);
        }
    }

    sendAllStatesToPlayer(player) {
        let pdata = {};
        for(let p of this.$players) {
            pdata[p.$id] = p.getGlobalVars();
        }
        player.emit('state', {pdata: pdata, ...this.getPublicVars()});
    }

    //Send players ids to all players
    sendPlayersList() {
        for(let player of this.$players) {
            player.emit('players', this.$players.map(x => x.$id))
        }
    }

    addPlayer(socket) {
        let player = this.createPlayer(socket);
        socket.on('input', (data, callback) => {
            this.input(player, data);
            callback('ok');
        });

        socket.on('chat', data => {
            this.sendStateToAllPlayers({chat: {[this.$chats_count]: {name: player.$id, content: data}}});
            this.$chats_count++;
        });

        this.$players.push(player);
        this.onPlayerJoin(player);
    }

    //Override this method if you want to do other things while creating player
    createPlayer(socket) {
        return new Player(socket);
    }

    removePlayer(socket) {
        let index = this.$players.findIndex(player => player.$socket === socket);
        let player = this.$players[index];
        this.$players.splice(index, 1); //Remove player from the players array
        this.onPlayerRemove(player);
    }

    onPlayerJoin(player) {
        this.sendPlayersList();
        this.sendAllStates();
    }

    onPlayerRemove(player) {
        this.sendPlayersList();
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
        return this.$details;
    }

    getPublicVars() {
        let vars = {};
        for(let prop in this) {
            if(prop.charAt(0) != '$')
                vars[prop] = this[prop];
        }
        return vars;
    }
}
