'use strict'

const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const express = require('express');
const bcrypt = require('bcryptjs');
const uri = require('./mongodburi');
const client = new MongoClient(uri);

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

    get_details: async (userID) => {
        return client.db('braingames').collection('user_cred').findOne({_id: ObjectId(userID)}).then((user) => {
            return user;
        });
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
                    if(auth(user, password)) { //If auth is successfull
                        return user;
                    }
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

    create_game: async (name, details) => {
        return gameEngine.create_game(name, details).then(id => {
            if(id == null)
                return null;
            else
                return id;
        });
    },

    get_games: async () => {
        return gameEngine.get_games().then(list => {
            return list;
        })
    },

    get_games_list: async() => {
        return gameEngine.get_games_list().then(list => {
            return list;
        })
    },

    connect: async () => {
        try {
            await client.connect();
        } catch(e) {
            console.error(e);
        }
    },

    disconnect: async () => {
        try {
            await client.close();
        } catch(e) {
            console.error(e);
        }
    }
}
