const socketio = require("socket.io");

module.exports = (server) => {
  const socketConfig = {
    origin: "*",
    methods: ["GET", "POST"],
  };

  const io = socketio(server, socketConfig);

  io.sockets.on("connection", (socket) => {
    socket.on("disconnect", (data) => {
      //
    });

    socket.on("dataFromClient", (data) => {
      //
    });
  });
};
