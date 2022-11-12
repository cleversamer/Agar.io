const PlayerConfig = require("./PlayerConfig");
const PlayerData = require("./PlayerData");
const settings = require("../settings");

// this is where ALL the data is stored about a given PLAYER
class Player {
  constructor(
    socketId,
    playerConfig = new PlayerConfig(settings),
    playerData = new PlayerData("Player", settings)
  ) {
    this.socketId = socketId;
    this.config = playerConfig;
    this.data = playerData;
  }
}

module.exports = Player;
