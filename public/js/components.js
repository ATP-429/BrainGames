function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

Timer = props => {
  //Jesus fucking christ idk why exactly. But not making this 'const' was causing some huge problems with 'time' being shared with 
  //other <Time/> components. Also at the bottom, we had to do time => time-1000 instead of just time-1000 for some reason, again idk
  // why exactly. But it's finally working. Now I can make multiple <Time /> components on the same page and none of them affect each other
  const [time, setTime] = React.useState(props.time);
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTime(time => time - 1000);
    }, 1000);
    return () => clearInterval(interval); //This function will run after component dismounts https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    id: props.id,
    style: {
      height: props.height + "px",
      width: props.width * time / props.time + "px",
      border: "solid 1px",
      backgroundColor: props.color
    }
  });
};

Input = props => {
  var {
    value,
    setValue,
    onEnter,
    ...otherprops
  } = props;
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    value: value,
    onInput: e => setValue(e.target.value),
    onKeyUp: e => {
      if (e.key == 'Enter') {
        onEnter();
      }
    }
  }, otherprops));
};

Dropdown = props => {
  var {
    placeholder,
    value,
    setValue,
    options,
    ...otherprops
  } = props;
  return /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: e => setValue(e.target.value)
  }, otherprops), /*#__PURE__*/React.createElement("option", {
    value: "",
    selected: true,
    disabled: true,
    hidden: true
  }, placeholder), options.map(option => /*#__PURE__*/React.createElement("option", {
    value: option
  }, option)));
};

Navigator = props => {
  const [username, setUsername] = React.useState('');
  const [profileURL, setProfileURL] = React.useState('');
  const [logged, setLogged] = React.useState('');
  React.useEffect(() => {
    //Gets id from cookie, func defined in request.js
    get_details(getSelfID()).then(res => {
      if (res.details?.username != undefined) {
        setUsername(res.details.username);
        setLogged(true);
      } else setUsername('Guest');

      if (res.details?.profileURL != undefined) setProfileURL(res.details.setProfileURL);else setProfileURL('/res/images/avatar.png');
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "navigator navbar navbar-expand-lg navbar-dark bg-dark"
  }, /*#__PURE__*/React.createElement("a", {
    href: logged ? "/profile.html?id=" + getSelfID() : "/login.html",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: profileURL,
    className: "profile-pic"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-white"
  }, username)), logged ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-success my-2 my-sm-0",
    onClick: () => {
      logout().then(() => location.reload());
    }
  }, "LOGOUT") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-success my-2 my-sm-0",
    onClick: () => window.location.href = "/login.html"
  }, "LOGIN"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-success my-2 my-sm-0",
    onClick: () => window.location.href = "/joingame.html"
  }, "PLAY"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-success my-2 my-sm-0",
    onClick: () => window.location.href = "/index.html"
  }, "HOMEPAGE")));
};

PlayerInfo = props => {
  const [profileURL, setProfileURL] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [gameDetails, setGameDetails] = React.useState([]);
  React.useEffect(() => {
    get_details(props.id).then(res => {
      if (res.details?.username != undefined) setUsername(res.details.username);else setUsername('Guest');
      if (res.details?.profileURL != undefined) setProfileURL(res.details.setProfileURL);else setProfileURL('/res/images/avatar.png');
    });
  }, [props.id]);
  React.useEffect(() => {// get_game_details(props.id).then(data => {
    //     setGameDetails(data.details);
    // });
  }, [props.id]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "player-card",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left"
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "profile-pic",
    src: profileURL
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile-content"
  }, /*#__PURE__*/React.createElement("div", null, username), gameDetails.map((details, i) => "Game" + i))));
};

PlayerCard = props => {
  const [profileURL, setProfileURL] = React.useState('');
  const [username, setUsername] = React.useState('');
  React.useEffect(() => {
    get_details(props.id).then(res => {
      if (res.details?.username != undefined) setUsername(res.details.username);else setUsername('Guest');
      if (res.details?.profileURL != undefined) setProfileURL(res.details.setProfileURL);else setProfileURL('/res/images/avatar.png');
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "player-card"
  }, /*#__PURE__*/React.createElement("img", {
    className: "profile-pic",
    src: profileURL
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, username), /*#__PURE__*/React.createElement("div", {
    className: "score"
  }, "Score : ", props.score))));
};

Chatbox = props => {
  var {
    value,
    setValue
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "chatbox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "CHATBOX"), /*#__PURE__*/React.createElement("hr", null), Object.keys(props.chat).map(key => /*#__PURE__*/React.createElement(React.Fragment, {
    key: key
  }, /*#__PURE__*/React.createElement(ChatMsg, {
    id: props.chat[key].id,
    content: props.chat[key].content
  }))), /*#__PURE__*/React.createElement(Input, {
    setValue: setValue,
    value: value,
    onEnter: () => {
      props.sendMsg(value);
      setValue("");
    },
    className: "form-control",
    id: "chat",
    placeholder: "Enter a message..."
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      props.sendMsg(msg);
      setValue("");
    },
    className: "btn btn-primary",
    id: "send"
  }, "Send")));
};

ChatMsg = props => {
  const [profileURL, setProfileURL] = React.useState('');
  const [username, setUsername] = React.useState('');
  React.useEffect(() => {
    get_details(props.id).then(res => {
      if (res.details?.username != undefined) setUsername(res.details.username);else setUsername('Guest');
      if (res.details?.profileURL != undefined) setProfileURL(res.details.setProfileURL);else setProfileURL('/res/images/avatar.png');
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "chat-msg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-content"
  }, props.content), /*#__PURE__*/React.createElement("div", {
    class: "chat-details"
  }, /*#__PURE__*/React.createElement("img", {
    src: profileURL,
    className: "chat-pic"
  }), /*#__PURE__*/React.createElement("div", {
    className: "chat-name"
  }, username)));
};