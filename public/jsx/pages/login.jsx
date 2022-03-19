const FailMessage = () => {
    return (
        <div id="msg" className="alert alert-danger">
            Username/password invalid
        </div>
    )
}

const SuccessMessage = () => {
    return (
        <div id="msg" className="alert alert-success">
            Logged in successfully! Redirecting...
        </div>
    )
}

const LoginForm = () => {
    [state, setState] = React.useState('');
    [username, setUsername] = React.useState('');
    [password, setPassword] = React.useState('');

    loginSuccess = () => {
        setState('success');
    }

    loginFail = () => {
        setState('fail');
    }

    tryLogin = async () => {
        setState('logging');
        login(username, password).then((res) => {
            if(res['success'])
                loginSuccess();
            else
                loginFail();
        })
    }

    reset = () => {
        setState('');
    }

    textclass = () => {
        let classes = ['form-control']
        switch(state) {
            case 'fail':
                classes.push('is-invalid')
        }

        return classes.join(' ');
    }

    return (
        <React.Fragment>
            <div id="login-form" className="border border-dark">
                <img id="logo" src="res/images/logos/main.png" />
                <hr style={{background: 'black', opacity: 1.0}} />
                <input id="username" onKeyUp={(e) => {if(e.key == 'Enter') tryLogin();}} onChange={(e) => {reset(); setUsername(e.target.value)}} className={textclass()} type="text" name="username" placeholder="Username/Email" disabled={state=='success'}/>
                <input id="password" onKeyUp={(e) => {if(e.key == 'Enter') tryLogin();}} onChange={(e) => {reset(); setPassword(e.target.value)}} className={textclass()} type="password" name="password" placeholder="Password" disabled={state=='success'}/>
                <button id="login-button" className="btn btn-success" onClick={tryLogin}> {state == 'logging' ? 'Loggin in...' : 'Login'}</button>
                {function() {
                    switch(state) {
                        case 'fail':
                            return <FailMessage />
                        case 'success':
                            return <SuccessMessage />
                    }
                }()
                }
            </div>
        </React.Fragment>
        );
};

ReactDOM.render(
    <LoginForm />,
    document.getElementById('page')
);
