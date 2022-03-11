//This is the react game file. All client side logic involving react will run here

renderShape = (i, shape) => {
    if(shape != null) {
        return (
            <React.Fragment>
                <div key="-1">{i}</div>
                <div key="1" className="shape" type={shape.type} style={{backgroundColor: shape.color}}>{shape.text}</div>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div key="-1">{i}</div>
                <div key="1" className="shape" type="unknown" style={{backgroundColor: "gray"}}>?</div>
            </React.Fragment>
        )
    }
}

REACT = (props) => {
    return (
        <React.Fragment>
            {props.gameState._shapes?.map((shape, i) => renderShape(i, shape))}
            <button onClick={() => game.sendImmediateInput({hide: true})} className="btn btn-danger" id="sub-btn">HIDE SHAPES</button>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('game-page'));
