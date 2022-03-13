//This is the react game file. All client side logic involving react will run here
renderShape = (i, shape) => {
  if (shape != null) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "shape-block"
    }, /*#__PURE__*/React.createElement("div", {
      key: "1",
      className: "shape",
      type: shape.type,
      style: {
        backgroundColor: shape.color
      }
    }, shape.text), /*#__PURE__*/React.createElement("div", {
      key: "-1"
    }, i + 1)));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "shape-block"
    }, /*#__PURE__*/React.createElement("div", {
      key: "1",
      className: "shape",
      type: "unknown",
      style: {
        backgroundColor: "gray"
      }
    }, "?"), /*#__PURE__*/React.createElement("div", {
      key: "-1"
    }, i + 1)));
  }
};

REACT = props => {
  [ans, setAns] = React.useState("");
  React.useEffect(() => {
    if (props.gameState.input) {
      console.log("Test");
      setAns("");
    }
  }, [props.gameState.input]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "shape-container"
  }, (() => {
    if (props.gameState.input) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, props.gameState.win == 0 ? Array.from(Array(props.gameState._nShapes)).map((_, i) => renderShape(i, null)) : props.gameState._shapes?.map((shape, i) => renderShape(i, shape)), /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: ans,
        onKeyUp: e => {
          if (e.key === 'Enter') {
            props.game.sendImmediateInput({
              answer: ans
            });
          }
        },
        onInput: e => setAns(e.target.value),
        placeholder: props.gameState.query,
        disabled: props.gameState.win != 0,
        autoFocus: true
      }), props.gameState.win == 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, " \u2705 ") : null, props.gameState.win == -1 ? /*#__PURE__*/React.createElement(React.Fragment, null, " \u274C ") : null);
    } else {
      return props.gameState._shapes?.map((shape, i) => renderShape(i, shape));
    }
  })()));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));