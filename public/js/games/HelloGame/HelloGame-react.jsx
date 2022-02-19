//This is the react game file. All client side logic involving react will run here
REACT = (props) => {
    return (
        <div id="indicators-container">
            <div className='indicator input-taken border border-dark rounded' active={gameState.inputTaken ? 'true' : 'false'}> </div>
            <div className='indicator update-done border border-dark rounded' active={gameState.updateDone ? 'true' : 'false'}> </div>
        </div>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('page'));
