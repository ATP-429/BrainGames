//This is the react file where we'll handle frontend stuff
//This file will send the data to js/games/common/game.js using react,
//which will then send the data to the server/games/common/game.js

var game = null, canvas = null, Canvas = null;
var socket = io.connect({query : `id=${new URL(window.location.href).searchParams.get('id')}`});
socket.on('msg', (data) => {
    console.log(data);
    if(data === 'Game not found') {
        let element = document.createElement('div');
        element.innerHTML = `<h1>GAME NOT FOUND!</h1><br><h3>Make sure you entered the correct id!</h3>`;
        document.getElementById('game-page').append(element);
    }
});

socket.on('details', async (details) => {
    await fetch(`/js/games/${details.name}/${details.name}-base.js`).then(file => file.text()).then((text) => eval.call(window, text));
    let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `js/games/${details.name}/${details.name}.css`;
    link.media = 'all';
    head.appendChild(link);

    Canvas = (props) => {
        [mouse, setMouse] = React.useState({x: 0, y: 0});
        [keys, setKeys] = React.useState({});
        [gameState, setGameState] = React.useState({});
        [shareTxt, setShareTxt] = React.useState('GET LINK')


        getInput = () => {
            return {mouse: mouse, key: keys};
        }

        share = () => {
            navigator.clipboard.writeText(window.location.href);
            setShareTxt('Copied to clipboard!');
            setTimeout(() => setShareTxt('GET LINK'), 3000);
        }

        //We only want one instance of game object to be created, so we need to useEffect, which will only create a new instance if the second parameter undergoes a change
        //Since we're passing an empty array as the second parameter, a new game object will never be created.
        //So, the code will only run once, after this component has been rendered
        React.useEffect(() => {
            game = eval(`new ${details.name}(socket, details, getInput, setGameState, reactRender)`); //Pass the inputs by reference
            canvas = document.getElementById('canvas');
        }, []);

        reactRender = () => {
            let bufferCanvas = document.createElement('canvas');
            let ctx = bufferCanvas.getContext('2d');
            bufferCanvas.width = canvas.width;
            bufferCanvas.height = canvas.height;

            game.render(ctx);

            canvas.getContext('2d').clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
            canvas.getContext('2d').drawImage(bufferCanvas, 0, 0);
        }

        return (
            //The div-canvas will be used for html elements
            <React.Fragment>
                <div id="players" className="border">
                    <div className="title">PLAYERS</div>
                    <hr/>
                    {
                        gameState.players?.map((_id, index) => (
                            <PlayerCard playerName={_id} score={gameState.pdata[_id]?._score}key={index}/>
                        ))
                    }
                </div>
                <div id="game-content">
                    <img src="https://i.imgur.com/mOaTPx8.png" id="logo"></img>
                    <div id="container">
                        <div id="div-canvas"
                            style={{zIndex: 2, width: details.canvasWidth, height: details.canvasHeight}}
                            tabIndex="0" //We have to do this to accept keyboard inputs from the canvas
                            onMouseDown={e => setMouse({...mouse, click: true})}
                            onMouseUp={e => delete mouse['click']}
                            onMouseMove={e => {setMouse({...mouse, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})}}
                            onKeyDown={e => setKeys({...keys, [e.code]: true})}
                            onKeyUp={e => delete keys[e.code]}>


                            {/*NOTE:THIS IS THE REACT ELEMENT THAT THE SPECIFIC GAME WILL PASS TO US*/}

                            <props.REACT render={reactRender} mouse={mouse} setMouse={setMouse} game={game} keys={keys} setKeys={setKeys} gameState={gameState} setGameState={setGameState}/>


                            <div id="indicators-container">
                                <div className='indicator input-taken border border-dark rounded' active={gameState.inputTaken ? 'true' : 'false'}> </div>
                                <div className='indicator update-done border border-dark rounded' active={gameState.updateDone ? 'true' : 'false'}> </div>
                            </div>
                        </div>
                        <canvas
                            style={{zIndex: 1}}
                            width={details.canvasWidth}
                            height={details.canvasHeight}
                            id="canvas" className="border">
                        </canvas>
                    </div>
                </div>
                <Chatbox chat={gameState.chat ? gameState.chat : {}} sendMsg={() => game.sendMessage(msg)}/>
                <div id="share-container">
                    <div> <button className="btn btn-primary" onClick={share}>{shareTxt}</button> </div>
                    <div>
                        <hr/>
                        <div style={{textAlign:'center'}}><h2>OR</h2></div><br/>
                        <hr/>
                        <h5>Game ID:</h5> {details.id} <br/>
                        Share ID with your friend
                    </div>
                </div>
            </React.Fragment>
        )
    };

    await fetch(`/js/games/${details.name}/${details.name}-react.js`).then(file => file.text()).then((text) => eval.call(window, text));
})
