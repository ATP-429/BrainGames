GameList = () => {
    [list, setList] = React.useState([]);

    refresh = () => {
        get_games().then((data) => {console.log(data); setList(data.list)});
    }

    React.useEffect(refresh, []);

    return (
        <React.Fragment>
            { console.log(list) }
            { list?.map(gameID => <div>Game<button onClick={() => window.location.href=`/game.html?id=${gameID}`}>Join</button></div>) }
            <button id="refresh" onClick={refresh}>⟳</button>
        </React.Fragment>
    )
}

ReactDOM.render(
    <GameList />,
    document.getElementById('page')
);
