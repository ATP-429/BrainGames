//This file contains functions for client side management of games, like sending input/output etc
var Game = class {
    state = {}; //This will hold the variables that'll be used by the game during execution
    players = []; //Holds the ids of players in the game

    constructor(socket, details, getInput, setGameState) {
        this.socket = socket;
        this.details = details;
        this.getInput = getInput;
        this.setGameState = setGameState; //This will be used to update the game state variables in react
        this.reactRender = reactRender; //Call this function to update the canvas in react using double buffering. This function further calls our game's render method on a bufferCanvas ctx

        if(this.details.rawInput) {
            setInterval(() => {
                this.sendInput();
            }, 1000/this.details.inputsPerSec)
        }

        if(this.details.rawRender) {
            setInterval(() => {
                this.reactRender();
            }, 1000/this.details.rendersPerSec)
        }

        if(this.details.rawClientUpdates) {
            setInterval(() => {
                this.update();
            }, 1000/this.details.clientUpdatesPerSec);
        }

        socket.on('state', state => this.updateState(state));
        socket.on('players', list => this.updatePlayersList(list));
    }

    appendInput() {
        return {};
    }

    sendInput() {
        let input = this.getInput();
        input = {...input, ...this.appendInput()};
        this.socket.emit('input', input, (response) => {
            if(response === 'ok')
                this.indicateInput();
        });
    }

    sendImmediateInput(input) {
        this.socket.emit('input', input, (response) => {
            if(response === 'ok')
                this.indicateInput();
        });
    }

    updatePlayersList(list) {
        players = list;
    }

    //Updates the state of the game, and overwrites values passed from the new state
    //This 'state' variable will be useful if, for example, the server sends a state
    //update saying one object's visibility should be made false
    //this.state will hold local variables, that the server doesn't care about
    updateState(newState) {
        this.state = {...this.state, ...newState}; //Update state variables, if any changes
        //NOTE: We MUST assign state to this.state after the above updation,
        //otherwise reference to this.state changes, and you can't use this state variable to modify this.state anymore

        this.indicateUpdate();
        this.updateReact();
    }

    //Override this method to run your own game logic. This method will run clientUpdatesPerSec number of times per second
    update() {

    }

    //Update the game state variables in the react app
    updateReact() {
        this.setGameState({...this.state}); //We have to use array spread because https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render
    }

    indicateInput() {
        this.state.inputTaken = true;
        this.updateReact();
        setTimeout(() => {
            this.state.inputTaken = false;
            this.updateReact();
        }, 30);
    }

    indicateUpdate() {
        this.state.updateDone = true;
        this.updateReact();
        setTimeout(() => {
            this.state.updateDone = false;
            this.updateReact();
        }, 30);
    }

    //Override this method to run your own game rendering logic. This method will run rendersPerSec number of times per second
    render(ctx) {

    }
}
