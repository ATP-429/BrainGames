//This is the react file where we'll handle frontend stuff
//This file will send the data to js/games/common/game.js using react,
//which will then send the data to the server/games/common/game.js
var game = null, canvas = null, Canvas = null;
//create_game('HelloGame').then(res => {
    var socket = io.connect({query : `id=custom-id`});
    socket.on('msg', (data) => {
        console.log(data);
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

        Chatbox = (props) => {
            [msg, setMsg] = React.useState("");

            return (
                <React.Fragment>
                    <div id="chatbox" className="border">
                        {
                            Object.keys(props.chat).map((key) => (
                                <React.Fragment key={key}>
                                    <div className="chat-msg">
                                        <div className="chat-name">{props.chat[key].name}</div>
                                        <div className="chat-content">{props.chat[key].content}</div>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                        <input value={msg} type="text" onKeyUp={(e) => {if(e.key == 'Enter') { props.sendMsg(msg); setMsg(""); }}} onInput={(e) => setMsg(e.target.value)} className="form-control" id="chat" placeholder="Enter a message..."></input>
                        <button onClick={() => { props.sendMsg(msg); setMsg(""); }} className="btn btn-primary" id="send">Send</button>
                    </div>
                </React.Fragment>
            )
        }

        Canvas = (props) => {
            [mouse, setMouse] = React.useState({x: 0, y: 0});
            [keys, setKeys] = React.useState({});
            [gameState, setGameState] = React.useState({});


            getInput = () => {
                return {mouse: mouse, key: keys};
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
                    <div id="game-content">
                        <div id="div-canvas"
                            style={{zIndex: 2, width: details.canvasWidth, height: details.canvasHeight}}
                            tabIndex="0" //We have to do this to accept keyboard inputs from the canvas
                            onMouseDown={e => setMouse({...mouse, click: true})}
                            onMouseUp={e => delete mouse['click']}
                            onMouseMove={e => {setMouse({...mouse, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})}}
                            onKeyDown={e => setKeys({...keys, [e.code]: true})}
                            onKeyUp={e => delete keys[e.code]}>


                            {/*THIS IS THE REACT ELEMENT THAT THE SPECIFIC GAME WILL PASS TO US*/}

                            <props.REACT render={reactRender} mouse={mouse} setMouse={setMouse} keys={keys} setKeys={setKeys} gameState={gameState} setGameState={setGameState}/>


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
                    <div id="players" className="border">
                        {
                            gameState.players?.map((_id, index) => (
                                <React.Fragment key={index}>{_id} : {gameState.pdata[_id]?._score}<br/></React.Fragment>
                            ))
                        }
                    </div>
                    <Chatbox chat={gameState.chat ? gameState.chat : {}} sendMsg={() => game.sendMessage(msg)}/>
                </React.Fragment>
            )
        };

        await fetch(`/js/games/${details.name}/${details.name}-react.js`).then(file => file.text()).then((text) => eval.call(window, text));
    })

//});
