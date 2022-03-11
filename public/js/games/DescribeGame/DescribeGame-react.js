//This is the react game file. All client side logic involving react will run here
renderShape = (i, shape) => {
  if (shape != null) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      key: "-1"
    }, i), /*#__PURE__*/React.createElement("div", {
      key: "1",
      className: "shape",
      type: shape.type,
      style: {
        backgroundColor: shape.color
      }
    }, shape.text));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      key: "-1"
    }, i), /*#__PURE__*/React.createElement("div", {
      key: "1",
      className: "shape",
      type: "unknown",
      style: {
        backgroundColor: "gray"
      }
    }, "?"));
  }
};

REACT = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.gameState._shapes?.map((shape, i) => renderShape(i, shape)), /*#__PURE__*/React.createElement("button", {
    onClick: () => game.sendImmediateInput({
      hide: true
    }),
    className: "btn btn-danger",
    id: "sub-btn"
  }, "HIDE SHAPES"));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));