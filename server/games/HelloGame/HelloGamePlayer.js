const Player = require('./../common/player.js');

module.exports = class HelloGamePlayer extends Player {
    /* $ : Variables starting with $ are private. They'll never be shared with anyone. They only exist on the server [For example, cards held by the dealer in a gambling game]
     * _ : Variables starting with _ are public. They'll be shared with every single player in the game [For example, score/health of a player]
     * Variables starting with neither in a player class, are variables that will be shared only with that particular player in the game [For example, the cards held by a player in a gambling game]
     */

    _score = 0;

    constructor(socket) {
        super(socket);
    }
}
