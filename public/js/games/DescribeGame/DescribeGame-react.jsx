//This is the react game file. All client side logic involving react will run here

renderShape = (shape) => {
    return (
        <React.Fragment>
            <div>{shape.id}</div>
            <div key={shape.id} className="shape" type={shape.type} style={{backgroundColor: shape.color}}>{shape.text}</div>
        </React.Fragment>
    )
}

REACT = (props) => {
    return (
        <React.Fragment>
            {props.gameState._shapes?.map(shape => renderShape(shape))}
            <button onClick={() => game.sendImmediateInput({sub: true})} className="btn btn-danger" id="sub-btn">ERASE SHAPES</button>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('game-page'));
