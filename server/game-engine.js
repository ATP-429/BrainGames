'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const http = require('http');
const responder = require('./responder')
const socketIO = require('socket.io');
const { v4 : uuidv4 } = require('uuid');
const Game = require('./games/common/game');
const fs = require('fs');

var currentGames = {};
var privateGames = {};

var gamesList = [];

module.exports = class GameEngine {
    constructor(io) {
        this.io = io;
        this.io.on('connection', (socket) => {
            let game = currentGames[socket.handshake.query.id];
            if(game == undefined) game = privateGames[socket.handshake.query.id];
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

        let data = fs.readFileSync('server/games_list.txt').toString('utf-8').split('\n');
        for(let game of data) {
            eval(`global.${game} = require('./games/${game}/${game}')`);
            gamesList.push(game);
        }

        this.create_game('DescribeGame', {lobbyName: 'Server Lobby - 01'});
        this.create_game('HelloGame', {lobbyName: 'Server Lobby - 02'});
        this.create_game('MathGame', {lobbyName: 'Server Lobby - 03'});
    }

    //Create a game given the game name and return its id
    async create_game(name, details) {
        let id = 'my-game'; //uuidv4();
        details.id = id;
        if(details?.visibility?.toLowerCase() === 'private')
            privateGames[id] = eval(`new global.${name}(details)`);
        else
            currentGames[id] = eval(`new global.${name}(details)`);
        return id;
    }

    async get_games() {
        let lst = []
        for(const [id, game] of Object.entries(currentGames)) {
            lst.push({...game.getDetails()});
        }

        return lst;
    }

    async get_games_list() {
        return gamesList;
    }
}
