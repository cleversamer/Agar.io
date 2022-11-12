const socketio = require("socket.io");
const Orb = require("../classes/Orb");
const Player = require("../classes/Player");
const PlayerConfig = require("../classes/PlayerConfig");
const PlayerData = require("../classes/PlayerData");
const collisions = require("./collisions");

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5, // as the player gets bigger, the zoom needs to go out
  worldWidth: 5000,
  worldHeight: 5000,
};

module.exports = (server) => {
  initGame();

  const socketConfig = {
    origin: "*",
    methods: ["GET", "POST"],
  };

  const io = socketio(server, socketConfig);

  // issue a message to EVERY connected socket 30 fps
  setInterval(() => {
    if (players.length) {
      io.to("game").emit("tock", { players });
    }
  }, 33);

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

      // issue a message to THIS connected socket with its lock 30 fps
      setInterval(() => {
        socket.emit("tickTock", {
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

    // the client sent over a tick, that means we know what direction to move the socket
    socket.on("tick", (data) => {
      speed = player.config.speed;

      // update the playerConfig object with the new direction
      // and at the same time create a local variable for this
      // callback for readability!
      xV = player.config.xVector = data.xVector;
      yV = player.config.yVector = data.yVector;

      if (
        (player.data.locX < 5 && player.data.xVector < 0) ||
        (player.data.locX > settings.worldWidth && xV > 0)
      ) {
        player.data.locY -= speed * yV;
      } else if (
        (player.data.locY < 5 && yV > 0) ||
        (player.data.locY > settings.worldHeight && yV < 0)
      ) {
        player.data.locX += speed * xV;
      } else {
        player.data.locX += speed * xV;
        player.data.locY -= speed * yV;
      }

      // ORB COLLISION!!!
      let capturedOrb = collisions.checkForOrbCollisions(
        player.data,
        player.config,
        orbs,
        settings
      );

      capturedOrb
        .then((orbIndex) => {
          // means that a collision happened!

          // we need to emit to all connected sockets
          // that this orb has been replaced.
          io.sockets.emit("orbSwitch", {
            orbIndex,
            newOrb: orbs[orbIndex],
          });
        })
        .catch((err) => {
          // means that no collision happened!
        });

      // PLAYER COLLISION!!!
      let playerDeath = collisions.checkForPlayerCollisions(
        player.data,
        player.config,
        players,
        player.socketId
      );

      playerDeath
        .then((data) => {
          // means that a collision happened!
        })
        .catch((err) => {
          // means that no collision happened!
        });
    });
  });
};

// runs at the beginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}
