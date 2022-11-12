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
});
