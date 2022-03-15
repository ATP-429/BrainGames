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
