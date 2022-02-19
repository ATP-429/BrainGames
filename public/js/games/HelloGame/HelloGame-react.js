//This is the react game file. All client side logic involving react will run here
REACT = props => {
  return /*#__PURE__*/React.createElement("div", {
    id: "indicators-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "indicator input-taken border border-dark rounded",
    active: gameState.inputTaken ? 'true' : 'false'
  }, " "), /*#__PURE__*/React.createElement("div", {
    className: "indicator update-done border border-dark rounded",
    active: gameState.updateDone ? 'true' : 'false'
  }, " "));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('page'));
//# sourceMappingURL=HelloGame-react.js.map