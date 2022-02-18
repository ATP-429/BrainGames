'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const bcrypt = require('bcryptjs');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
    } catch(e) {
        console.error(e);
    }
})();

var log = (data) => {
    console.log(data);
}

module.exports =
{
    register: async (username, email, password) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return client.db('braingames').collection('user_cred').insertOne({username: username, email: email, password: hash});
    },

    //Returns user array if login was successful, null otherwise
    login: async (username, password) => {
        return client.db('braingames').collection('user_cred').findOne({username: username}).then((user) => {
            let auth = (user, password) => {
                let hash = user['password']
                return bcrypt.compareSync(password, hash)
            }
            //If user is null, check if they've entered the email
            if(user === null) {
                return client.db('braingames').collection('user_cred').findOne({email: username}).then((user) => {
                    if(user === null) //If user is still null, neither username nor email is in db
                        return null;
                    if(auth(user, password)) //If auth is successfull
                        return user;
                    else
                        return null;
                });
            }
            else if(auth(user, password))
                return user;
            else
                return null;
        });
    },

    create_game: async (name) => {
        return gameEngine.create_game(name).then(id => {
            if(id == null)
                return null;
            else
                return id;
        });
    }
}
