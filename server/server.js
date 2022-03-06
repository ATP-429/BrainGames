'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const http = require('http');
const path = require('path');
const responder = require('./responder')
const socketIO = require('socket.io');
const cors = require('cors');
const { v4 : uuidv4 } = require('uuid');
const GameEngine = require('./game-engine');
const multer = require('multer');

const port = 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data')
  },
  filename: function (req, file, cb) {
    let file_id = uuidv4();
    cb(null, file_id);
  }
})

const upload = multer({ storage: storage }).single('file');


var app = express();
var io = socketIO();

app.get('/', async (req, res) => {
    res.sendFile('public/index.html', {root: path.join(__dirname, '..')});
})

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.post('/request', responder.responder); //respond is a function defined in responder.js
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError) {
            res.end(JSON.stringify({detail: "File not uploaded!" + err}));
        }
        else {
            res.end(JSON.stringify({id: req.file.filename, detail: "Successfully uploaded!"}));
        }
    })
})
app.post('/download', (req, res) => {
    res.download('data/'+req.body.file_id);
})

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

io.listen(server);

responder.loadGameEngine(new GameEngine(io))
