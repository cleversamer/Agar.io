const socket = io("http://localhost:8080/");

// this function gets called whem the user enters the game
function init() {
  // start drawing the screen recursively!
  draw();

  // call the `init event` when the user is ready for the data
  socket.emit("init", {
    playerName: player.name,
  });
}

socket.on("initReturn", (data) => {
  orbs = data.orbs;

  setInterval(() => {
    socket.emit("tick", {
      xVector: player.xVector,
      yVector: player.yVector,
    });
  }, 33);
});

socket.on("tock", (data) => {
  players = data.players;
  player.locX = data.playerX;
  player.locY = data.playerY;
});

socket.on("orbSwitch", (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrb);
});
