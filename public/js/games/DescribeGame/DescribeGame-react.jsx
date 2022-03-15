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
        <div class="option">
            {renderOption(option)}
        </div>
    );
}

REACT = (props) => {
    return (
        <React.Fragment>
            <div id="shape-container">
                {
                    (() => {
                        if(props.gameState.input) {
                            return (<React.Fragment>
                                { props.gameState.win == 0 ? Array.from(Array(props.gameState._nShapes)).map((_, i) => renderShape(i, null)) : props.gameState._shapes?.map((shape, i) => renderShape(i, shape))}
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
            <div id="option-container">
                    { props.gameState.input ? props.gameState.options?.map(option => <Option {...option}/>) : null }
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('game-page'));
