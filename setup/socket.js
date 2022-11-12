const socketio = require("socket.io");
const Orb = require("../classes/Orb");
const Player = require("../classes/Player");
const PlayerConfig = require("../classes/PlayerConfig");
const PlayerData = require("../classes/PlayerData");
const collisions = require("./collisions");

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5, // as the player gets bigger, the zoom needs to go out
  worldWidth: 500,
  worldHeight: 500,
};

module.exports = (server) => {
  initGame();

  const socketConfig = {
    origin: "*",
    methods: ["GET", "POST"],
  };

  const io = socketio(server, socketConfig);

  io.sockets.on("connection", (socket) => {
    // a player has connected
    let player = new Player();

    socket.on("init", (data) => {
      // add the player to the `game` namespace
      socket.join("game");

      // make a playerConfig object
      let playerConfig = new PlayerConfig(settings);

      // make a playerData object
      let playerData = new PlayerData(data.playerName, settings);

      // make a master player object to hold both
      player = new Player(socket.id, playerConfig, playerData);

      // issue a message to EVERY connected socket 30 fps
      setInterval(() => {
        io.to("game").emit("tock", {
          players,
          playerX: player.data.locX,
          playerY: player.data.locY,
        });
      }, 33);

      socket.emit("initReturn", {
        orbs,
      });

      // add player to players list
      players.push(playerData);
    });

    // the server sent over a tick, that means we know what direction to move the socket
    socket.on("tick", (data) => {
      speed = player.config.speed || settings.defaultSpeed;

      // update the playerConfig object with the new direction
      // and at the same time create a local variable for this
      // callback for readability!
      xV = player.config.xVector = data.xVector;
      yV = player.config.yVector = data.yVector;

      if (
        (player.data.locX < 5 && player.data.xVector < 0) ||
        (player.data.locX > 500 && xV > 0)
      ) {
        player.data.locY -= speed * yV;
      } else if (
        (player.data.locY < 5 && yV > 0) ||
        (player.data.locY > 500 && yV < 0)
      ) {
        player.data.locX += speed * xV;
      } else {
        player.data.locX += speed * xV;
        player.data.locY -= speed * yV;
      }
    });
  });
};

// runs at the beginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}
