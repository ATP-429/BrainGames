//This is the react game file. All client side logic involving react will run here
renderShape = shape => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, shape.id), /*#__PURE__*/React.createElement("div", {
    key: shape.id,
    className: "shape",
    type: shape.type,
    style: {
      backgroundColor: shape.color
    }
  }, shape.text));
};

REACT = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.gameState._shapes?.map(shape => renderShape(shape)), /*#__PURE__*/React.createElement("button", {
    onClick: () => game.sendImmediateInput({
      sub: true
    }),
    className: "btn btn-danger",
    id: "sub-btn"
  }, "ERASE SHAPES"));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));