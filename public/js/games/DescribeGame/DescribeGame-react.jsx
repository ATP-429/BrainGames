//This is the react game file. All client side logic involving react will run here

renderShape = (i, shape) => {
    if(shape != null) {
        return (
            <React.Fragment>
                <div className="shape-block">
                    <div key="1" className="shape" type={shape.type} style={{backgroundColor: shape.color}}>{shape.text}</div>
                    <div key="-1">{i+1}</div>
                </div>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="shape-block">
                    <div key="1" className="shape" type="unknown" style={{backgroundColor: "gray"}}>?</div>
                    <div key="-1">{i+1}</div>
                </div>
            </React.Fragment>
        )
    }
}

REACT = (props) => {
    [ans, setAns] = React.useState("");

    return (
        <React.Fragment>
            <div id="shape-container">
                {
                    (() => {
                        if(props.gameState.input) {
                            return (<React.Fragment>
                                { Array.from(Array(props.gameState._nShapes)).map((_, i) => renderShape(i, null)) }
                                <input type="text" value={ans} onKeyUp={(e) => {
                                    if(e.key === 'Enter') {
                                        props.game.sendImmediateInput({answer: ans});
                                        setAns("");
                                    }
                                }}
                                onInput={(e) => setAns(e.target.value)}
                                placeholder={props.gameState.query}
                                disabled={props.gameState.win != 0}/>
                                { props.gameState.win == 1 ? <React.Fragment> &#9989; </React.Fragment> : null }
                                { props.gameState.win == -1 ? <React.Fragment> &#10060; </React.Fragment> : null }
                            </React.Fragment>)
                        }
                        else {
                            return props.gameState._shapes?.map((shape, i) => renderShape(i, shape))
                        }
                    })()
                }
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('game-page'));
