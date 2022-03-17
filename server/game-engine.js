'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const http = require('http');
const responder = require('./responder')
const socketIO = require('socket.io');
const { v4 : uuidv4 } = require('uuid');
const Game = require('./games/common/game');
const HelloGame = require('./games/HelloGame/HelloGame');
const DescribeGame = require('./games/DescribeGame/DescribeGame');

var currentGames = {}

module.exports = class GameEngine {
    constructor(io) {
        this.io = io;
        this.io.on('connection', (socket) => {
            let game = currentGames[socket.handshake.query.id];
            if(game != undefined) {
                socket.emit('msg', `Connected to game ${socket.handshake.query.id}`);
                socket.emit('details', game.getDetails());
                socket.on('ready', (data) => game.addPlayer(socket)); //Client initialization is done, so proceed by adding the player to the game
                socket.on('disconnect', (data) => game.removePlayer(socket));
            }
            else {
                socket.emit('msg', "Game not found");
                socket.disconnect();
            }
        })

        this.create_game('DescribeGame');
    }

    //Create a game given the game name and return its id
    async create_game(name) {
        let id = uuidv4();
        currentGames[id] = eval(`new ${name}()`);
        return id;
    }

    async get_games() {
        return Object.keys(currentGames);
    }
}
