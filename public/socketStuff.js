// const socket = io("http://localhost:8080/");
const socket = io("https://samer-agario.herokuapp.com/");

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
});

socket.on("tickTock", (data) => {
  player.locX = data.playerX;
  player.locY = data.playerY;
  document.querySelector(".player-score").innerHTML = data.playerScore;
});

socket.on("orbSwitch", (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrb);
});

socket.on("updateLeaderBoard", (topPlayers) => {
  // Clear the leader board
  document.querySelector(".leader-board").innerHTML = "";

  // update the leader board
  topPlayers.forEach((p) => {
    document.querySelector(
      ".leader-board"
    ).innerHTML += `<li class="leaderboard-player">${p.name} - ${p.score}</li>`;
  });
});

socket.on("playerDeath", (data) => {
  const killed = data.died.name;
  const killer = data.killedBy.name;
  const message = `${killed} absorbed by ${killer}`;

  document.querySelector("#game-message").innerHTML = message;
  $("#game-message").css({
    "background-color": "#00e6e6",
    opacity: 1,
  });
  $("#game-message").show();
  $("#game-message").fadeOut(5000);
});
