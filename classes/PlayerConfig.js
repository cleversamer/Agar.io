// this is where ALL the data is that no OTHER PLAYER needs to know about
class PlayerConfig {
  constructor(settings) {
    this.xVector = 20;
    this.yVector = 20;
    this.speed = settings.defaultSpeed;
    this.zoom = settings.defaultZoom;
  }
}

module.exports = PlayerConfig;
