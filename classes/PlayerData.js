// use `uuid module` to create a massive random string
// to uniquely identify this player.
// HINT: we don't use the `socket.id` to do that
//       for security reasons because we don't want
//       anyone to know its `socket.id`
const { v4: uuid } = require("uuid");

// this is where ALL the data where EVERY PLAYER needs to know about
class PlayerData {
  constructor(playerName, settings) {
    this.uid = uuid();
    this.name = playerName;
    this.locX = Math.floor(settings.worldWidth * Math.random() + 100);
    this.locY = Math.floor(settings.worldHeight * Math.random() + 100);
    this.radius = settings.defaultSize;
    this.color = this.getRandomColor();
    this.score = 0;
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 200 + 50);
    const g = Math.floor(Math.random() * 200 + 50);
    const b = Math.floor(Math.random() * 200 + 50);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

module.exports = PlayerData;
