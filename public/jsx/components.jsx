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

PlayerCard = (props) => {
    [profileURL, setProfileURL] = React.useState('/res/images/avatar.png');
    [username, setUsername] = React.useState('');
    React.useEffect(() => {
        get_details(props.id).then(res => {
            setUsername(res.details.username);
            if(res.details.profileURL != undefined)
                setProfileURL(res.details.setProfileURL);
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
                            <div className="chat-msg">
                                <div className="chat-content">{props.chat[key].content}</div>
                                <div className="chat-name">{props.chat[key].name}</div>
                            </div>
                        </React.Fragment>
                    ))
                }

                <Input setValue={setValue} value={value} onEnter={() => {props.sendMsg(value); setValue("") }} className="form-control" id="chat" placeholder="Enter a message..." />
                <button onClick={() => { props.sendMsg(msg); setValue(""); }} className="btn btn-primary" id="send">Send</button>
            </div>
        </React.Fragment>
    )
}
