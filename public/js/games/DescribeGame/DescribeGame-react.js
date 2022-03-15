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
  return /*#__PURE__*/React.createElement("div", {
    class: "option"
  }, renderOption(option));
};

REACT = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "shape-container"
  }, (() => {
    if (props.gameState.input) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, props.gameState.win == 0 ? Array.from(Array(props.gameState._nShapes)).map((_, i) => renderShape(i, null)) : props.gameState._shapes?.map((shape, i) => renderShape(i, shape)), props.gameState.win == 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, " \u2705 ") : null, props.gameState.win == -1 ? /*#__PURE__*/React.createElement(React.Fragment, null, " \u274C ") : null);
    } else {
      return props.gameState._shapes?.map((shape, i) => renderShape(i, shape));
    }
  })()), /*#__PURE__*/React.createElement("div", {
    id: "option-container"
  }, props.gameState.input ? props.gameState.options?.map(option => /*#__PURE__*/React.createElement(Option, option)) : null));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, {
  REACT: REACT
}), document.getElementById('game-page'));