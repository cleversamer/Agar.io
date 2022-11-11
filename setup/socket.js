const socketio = require("socket.io");
const Orb = require("../classes/Orb");

let orbs = [];

// runs at the beginning of a new game
function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}

module.exports = (server) => {
  initGame();

  const socketConfig = {
    origin: "*",
    methods: ["GET", "POST"],
  };

  const io = socketio(server, socketConfig);

  io.sockets.on("connection", (socket) => {
    socket.emit("init", {
      orbs,
    });

    socket.on("disconnect", (data) => {
      //
    });

    socket.on("dataFromClient", (data) => {
      //
    });
  });
};
