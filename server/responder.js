'use strict'

const session = require('express-session');
const engine = require('./engine');
engine.connect();

module.exports = {
    responder: async (actualRequest, actualResponse) => {
        let req = actualRequest.body;
        let res = {};
        let success = () => {res['success'] = 1};
        let fail = () => {res['success'] = 0};
        let detail = (str) => {res['detail'] = str};
        switch(req['request_type']) {
            case 'register_score':
                await engine.register_score(req.data);

                break;
            case 'login':
                await engine.login(req['username'], req['password']).then((user) => {
                    if(user !== null) {
                        actualResponse.cookie('userID', user._id.toString());
                        success();
                        detail("Logged in successfully!");
                    }
                    else {
                        fail();
                        detail("Incorrect username/password");
                    }
                });
                break;
            
            case 'logout':
                actualResponse.clearCookie('userID');
                break;

            case 'register':
                await engine.register(req['username'], req['email'], req['password']).then((status) => {
                    if(status['acknowledged']) {
                        success();
                        detail("Registered successfully");
                    }
                });
                break;

            case 'get_details':
                await engine.get_details(req['id']).then((user) => {
                    if(user != null)
                        user.password = null;
                    res.details = user;
                    success();
                    detail("User details returned successfully");
                });
                break;

            case 'create_game':
                await engine.create_game(req.name, req.details).then((id) => {
                    if(id != null) {
                        success();
                        res.id = id;
                        detail("Game created successfully");
                    }
                    else {
                        fail();
                        detail("Game not created");
                    }
                });
                break;

            case 'get_games':
                await engine.get_games().then((list) => {
                    res.list = list;
                    success();
                })
                break;

            case 'get_games_list':
                await engine.get_games_list().then((list) => {
                    res.list = list;
                    success();
                })
                break;
                
            case 'poll':
                success();
                detail("Loud and clear");
                break;

            default:
                fail();
                detail("Unkown request");
        }

        actualResponse.end(JSON.stringify(res));
    },

    loadGameEngine: (gameEngine) => {
        globalThis.gameEngine = gameEngine
    }
}
