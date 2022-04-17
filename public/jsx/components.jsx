Timer = (props) => {
     //Jesus fucking christ idk why exactly. But not making this 'const' was causing some huge problems with 'time' being shared with 
     //other <Time/> components. Also at the bottom, we had to do time => time-1000 instead of just time-1000 for some reason, again idk
     // why exactly. But it's finally working. Now I can make multiple <Time /> components on the same page and none of them affect each other
    const [time, setTime] = React.useState(props.time);

    React.useEffect(() => {
        let interval = setInterval(() => {setTime(time => time-1000)}, 1000);
        return () => clearInterval(interval); //This function will run after component dismounts https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g
    }, []);


    return (
        <div id={props.id} style={{height: props.height+"px", width: props.width * time/props.time+"px", border: "solid 1px", backgroundColor: props.color}}/>
    )
}

Input = (props) => {
    var {value, setValue, onEnter, ...otherprops} = props;
    return (
        <input type="text"
            value={value}
            onInput={(e) => setValue(e.target.value)}
            onKeyUp={(e) => {if(e.key == 'Enter') { onEnter(); }}}
            {...otherprops}/>
        )
}

Dropdown = (props) => {
    var {placeholder, value, setValue, options, ...otherprops} = props;
    return (
        <select value={value} onChange={e => setValue(e.target.value)} {...otherprops}>
            <option value="" selected disabled hidden>{placeholder}</option>
            {options.map(option => <option value={option}>{option}</option>)}
        </select>
    )
}

Navigator = (props) => {
    const [username, setUsername] = React.useState('');
    const [profileURL, setProfileURL] = React.useState('');
    const [logged, setLogged] = React.useState('');

    React.useEffect(() => {
        //Gets id from cookie, func defined in request.js
        get_details(getSelfID()).then(res => {
            if(res.details?.username != undefined) {
                setUsername(res.details.username);
                setLogged(true);
            }
            else
                setUsername('Guest');
            if(res.details?.profileURL != undefined)
                setProfileURL(res.details.setProfileURL);
            else
                setProfileURL('/res/images/avatar.png');
        })
    }, [])

    return (
        <React.Fragment>
            <nav className="navigator navbar navbar-expand-lg navbar-dark bg-dark">
                <a href={logged ? "/profile.html?id="+getSelfID() : "/login.html"} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <img src={profileURL} className="profile-pic"></img>
                    <div className="text-white">{username}</div>
                </a>
                {logged ? <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => {logout().then(() => location.reload())}}>LOGOUT</button> : <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => window.location.href="/login.html"}>LOGIN</button>}
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => window.location.href="/joingame.html"}>PLAY</button>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => window.location.href="/index.html"}>HOMEPAGE</button>
            </nav>
        </React.Fragment>
    )
}

PlayerInfo = (props) => {
    const [profileURL, setProfileURL] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [gameDetails, setGameDetails] = React.useState([]);

    React.useEffect(() => {
        get_details(props.id).then(res => {
            if(res.details?.username != undefined)
                setUsername(res.details.username);
            else
                setUsername('Guest');
            if(res.details?.profileURL != undefined)
                setProfileURL(res.details.setProfileURL);
            else
                setProfileURL('/res/images/avatar.png');
        })
    }, [props.id])

    React.useEffect(() => {
        // get_game_details(props.id).then(data => {
        //     setGameDetails(data.details);
        // });
    }, [props.id])
    
    return (
        <React.Fragment>
            <div className="player-card" style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                <img className="profile-pic" src={profileURL}></img>
                <div className="profile-content">
                    <div>{username}</div>
                    {gameDetails.map((details, i) => "Game"+i)}
                </div>
            </div>
        </React.Fragment>
    )
}

PlayerCard = (props) => {
    const [profileURL, setProfileURL] = React.useState('');
    const [username, setUsername] = React.useState('');
    
    React.useEffect(() => {
        get_details(props.id).then(res => {
            if(res.details?.username != undefined)
                setUsername(res.details.username);
            else
                setUsername('Guest');
            if(res.details?.profileURL != undefined)
                setProfileURL(res.details.setProfileURL);
            else
                setProfileURL('/res/images/avatar.png');
        })
    }, [])
    
    return (
        <React.Fragment>
            <div className="player-card">
                <img className="profile-pic" src={profileURL}></img>
                <div className="profile-content">
                    <div className="title">{username}</div>
                    <div className="score">Score : {props.score}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

Chatbox = (props) => {
    var {value, setValue} = props;
    return (
        <React.Fragment>
            <div id="chatbox">
                <div className="title">CHATBOX</div>
                <hr/>
                {
                    Object.keys(props.chat).map((key) => (
                        <React.Fragment key={key}>
                            <ChatMsg id={props.chat[key].id} content={props.chat[key].content}></ChatMsg>
                        </React.Fragment>
                    ))
                }

                <Input setValue={setValue} value={value} onEnter={() => {props.sendMsg(value); setValue("") }} className="form-control" id="chat" placeholder="Enter a message..." />
                <button onClick={() => { props.sendMsg(msg); setValue(""); }} className="btn btn-primary" id="send">Send</button>
            </div>
        </React.Fragment>
    )
}

ChatMsg = (props) => {
    const [profileURL, setProfileURL] = React.useState('');
    const [username, setUsername] = React.useState('');


    React.useEffect(() => {
        get_details(props.id).then(res => {
            if(res.details?.username != undefined)
                setUsername(res.details.username);
            else
                setUsername('Guest');
            if(res.details?.profileURL != undefined)
                setProfileURL(res.details.setProfileURL);
            else
                setProfileURL('/res/images/avatar.png');
        })
    }, [])

    return (
        <div className="chat-msg">
            <div className="chat-content">{props.content}</div>
            <div class="chat-details">
            <img src={profileURL} className="chat-pic"></img>
            <div className="chat-name">{username}</div>
            </div>
        </div>
    )
}
