const FailMessage = () => {
  return /*#__PURE__*/React.createElement("div", {
    id: "msg",
    className: "alert alert-danger"
  }, "Username/password invalid");
};

const SuccessMessage = () => {
  return /*#__PURE__*/React.createElement("div", {
    id: "msg",
    className: "alert alert-success"
  }, "Logged in successfully! Redirecting...");
};

const LoginForm = () => {
  [state, setState] = React.useState('');
  [username, setUsername] = React.useState('');
  [password, setPassword] = React.useState('');

  loginSuccess = () => {
    setState('success');
  };

  loginFail = () => {
    setState('fail');
  };

  tryLogin = async () => {
    setState('logging');
    login(username, password).then(res => {
      if (res['success']) loginSuccess();else loginFail();
    });
  };

  reset = () => {
    setState('');
  };

  textclass = () => {
    let classes = ['form-control'];

    switch (state) {
      case 'fail':
        classes.push('is-invalid');
    }

    return classes.join(' ');
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "login-form",
    className: "border border-dark"
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
    className: textclass(),
    type: "text",
    name: "username",
    placeholder: "Username/Email",
    disabled: state == 'success'
  }), /*#__PURE__*/React.createElement("input", {
    id: "password",
    onChange: e => {
      reset();
      setPassword(e.target.value);
    },
    className: textclass(),
    type: "password",
    name: "password",
    placeholder: "Password",
    disabled: state == 'success'
  }), /*#__PURE__*/React.createElement("button", {
    id: "login-button",
    className: "btn btn-success",
    onClick: tryLogin
  }, " ", state == 'logging' ? 'Loggin in...' : 'Login'), function () {
    switch (state) {
      case 'fail':
        return /*#__PURE__*/React.createElement(FailMessage, null);

      case 'success':
        return /*#__PURE__*/React.createElement(SuccessMessage, null);
    }
  }()));
};

ReactDOM.render( /*#__PURE__*/React.createElement(LoginForm, null), document.getElementById('page'));
//# sourceMappingURL=login.js.map