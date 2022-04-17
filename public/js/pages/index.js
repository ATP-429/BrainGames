Homepage = () => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navigator, null), getSelfID() != null ? /*#__PURE__*/React.createElement(PlayerInfo, {
    id: getSelfID()
  }) : "Please login to see your stats");
};

ReactDOM.render( /*#__PURE__*/React.createElement(Homepage, null), document.getElementById('page'));