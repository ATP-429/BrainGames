//This is the react game file. All client side logic involving react will run here
REACT = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "score"
  }, "Score: ", props.gameState.score), /*#__PURE__*/React.createElement("div", {
    id: "btn-container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => game.sendImmediateInput({
      add: true
    }),
    className: "btn btn-success",
    id: "add-btn"
  }, "Click Me!"), /*#__PURE__*/React.createElement("button", {
    onClick: () => game.sendImmediateInput({
      sub: true
    }),
    className: "btn btn-danger",
    id: "sub-btn"
  }, "DON'T CLICK!")));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('page'));
//# sourceMappingURL=HelloGame-react.js.map