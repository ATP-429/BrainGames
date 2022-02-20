//This is the react game file. All client side logic involving react will run here
REACT = (props) => {
    return (
        <React.Fragment>
            <div id="score">
                Score: {props.gameState.score}
            </div>
            <div id="btn-container">
                <button onClick={() => game.sendImmediateInput({add: true})} className="btn btn-success" id="add-btn">Click Me!</button>
                <button onClick={() => game.sendImmediateInput({sub: true})} className="btn btn-danger" id="sub-btn">DON'T CLICK!</button>
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('page'));
