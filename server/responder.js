'use strict'

const engine = require('./engine');

module.exports = {
    responder: async (actualRequest, actualResponse) => {
        let req = actualRequest.body;
        let res = {};
        let success = () => {res['success'] = 1};
        let fail = () => {res['success'] = 0};
        let detail = (str) => {res['detail'] = str};

        switch(req['request_type']) {
            case 'login':
                await engine.connect(); //CONNECT TO DB
                await engine.login(req['username'], req['password']).then((user) => {
                    if(user !== null) {
                        success();
                        detail("Logged in successfully!");
                    }
                    else {
                        fail();
                        detail("Incorrect username/password");
                    }
                });
                break;

            case 'register':
                await engine.connect(); //CONNECT TO DB
                await engine.register(req['username'], req['email'], req['password']).then((status) => {
                    if(status['acknowledged']) {
                        success();
                        detail("Registered successfully");
                    }
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

            case 'poll':
                success();
                detail("Loud and clear");
                break;

            default:
                fail();
                detail("Unkown request");
        }

        engine.disconnect(); //DISCONNECT FROM DB

        actualResponse.end(JSON.stringify(res));
    },

    loadGameEngine: (gameEngine) => {
        globalThis.gameEngine = gameEngine
    }
}
