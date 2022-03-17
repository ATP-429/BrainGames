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

function renderOption(option) {
  switch (option.type) {
    case 'type':
      //Different from option.type. This is referring to the type of shape, for eg hexagon, circle etc
      return /*#__PURE__*/React.createElement("div", {
        key: "1",
        className: "shape option-display",
        type: option.value,
        style: {
          backgroundColor: 'gray'
        }
      });

    case 'text':
      return /*#__PURE__*/React.createElement("div", {
        className: "option-display"
      }, option.value);

    case 'color':
      return /*#__PURE__*/React.createElement("div", {
        className: "option-display",
        style: {
          backgroundColor: option.value
        }
      });
  }
}

Option = option => {
  return renderOption(option);
};

REACT = props => {
  [selected, setSelected] = React.useState(-1);
  [answering, setAnswering] = React.useState(false); //Tells us if user needs to answer or not

  React.useEffect(() => {
    if (props.gameState.input) setAnswering(true);else setAnswering(false);
  }, [props.gameState.input]);
  React.useEffect(() => {
    if (props.gameState.win == 0) setSelected(-1);
  }, [props.gameState.win]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "shape-container"
  }, (() => {
    if (props.gameState.input) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, props.gameState.win == 0 ? Array.from(Array(props.gameState._nShapes)).map((_, i) => renderShape(i, null)) : props.gameState._shapes?.map((shape, i) => renderShape(i, shape)));
    } else {
      return props.gameState._shapes?.map((shape, i) => renderShape(i, shape));
    }
  })()), /*#__PURE__*/React.createElement("div", {
    id: "option-container"
  }, props.gameState.input ? props.gameState.query : null, props.gameState.input ? props.gameState.options?.map((option, i) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: () => {
      if (props.gameState.input && props.gameState.win == 0) {
        props.game.sendImmediateInput({
          answer: option.value
        });
        setSelected(i);
      }
    },
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Option, option), i == props.gameState.answer_index && props.gameState.win != 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, " \u2705 ") : null, " ", i == selected && i != props.gameState.answer_index && props.gameState.win != 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, "  \u274C ") : null, " "))) : null), /*#__PURE__*/React.createElement("div", {
    id: "timer-container"
  }, props.gameState.input ? /*#__PURE__*/React.createElement(Timer, {
    time: props.gameState._answerTime,
    width: props.game.details.canvasWidth,
    height: "30",
    color: "rgb(129, 189, 151)"
  }) : null));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));