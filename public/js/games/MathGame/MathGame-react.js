//This is the react game file. All client side logic involving react will run here
GRID = props => {
  const [grid, setGrid] = React.useState([]);
  React.useEffect(() => {
    let grid = [];

    for (let i = 0; i < props.width; i++) {
      grid[i] = [];

      for (let j = 0; j < props.height; j++) {
        grid[i][j] = props.arr?.[i]?.[j];
      }
    }

    setGrid(grid);
  }, [props.width, props.height, props.arr]);
  return grid.map((row, i) => /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, row.map((tile, j) => /*#__PURE__*/React.createElement("div", {
    key: `${i},${j}`,
    onClick: () => props.onPick(i, j),
    className: "tile",
    occupied: tile?.player == props.$me ? "ours" : tile?.occupied ? "theirs" : null,
    status: tile?.status,
    grabbable: tile?.grabbable ? "true" : null
  }, tile?.text))));
};

REACT = props => {
  //If user picks tile from grid
  onPick = (i, j) => {
    props.game.sendImmediateInput({
      pick: true,
      i: i,
      j: j
    });
  }; //If user picks tile from inventory (or rather, puts tile from inventory in the game, hence named onPut)


  onPut = (i, j) => {
    props.game.sendImmediateInput({
      put: true,
      i: j
    }); //Send index of item in inventory picked. [It's j because our grid system is flipped. 'width' attr gives height and 'height' attr gives width]
  }; //props.gameState.pdata?.[props.gameState.$me]?._inventory


  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    key: "-1"
  }, props.gameState._playerWait ? 'Waiting for second player...' : null), /*#__PURE__*/React.createElement("div", {
    key: "0",
    id: "grid-container"
  }, /*#__PURE__*/React.createElement(GRID, {
    $me: props.gameState.$me,
    onPick: (i, j) => onPick(i, j),
    width: props.gameState._width,
    height: props.gameState._height,
    arr: props.gameState._grid
  })), /*#__PURE__*/React.createElement("div", {
    key: "1",
    id: "timer-container"
  }, props.gameState.input ? /*#__PURE__*/React.createElement(Timer, {
    id: "test1",
    key: "5",
    time: props.gameState._answerTime,
    width: props.game.details.canvasWidth,
    height: "30",
    color: "rgb(129, 189, 151)"
  }) : null), /*#__PURE__*/React.createElement("div", {
    key: "3",
    id: "inv-container"
  }, console.log(props.gameState.pdata?.[props.gameState.$me]?._inventory), /*#__PURE__*/React.createElement(GRID, {
    $me: props.gameState.$me,
    onPick: (i, j) => onPut(i, j),
    width: 1,
    height: props.gameState._maxInvSize,
    arr: [props.gameState.pdata?.[props.gameState.$me]?._inventory]
  })), /*#__PURE__*/React.createElement("div", {
    key: "4",
    id: "answer-container"
  }, props.gameState._ans));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));