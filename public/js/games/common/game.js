//This file contains functions for client side management of games, like sending input/output etc
var Game = class {
  constructor(socket, details, getInput, setGameState) {
    this.state = {
      players: {}
    }; //This will hold the variables that'll be used by the game during execution

    this.state.pdata = {};
    this.socket = socket;
    this.details = details;
    this.getInput = getInput;
    this.setGameState = setGameState; //This will be used to update the game state variables in react

    this.reactRender = reactRender; //Call this function to update the canvas in react using double buffering. This function further calls our game's render method on a bufferCanvas ctx

    if (this.details.rawInput) {
      setInterval(() => {
        this.sendInput();
      }, 1000 / this.details.inputsPerSec);
    }

    if (this.details.rawRender) {
      setInterval(() => {
        this.reactRender();
      }, 1000 / this.details.rendersPerSec);
    }

    if (this.details.rawClientUpdates) {
      setInterval(() => {
        this.update();
      }, 1000 / this.details.clientUpdatesPerSec);
    }

    socket.on('state', state => this.updateState(state));
    socket.on('players', list => this.updatePlayersList(list));
    socket.emit('ready', 1); //Tell the server that client initialization is done, so server can proceed.
  }

  appendInput() {
    return {};
  }

  sendInput() {
    let input = this.getInput();
    input = { ...input,
      ...this.appendInput()
    };
    this.socket.emit('input', input, response => {
      if (response === 'ok') this.indicateInput();
    });
  }

  sendImmediateInput(input) {
    this.socket.emit('input', input, response => {
      if (response === 'ok') this.indicateInput();
    });
  }

  sendMessage(msg) {
    this.socket.emit('chat', msg);
  }

  updatePlayersList(list) {
    this.state.players = list;

    for (let id in this.state.pdata) {
      if (list.indexOf(id) == -1) {
        delete this.state.pdata[id];
      }
    }

    this.indicateUpdate();
    this.updateReact();
  } //Updates the state of the game, and overwrites values passed from the new state
  //This 'state' variable will be useful if, for example, the server sends a state
  //update saying one object's visibility should be made false
  //this.state will hold local variables, that the server doesn't care about


  updateState(newState) {
    //deeply update nested objects. https://stackoverflow.com/questions/46545026/a-better-way-to-deep-update-an-object-in-es6-with-lodash-or-any-other-library
    //NOTE: Using mergeWith and providing a custom function, we make it so that arrays are NOT merged.
    //For eg, if this.state = {a: [3, 7]} and newState = {a: [3, 2]}, this.state will become {a: [3, 2]} NOT {a: [3, 7, 2]}
    //this.state = _.mergeWith(this.state, newState);
    // console.log(this.state);
    this.state = _.mergeWith(this.state, newState, (objValue, srcValue, key, object, source, stack) => {
      if (Object.prototype.toString.call(srcValue) === '[object Array]') {
        return srcValue; //If object we are merging is an array, just add it to this.state directly, no merging
      }
    }); //basically, the same thing as below but for all potential nested objects, not just pdata
    //this.state = {...this.state, ...newState, pdata: {...this.state.pdata, ...newState.pdata}}; //Update state variables, if any changes
    //NOTE: We MUST assign state to this.state after the above updation,
    //otherwise reference to this.state changes, and you can't use this state variable to modify this.state anymore

    this.indicateUpdate();
    this.updateReact();

    if (this.details.renderOnUpdate) {
      this.reactRender();
    }
  } //Override this method to run your own game logic. This method will run clientUpdatesPerSec number of times per second


  update() {} //Update the game state variables in the react app


  updateReact() {
    this.setGameState(JSON.parse(JSON.stringify(this.state))); //We have to make a deep clone of state because https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render
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
  } //Override this method to run your own game rendering logic. This method will run rendersPerSec number of times per second


  render(ctx) {}

};