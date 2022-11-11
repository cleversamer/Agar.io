class Orb {
  constructor() {
    this.color = this.getRandomColor();
    this.locX = Math.floor(500 * Math.random());
    this.locY = Math.floor(500 * Math.random());
    this.radius = 5;
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 200 + 50);
    const g = Math.floor(Math.random() * 200 + 50);
    const b = Math.floor(Math.random() * 200 + 50);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

module.exports = Orb;
