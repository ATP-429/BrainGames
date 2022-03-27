//This is the react game file. All client side logic involving react will run here
GRID = props => {
  [grid, setGrid] = React.useState([]);
  React.useEffect(() => {
    let grid = [];

    for (let i = 0; i < props.width; i++) {
      grid[i] = [];

      for (let j = 0; j < props.height; j++) {
        grid[i][j] = props.arr[i][j];
      }
    }

    setGrid(grid);
  }, [props.width, props.height, props.arr]);
  return grid.map((row, i) => /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, row.map((tile, j) => /*#__PURE__*/React.createElement("div", {
    onClick: () => props.onPick(i, j),
    className: "tile",
    occupied: tile.player == props.me ? "ours" : tile.occupied ? "theirs" : null
  }, tile.text))));
};

REACT = props => {
  onPick = (i, j) => {
    props.game.sendImmediateInput({
      pick: true,
      i: i,
      j: j
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, props.gameState._playerWait ? 'Waiting for second player...' : null), /*#__PURE__*/React.createElement("div", {
    id: "grid-container"
  }, /*#__PURE__*/React.createElement(GRID, {
    me: props.gameState.$me,
    onPick: (i, j) => onPick(i, j),
    width: props.gameState._width,
    height: props.gameState._height,
    arr: props.gameState._grid
  })));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));