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

function renderOption(option) {
    switch(option.type) {
        case 'type': //Different from option.type. This is referring to the type of shape, for eg hexagon, circle etc
            return (<div key="1" className="shape option-display" type={option.value} style={{backgroundColor: 'gray'}}></div>)
        case 'text':
            return <div className="option-display">{option.value}</div>
        case 'color':
            return <div className="option-display" style={{backgroundColor: option.value}}></div>
    }
}

Option = (option) => {
    return(
        renderOption(option)
    );
}

REACT = (props) => {
    [selected, setSelected] = React.useState(-1);

    React.useEffect(() => {
        if(props.gameState.win==0) setSelected(-1)
    }, [props.gameState.win]);

    return (
        <React.Fragment>
            <div id="shape-container">
                {
                    (() => {
                        if(props.gameState.input) {
                            return (<React.Fragment>
                                { props.gameState.win == 0 ? Array.from(Array(props.gameState._nShapes)).map((_, i) => renderShape(i, null)) : props.gameState._shapes?.map((shape, i) => renderShape(i, shape))}
                            </React.Fragment>)
                        }
                        else {
                            return props.gameState._shapes?.map((shape, i) => renderShape(i, shape))
                        }
                    })()
                }
            </div>
            <div id="option-container">
                    { props.gameState.input ? props.gameState.query : null}
                    { props.gameState.input ? props.gameState.options?.map((option, i) => <React.Fragment>
                        <div className="option" onClick={() => { if(props.gameState.input && props.gameState.win==0) {props.game.sendImmediateInput({answer: option.value}); setSelected(i);}}} style={{cursor: 'pointer'}}>
                        <Option {...option}/>
                        {i == props.gameState.answer_index && props.gameState.win != 0 ? <React.Fragment> &#9989; </React.Fragment> : null} {/*GREEN MARK FOR CORRECT ANSWER*/}
                        {i == selected && i != props.gameState.answer_index && props.gameState.win != 0 ? <React.Fragment> 	&#10060; </React.Fragment> : null} {/*RED MARK FOR WRONG ANSWER*/}
                        </div>
                    </React.Fragment>) : null }
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('game-page'));
