//This is the react file where we'll handle frontend stuff
//This file will send the data to js/games/common/game.js using react,
//which will then send the data to the server/games/common/game.js
var game = null,
    canvas = null,
    Canvas = null;
create_game('HelloGame').then(res => {
  var socket = io.connect({
    query: `id=${res.id}`
  });
  socket.on('msg', data => {
    console.log(data);
  });
  socket.on('details', async details => {
    await fetch(`/js/games/${details.name}/${details.name}-base.js`).then(file => file.text()).then(text => eval.call(window, text));

    Canvas = props => {
      [mouse, setMouse] = React.useState({
        x: 0,
        y: 0
      });
      [keys, setKeys] = React.useState({});
      [gameState, setGameState] = React.useState({});

      getInput = () => {
        return {
          mouse: mouse,
          key: keys
        };
      }; //We only want one instance of game object to be created, so we need to useEffect, which will only create a new instance if the second parameter undergoes a change
      //Since we're passing an empty array as the second parameter, a new game object will never be created.
      //So, the code will only run once, after this component has been rendered


      React.useEffect(() => {
        game = eval(`new ${details.name}(socket, details, getInput, setGameState, reactRender)`); //Pass the inputs by reference

        canvas = document.getElementById('canvas');
      }, []);

      reactRender = () => {
        let bufferCanvas = document.createElement('canvas');
        let ctx = bufferCanvas.getContext('2d');
        bufferCanvas.width = canvas.width;
        bufferCanvas.height = canvas.height;
        game.render(ctx);
        canvas.getContext('2d').clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
        canvas.getContext('2d').drawImage(bufferCanvas, 0, 0);
      };

      return (
        /*#__PURE__*/
        //The div-canvas will be used for html elements
        React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          id: "div-canvas",
          style: {
            zIndex: 2,
            width: details.canvasWidth,
            height: details.canvasHeight
          },
          tabIndex: "0" //We have to do this to accept keyboard inputs from the canvas
          ,
          onMouseDown: e => setMouse({ ...mouse,
            click: true
          }),
          onMouseUp: e => delete mouse['click'],
          onMouseMove: e => {
            setMouse({ ...mouse,
              x: e.nativeEvent.offsetX,
              y: e.nativeEvent.offsetY
            });
          },
          onKeyDown: e => setKeys({ ...keys,
            [e.code]: true
          }),
          onKeyUp: e => delete keys[e.code]
        }, /*#__PURE__*/React.createElement(props.REACT, {
          render: reactRender,
          mouse: mouse,
          setMouse: setMouse,
          keys: keys,
          setKeys: setKeys,
          gameState: gameState,
          setGameState: setGameState
        })), /*#__PURE__*/React.createElement("canvas", {
          style: {
            zIndex: 1
          },
          width: details.canvasWidth,
          height: details.canvasHeight,
          id: "canvas",
          className: "border"
        }))
      );
    };

    await fetch(`/js/games/${details.name}/${details.name}-react.js`).then(file => file.text()).then(text => eval.call(window, text));
  });
});
//# sourceMappingURL=game.js.map