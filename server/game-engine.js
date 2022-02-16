'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const http = require('http');
const responder = require('./responder')
const socketIO = require('socket.io');
const { v4 : uuidv4 } = require('uuid');
const Game = require('./games/common/game');

var currentGames = {}

module.exports = class GameEngine {
    constructor(io) {
        this.io = io;
        this.io.on('connection', (socket) => {
            let game = currentGames[socket.handshake.query.id];
            if(game != undefined) {
                socket.emit('msg', "Connected to game");
                game.addPlayer(socket);
            }
            else {
                socket.emit('msg', "Game not found");
                socket.disconnect();
            }
        })
    }

    //Create a game given the game name and return its id
    async create_game(name) {
        let id = uuidv4();
        currentGames[id] = eval(`new ${name}()`);
        return id;
    }
}
