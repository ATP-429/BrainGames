const Input = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

const FailMessage = () => {
  return /*#__PURE__*/React.createElement("div", {
    id: "msg",
    className: "alert alert-danger"
  }, "Username/password invalid");
};

const SuccessMessage = () => {
  return null;
};

const LoginForm = () => {
  [state, setState] = React.useState('');
  [username, setUsername] = React.useState('');
  [password, setPassword] = React.useState('');

  loginSuccess = () => {};

  loginFail = () => {
    setState('fail');
  };

  tryLogin = async () => {
    setState('logging');
    console.log(`Logging in with ${username} and ${password}`);
    login(username, password).then(res => {
      if (res['success']) loginSuccess();else loginFail();
    });
  };

  reset = () => {
    setState('');
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "login-form border border-dark"
  }, /*#__PURE__*/React.createElement("img", {
    id: "logo",
    src: "res/images/logos/main.png"
  }), /*#__PURE__*/React.createElement("hr", {
    style: {
      background: 'black',
      opacity: 1.0
    }
  }), /*#__PURE__*/React.createElement("input", {
    id: "username",
    onChange: e => {
      reset();
      setUsername(e.target.value);
    },
    className: 'form-control ' + (state == 'fail' ? 'is-invalid' : ''),
    type: "text",
    name: "username",
    placeholder: "Username/Email"
  }), /*#__PURE__*/React.createElement("input", {
    id: "password",
    onChange: e => {
      reset();
      setPassword(e.target.value);
    },
    className: 'form-control ' + (state == 'fail' ? 'is-invalid' : ''),
    type: "password",
    name: "password",
    placeholder: "Password"
  }), /*#__PURE__*/React.createElement(Input, {
    onChange: e => {
      reset();
      setUsername(e.target.value);
    },
    invalidity: state == 'fail' ? 'is-invalid' : ''
  }), /*#__PURE__*/React.createElement("button", {
    id: "login-button",
    className: "btn btn-success",
    onClick: tryLogin
  }, " ", state == 'logging' ? 'Loggin in...' : 'Login'), state == 'fail' ? /*#__PURE__*/React.createElement(FailMessage, null) : /*#__PURE__*/React.createElement(SuccessMessage, null)));
};

ReactDOM.render( /*#__PURE__*/React.createElement(LoginForm, null), document.getElementById('page'));
//# sourceMappingURL=login-form.js.map