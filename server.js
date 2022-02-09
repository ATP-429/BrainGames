'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const responder = require('./responder')

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
})

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/request', responder.respond); //respond is a function defined in responder.js

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
