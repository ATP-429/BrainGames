//This is the react game file. All client side logic involving react will run here

GRID = (props) => {
    [grid, setGrid] = React.useState([]);

    React.useEffect(() => {
        let grid = []
        for(let i = 0; i < props.width; i++) {
            grid[i] = [];
            for(let j = 0; j < props.height; j++) {
                grid[i][j] = props.arr[i][j];
            }
        }
        setGrid(grid);
    }, [props.width, props.height, props.arr]);

    return (
        grid.map((row, i) =>
            <div className="row">
            {row.map((tile, j) => 
                <div onClick={() => props.onPick(i, j)} className="tile" occupied={tile.player == props.me ? "ours" : (tile.occupied ? "theirs" : null)} >{tile.text}</div>
            )}
            </div>
        )
    )
}

REACT = (props) => {
    
    onPick = (i, j) => {
        props.game.sendImmediateInput({pick: true, i: i, j: j});
    }

    return (
        <React.Fragment>
            <div>{props.gameState._playerWait ? 'Waiting for second player...' : null}</div>
            <div id="grid-container">
            <GRID me={props.gameState.$me} onPick={(i, j) => onPick(i, j)} width={props.gameState._width} height={props.gameState._height} arr={props.gameState._grid}/>
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<Canvas REACT={REACT}/>, document.getElementById('game-page'));
