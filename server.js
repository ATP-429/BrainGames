'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
})

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/request', async (actualRequest, actualResponse) => {
    let req = actualRequest.body;
    let client = await connect();
    let res = {};
    switch(req['request_type']) {
        case 'login':
            console.log(`Tried login with ${req['username']} and ${req['password']}`);
            break;

        case 'poll':
            res['detail'] = "Loud and clear";
            break;
    }
    actualResponse.end(JSON.stringify(res));
    client.close();
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

async function connect() {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        return client;
    } catch(e) {
        console.error(e);
    }
}
