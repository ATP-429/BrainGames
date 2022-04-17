const RegisterForm = () => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "snowfall"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-content-left"
  }, /*#__PURE__*/React.createElement("img", {
    src: "res/images/logos/Background.svg",
    alt: "spaceship",
    className: "form-img"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-content-right"
  }, /*#__PURE__*/React.createElement("form", {
    className: "form"
  }, /*#__PURE__*/React.createElement("h1", null, "Create your account"), /*#__PURE__*/React.createElement("div", {
    className: "form-inputs"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username",
    className: "form-label"
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    id: "username",
    type: "text",
    name: "username",
    className: "form-input",
    placeholder: "Enter your username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-inputs"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username",
    className: "form-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    id: "email",
    type: "email",
    name: "email",
    className: "form-input",
    placeholder: "Enter your email"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-inputs"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username",
    className: "form-label"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    id: "password",
    type: "password",
    name: "password",
    className: "form-input",
    placeholder: "Enter your password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-inputs"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username",
    className: "form-label"
  }, "Confirm Password"), /*#__PURE__*/React.createElement("input", {
    id: "password2",
    type: "password",
    name: "password2",
    className: "form-input",
    placeholder: "Enter your password2"
  })), /*#__PURE__*/React.createElement("button", {
    className: "form-input-btn",
    type: "submit"
  }, "Submit"), /*#__PURE__*/React.createElement("span", {
    className: "form-input-login"
  }, "Already have an account? Login", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, " Here")))))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(RegisterForm, null), document.getElementById('page'));