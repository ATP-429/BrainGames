const { options } = require('nodemon/lib/config');
const Player = require('./../common/player.js');

module.exports = class MathGamePlayer extends Player {
    /* $ : Variables starting with $ are private. They'll never be shared with anyone. They only exist on the server [For example, cards held by the dealer in a gambling game]
     * _ : Variables starting with _ are public. They'll be shared with every single player in the game [For example, score/health of a player]
     * Variables starting with neither in a player class, are variables that will be shared only with that particular player in the game [For example, the cards held by a player in a gambling game]
     */

    _score = 0;
    _picked = [];
    _grabbed = [];
    _inventory = [];

    constructor(socket) {
        super(socket);
        this._canPick = true;
    }

    reset() {
        this._picked = [];
        let newInventory = [];
        for(let tile of this._inventory) {
            if(!tile.change) {
                newInventory.push(tile);
            }
        }
        this._inventory = newInventory;
    }

    eval() {
        return eval(`${this._picked[0].text}${this._picked[1].text}${this._picked[2].text}`);
    }
}
