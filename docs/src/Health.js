class Health {
  static initialPercentage = 1;
  static reductionRate = 0.0004;

  constructor(assetManager) {
    this.assetManager = assetManager;
    // Initialize the health bar
    this.percentage = Health.initialPercentage;
    this.width = 4 * Brick.width;
    this.height = Brick.height / 3;

    this.x = 40;
    this.y = 15;
  }

  updateHealth() {
    if (this.percentage > 0) {
      this.percentage = this.percentage - Health.reductionRate;
    }
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
    let heartHeight = 20;
    let heartWidth = 20;
    sx = (520 * 2); sy = 0; sw = 520; sh = 522;
    image(
      this.assetManager.healthRataledItems,
      this.x - heartWidth/2-5, this.y + heartHeight / 2-2,
      heartWidth, heartHeight,
      sx, sy, sw, sh
    );

    // A CSS named color.
    stroke('red');
    strokeWeight(2);
    fill('orange')
    rect(this.x, this.y, this.width, this.height, 2);
    fill('green');
    rect(this.x, this.y, this.percentage * this.width, this.height);
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
