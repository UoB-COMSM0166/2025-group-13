class Health {
  static initialPercentage = 1;
  static reductionRate = 0.0004;

  constructor(assetManager) {
    this.assetManager = assetManager;
    // Initialize the health bar
    this.percentage = Health.initialPercentage;
    this.width = 5 * Brick.width;
    this.height = Brick.height / 2;

    this.x = 50;
    this.y = 25;
  }

  display() {
    // Draw the rectangle with the top right corner point
    rectMode(CORNER);
    // image(this.assetManager.img_heart, 20, 20, 25, 25);

    // draw background rectangle for testing
    // fill(200, 200, 255, 150);
    // noStroke();
    // rect(this.x, this.y, this.width, this.height);

    let sx, sy, sw, sh;
    let heartHeight = 30;
    let heartWidth = 30;
    sx = (520 * 2); sy = 0; sw = 520; sh = 522;
    image(
      this.assetManager.healthRataledItems,
      this.x - heartWidth / 2 - 5, this.y + heartHeight / 2 - 2,
      heartWidth, heartHeight,
      sx, sy, sw, sh
    );

    // A CSS named color.
    switch (game.currentMap) {
      case 0:
        fill('rgba(255, 165, 0, 0.2)'); // Orange with 80% transparency
        break;
      case 1:
        fill('rgba(0, 0, 255, 0.2)'); // Blue with 80% transparency
        break;
    }
    stroke('red');
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height, 2);
    fill('limegreen');
    rect(this.x, this.y, this.percentage * this.width, this.height);
  }

  updateHealth() {
    if (this.percentage > 0) {
      this.percentage = this.percentage - Health.reductionRate;
    }
  }

  getHealth() {
    return this.percentage;
  }

  setHealth(percentage) {
    this.percentage = percentage;
  }

  /*updateReductionRate(newRate) {
    Health.reductionRate = newRate;
  }*/
}
