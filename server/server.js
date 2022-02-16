'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const http = require('http');
const path = require('path');
const responder = require('./responder')
const socketIO = require('socket.io');
const { v4 : uuidv4 } = require('uuid');
const GameEngine = require('./game-engine');

const port = 3000;

var app = express();
var io = socketIO();

app.get('/', async (req, res) => {
    res.sendFile('public/index.html', {root: path.join(__dirname, '..')});
})

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/request', responder.responder); //respond is a function defined in responder.js

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

io.listen(server, {
    cors: {
        origin: "https://example.com",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

responder.loadGameEngine(new GameEngine(io))
