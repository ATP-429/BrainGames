Timer = (props) => {
    [time, setTime] = React.useState(props.time);

    React.useEffect(() => {
        let interval = setInterval(() => {setTime(time-1000)}, 1000);
        return () => clearInterval(interval); //This function will run after component dismounts https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g
    }, []);

    return (
        <div style={{height: props.height+"px", width: props.width * time/props.time+"px", border: "solid 1px", backgroundColor: props.color}}/>
    )
}

Input = (props) => {
    var {setMsg, onEnter, ...otherprops} = props;
    return (
        <input type="text"
            value={msg}
            onInput={(e) => setMsg(e.target.value)}
            onKeyUp={(e) => {if(e.key == 'Enter') { onEnter(); setMsg(""); }}}
            {...otherprops}/>
        )
}

PlayerCard = (props) => {
    return (
        <React.Fragment>
            <div className="player-card">
                <div className="title">{props.playerName}</div>
                <div className="score">Score : {props.score}</div>
            </div>
        </React.Fragment>
    )
}

Chatbox = (props) => {
    [msg, setMsg] = React.useState('');

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

                <Input setMsg={setMsg} onEnter={() => props.sendMsg(msg)} className="form-control" id="chat" placeholder="Enter a message..." />
                <button onClick={() => { props.sendMsg(msg); setMsg(""); }} className="btn btn-primary" id="send">Send</button>
            </div>
        </React.Fragment>
    )
}
