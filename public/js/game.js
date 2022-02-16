create_game('Game').then(res => {
  let socket = io.connect('http://localhost:3000', {
    query: `id=${res.id}`
  });
  socket.on('msg', data => {
    console.log(data);
  });
});
//# sourceMappingURL=game.js.map