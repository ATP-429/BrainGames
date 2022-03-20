GameList = () => {
    [list, setList] = React.useState([]);
    [pull, setPull] = React.useState(true);
    [id, setId] = React.useState('');
    [game, setGame] = React.useState('');
    [lobby, setLobby] = React.useState('');
    [visibility, setVisibility] = React.useState('');
    [btnTxt, setBtnTxt] = React.useState('Create lobby');

    refresh = () => {
        get_games().then((data) => {setList(data.list)});
        setTimeout(() => setPull(!pull), 1000); //refresh again in 1s by changing pull variable
    }

    createLobby = (name, details) => {
        create_game(name, details).then(res => {
            if(res.success) {
                setBtnTxt('Lobby created! Redirecting...');
                setTimeout(() => (window.location.href=`/game.html?id=${res.id}`), 1000)
            }
        });
    }

    React.useEffect(() => {refresh()}, [pull]); //Calls refresh if 'pull' variable is changed.

    return (
        <React.Fragment>
            <table id="games-table" className="table border border-dark games-table">
                <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Lobby</th>
                    <th scope="col">ID</th>
                    <th scope="col">Click to join!</th>
                </tr>
                </thead>
                <tbody>
                {list?.map((game, i) =>
                    <tr key={game.id}>
                        <td> {i} </td>
                        <td> {game.name} </td>
                        <td> {game.lobbyName} </td>
                        <td> {game.id} </td>
                        <td> <button className="btn btn-primary" onClick={() => window.location.href=`/game.html?id=${game.id}`}>Join</button> </td>
                    </tr>
                )}
                <tr key="-1">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td> <Input className="form-control" placeholder="Join custom game by id..." setValue={setId} value={id} /> </td>
                    <td> <button className="btn btn-primary" onClick={() => window.location.href=`/game.html?id=${id.trim()}`}>Join</button></td>
                </tr>
                <tr key="-2">
                    <td/> 
                    <td/> 
                    <td/>
                    <td/>
                    <td><button className="btn btn-outline-success" id="refresh" onClick={refresh}>&nbsp;&nbsp;⟳&nbsp;&nbsp;</button></td>
                </tr>
                </tbody>
            </table>


            <div id="create-game-panel" className="container border border-dark">
                <h3 style={{textAlign:'center'}}>CREATE NEW LOBBY</h3>
                <hr/>
                <div className="form-group">
                    <label htmlFor="gametype">Game :&nbsp;</label>
                    <Dropdown id="gametype" placeholder="Select a game" options={['HelloGame', 'DescribeGame']} value={game} setValue={setGame} />
                </div>
                <div className="form-group">
                    <label htmlFor="gamevisibility">Game :&nbsp;</label>
                    <Dropdown id="gamevisibility" placeholder="Select visibility" options={['Public', 'Private']} value={visibility} setValue={setVisibility} />
                </div>
                <div className="form-group">
                    <label htmlFor="lobbyname">Lobby name :&nbsp;</label>
                    <Input id="lobbyname" placeholder="Enter lobby name..." value={lobby} setValue={setLobby} />
                </div>
                <button className="btn btn-success" onClick={() => createLobby(game, {lobbyName: lobby, visibility: visibility})}>{btnTxt}</button>
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(
    <GameList />,
    document.getElementById('page')
);
