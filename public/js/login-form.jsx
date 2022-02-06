const Input = (props) => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
}

const FailMessage = () => {
    return (
        <div id="msg" className="alert alert-danger">
            Username/password invalid
        </div>
    )
}

const SuccessMessage = () => {
    return null;
}

const LoginForm = () => {
    [state, setState] = React.useState('');
    [username, setUsername] = React.useState('');
    [password, setPassword] = React.useState('');

    loginSuccess = () => {

    }

    loginFail = () => {
        setState('fail');
    }

    tryLogin = async () => {
        setState('logging');
        console.log(`Logging in with ${username} and ${password}`);
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

    return (
        <React.Fragment>
            <div className="login-form border border-dark">
                <img id="logo" src="res/images/logos/main.png" />
                <hr style={{background: 'black', opacity: 1.0}} />
                <input id="username" onChange={(e) => {reset(); setUsername(e.target.value)}} className={'form-control ' + (state == 'fail' ? 'is-invalid' : '')} type="text" name="username" placeholder="Username/Email" />
                <input id="password" onChange={(e) => {reset(); setPassword(e.target.value)}} className={'form-control ' + (state == 'fail' ? 'is-invalid' : '')} type="password" name="password" placeholder="Password" />
                <Input onChange={(e) => {reset(); setUsername(e.target.value)}} invalidity={state == 'fail' ? 'is-invalid' : ''}/>
                <button id="login-button" className="btn btn-success" onClick={tryLogin}> {state == 'logging' ? 'Loggin in...' : 'Login'}</button>
                {state == 'fail' ? <FailMessage /> : <SuccessMessage />}
            </div>
        </React.Fragment>
        );
};

ReactDOM.render(
    <LoginForm />,
    document.getElementById('page')
);
