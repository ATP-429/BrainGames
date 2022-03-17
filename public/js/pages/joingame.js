GameList = () => {
  [list, setList] = React.useState([]);

  refresh = () => {
    get_games().then(data => {
      console.log(data);
      setList(data.list);
    });
  };

  React.useEffect(refresh, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, console.log(list), list?.map(gameID => /*#__PURE__*/React.createElement("div", null, "Game", /*#__PURE__*/React.createElement("button", {
    onClick: () => window.location.href = `/game.html?id=${gameID}`
  }, "Join"))), /*#__PURE__*/React.createElement("button", {
    id: "refresh",
    onClick: refresh
  }, "\u27F3"));
};

ReactDOM.render( /*#__PURE__*/React.createElement(GameList, null), document.getElementById('page'));