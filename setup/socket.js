const socketio = require("socket.io");
const Orb = require("../classes/Orb");
const Player = require("../classes/Player");
const PlayerConfig = require("../classes/PlayerConfig");
const PlayerData = require("../classes/PlayerData");

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

    socket.on("init", (data) => {
      // make a playerConfig object
      let playerConfig = new PlayerConfig(settings);

      // make a playerData object
      let playerData = new PlayerData(data.playerName, settings);

      // make a master player object to hold both
      let player = new Player(socket.id, playerConfig, playerData);

      socket.emit("initReturn", {
        orbs,
      });

      // add player to players list
      players.push(playerData);
    });
  });
};

// runs at the beginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}
