const RegisterForm = () => {
    return (
        <>
            <div className="snowfall">
                <div className="form-container">
                    <div className="form-content-left">
                        <img src="res/images/logos/Background.svg" alt="spaceship"
                            className="form-img" />
                    </div>
                    <div className='form-content-right'>
                        <form className='form'>
                            <h1>Create your account</h1>
                            <div className="form-inputs">
                                <label htmlFor='username'
                                    className='form-label'>
                                    Username
                                </label>
                                <input
                                    id='username'
                                    type="text"
                                    name="username"
                                    className="form-input"
                                    placeholder='Enter your username'

                                />
                            </div>
                            <div className="form-inputs">
                                <label htmlFor='username'
                                    className='form-label'>
                                    Email
                                </label>
                                <input
                                    id='email'
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder='Enter your email'

                                />
                            </div>
                            <div className="form-inputs">
                                <label htmlFor='username'
                                    className='form-label'>
                                    Password
                                </label>
                                <input
                                    id='password'
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    placeholder='Enter your password'

                                />
                            </div>
                            <div className="form-inputs">
                                <label htmlFor='username'
                                    className='form-label'>
                                    Confirm Password
                                </label>
                                <input
                                    id='password2'
                                    type="password"
                                    name="password2"
                                    className="form-input"
                                    placeholder='Enter your password2'

                                />
                            </div>
                            <button className="form-input-btn"
                                type="submit">
                                Submit
                            </button>
                            <span className="form-input-login">Already have an account? Login
                                <a href="#"> Here</a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

ReactDOM.render(
    <RegisterForm />,
    document.getElementById('page')
);