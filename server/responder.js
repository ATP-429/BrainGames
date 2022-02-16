'use strict'

const engine = require('./engine');

globalThis.gameEngine = 'hi';

module.exports = {
    responder: async (actualRequest, actualResponse) => {
        let req = actualRequest.body;
        let res = {};
        let success = () => {res['success'] = 1};
        let fail = () => {res['success'] = 0};
        let detail = (str) => {res['detail'] = str};
        switch(req['request_type']) {
            case 'login':
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
                await engine.register(req['username'], req['email'], req['password']).then((status) => {
                    if(status['acknowledged']) {
                        success();
                        detail("Registered successfully");
                    }
                });
                break;

            case 'create_game':
                await engine.create_game(req.name).then((id) => {
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
