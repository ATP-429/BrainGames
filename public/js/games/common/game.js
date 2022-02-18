//This file contains functions for client side management of games, like sending input/output etc
var Game = class {
    state = {}; //This will hold the variables that'll be used by the game during execution

    constructor(socket, details, getInput) {
        this.socket = socket;
        this.details = details;
        this.getInput = getInput;

        if(this.details.rawInput) {
            setInterval(() => {
                this.sendInput();
            }, 1000/this.details.inputsPerSec)
        }

        socket.on('state', state => this.updateState(state));
    }

    appendInput() {
        return {};
    }

    sendInput() {
        let input = this.getInput();
        input = {...input, ...this.appendInput()};
        this.socket.emit('input', input);
    }

    //Updates the state of the game, and overwrites values passed from the new state
    //This 'state' variable will be useful if, for example, the server sends a state
    //update saying one object's visibility should be made false
    //this.state will hold local variables, that the server doesn't care about
    update(newState) {
        this.state = {...this.state, ...newState}; //Update state variables, if any changes
        //NOTE: We MUST assign state to this.state after the above updation,
        //otherwise reference to this.state changes, and you can't use this state variable to modify this.state anymore
        let state = this.state;
        let input = this.getInput();

        
    }

    updateState(state) {
        this.state = {...this.state, ...state};
    }

    render(ctx) {

    }
}
