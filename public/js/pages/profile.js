Profile = () => {
  [playerDetails, setPlayerDetails] = React.useState({});
  React.useEffect(() => {
    get_details(new URL(window.location.href).searchParams.get('id')).then(details => {});
  }, []);
  return /*#__PURE__*/React.createElement(PlayerCard, {
    props: playerDetails
  });
};

ReactDOM.render( /*#__PURE__*/React.createElement(Profile, null), document.getElementById('page'));