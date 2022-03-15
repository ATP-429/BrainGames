function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

Input = props => {
  var {
    setMsg,
    onEnter,
    ...otherprops
  } = props;
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    value: msg,
    onInput: e => setMsg(e.target.value),
    onKeyUp: e => {
      if (e.key == 'Enter') {
        onEnter();
        setMsg("");
      }
    }
  }, otherprops));
};

PlayerCard = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "player-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, props.playerName), /*#__PURE__*/React.createElement("div", {
    className: "score"
  }, "Score : ", props.score)));
};

Chatbox = props => {
  [msg, setMsg] = React.useState('');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "chatbox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "CHATBOX"), /*#__PURE__*/React.createElement("hr", null), Object.keys(props.chat).map(key => /*#__PURE__*/React.createElement(React.Fragment, {
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-msg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-content"
  }, props.chat[key].content), /*#__PURE__*/React.createElement("div", {
    className: "chat-name"
  }, props.chat[key].name)))), /*#__PURE__*/React.createElement(Input, {
    setMsg: setMsg,
    onEnter: () => props.sendMsg(msg),
    className: "form-control",
    id: "chat",
    placeholder: "Enter a message..."
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      props.sendMsg(msg);
      setMsg("");
    },
    className: "btn btn-primary",
    id: "send"
  }, "Send")));
};