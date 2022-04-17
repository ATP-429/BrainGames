Profile = () => {
  const [ID, setID] = React.useState('');
  React.useEffect(() => {
    let id = new URL(window.location.href).searchParams.get('id');
    console.log(id);
    setID(id);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navigator, null), /*#__PURE__*/React.createElement(PlayerInfo, {
    id: ID
  }));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Profile, null), document.getElementById('page'));