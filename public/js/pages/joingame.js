GameList = () => {
  [list, setList] = React.useState([]);
  [pull, setPull] = React.useState(true);
  [id, setId] = React.useState('');
  [game, setGame] = React.useState('');
  [lobby, setLobby] = React.useState('');
  [visibility, setVisibility] = React.useState('');
  [btnTxt, setBtnTxt] = React.useState('Create lobby');
  [gamesList, setGamesList] = React.useState([]);

  refresh = () => {
    get_games().then(data => {
      setList(data.list);
    });
    setTimeout(() => setPull(!pull), 1000); //refresh again in 1s by changing pull variable
  };

  createLobby = (name, details) => {
    create_game(name, details).then(res => {
      if (res.success) {
        setBtnTxt('Lobby created! Redirecting...');
        setTimeout(() => window.location.href = `/game.html?id=${res.id}`, 1000);
      }
    });
  };

  React.useEffect(() => {
    refresh();
  }, [pull]); //Calls refresh if 'pull' variable is changed.

  React.useEffect(() => get_games_list().then(data => setGamesList(data.list)), []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    id: "games-table",
    className: "table border border-dark games-table"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "table-dark"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "#"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Lobby"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Click to join!"))), /*#__PURE__*/React.createElement("tbody", null, list?.map((game, i) => /*#__PURE__*/React.createElement("tr", {
    key: game.id
  }, /*#__PURE__*/React.createElement("td", null, " ", i, " "), /*#__PURE__*/React.createElement("td", null, " ", game.name, " "), /*#__PURE__*/React.createElement("td", null, " ", game.lobbyName, " "), /*#__PURE__*/React.createElement("td", null, " ", game.id, " "), /*#__PURE__*/React.createElement("td", null, " ", /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => window.location.href = `/game.html?id=${game.id}`
  }, "Join"), " "))), /*#__PURE__*/React.createElement("tr", {
    key: "-1"
  }, /*#__PURE__*/React.createElement("td", null, "-"), /*#__PURE__*/React.createElement("td", null, "-"), /*#__PURE__*/React.createElement("td", null, "-"), /*#__PURE__*/React.createElement("td", null, " ", /*#__PURE__*/React.createElement(Input, {
    className: "form-control",
    placeholder: "Join custom game by id...",
    setValue: setId,
    value: id
  }), " "), /*#__PURE__*/React.createElement("td", null, " ", /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => window.location.href = `/game.html?id=${id.trim()}`
  }, "Join"))), /*#__PURE__*/React.createElement("tr", {
    key: "-2"
  }, /*#__PURE__*/React.createElement("td", null), /*#__PURE__*/React.createElement("td", null), /*#__PURE__*/React.createElement("td", null), /*#__PURE__*/React.createElement("td", null), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-success",
    id: "refresh",
    onClick: refresh
  }, "\xA0\xA0\u27F3\xA0\xA0"))))), /*#__PURE__*/React.createElement("div", {
    id: "create-game-panel",
    className: "container border border-dark"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      textAlign: 'center'
    }
  }, "CREATE NEW LOBBY"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "gametype"
  }, "Game :\xA0"), /*#__PURE__*/React.createElement(Dropdown, {
    id: "gametype",
    placeholder: "Select a game",
    options: gamesList,
    value: game,
    setValue: setGame
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "gamevisibility"
  }, "Game :\xA0"), /*#__PURE__*/React.createElement(Dropdown, {
    id: "gamevisibility",
    placeholder: "Select visibility",
    options: ['Public', 'Private'],
    value: visibility,
    setValue: setVisibility
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "lobbyname"
  }, "Lobby name :\xA0"), /*#__PURE__*/React.createElement(Input, {
    id: "lobbyname",
    placeholder: "Enter lobby name...",
    value: lobby,
    setValue: setLobby
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    onClick: () => createLobby(game, {
      lobbyName: lobby,
      visibility: visibility
    })
  }, btnTxt)));
};

ReactDOM.render( /*#__PURE__*/React.createElement(GameList, null), document.getElementById('page'));