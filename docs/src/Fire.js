class Fire {
  constructor(positionX, positionY, assetManager) {
    this.assetManager = assetManager;
    this.width = 50;
    this.height = 60;

    this.x = positionX;
    this.y = positionY;

    this.display();
    this.updateFire();
  }

  updateFire() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
    // image(this.assetManager.fireImg, this.x, this.y, this.width, this.height);

    // draw background rectangle for testing
    // fill(200, 200, 255, 150);
    // noStroke();
    // rect(this.x, this.y, this.width, this.height);

    let sx, sy, sw, sh;
    let aspectRatio, scaledWidth, scaledHeight;
    sx = (520 * 3) + 120; sy = 0; sw = 400; sh = 500;
    aspectRatio = sw / sh;
    scaledWidth = this.height * aspectRatio;
    scaledHeight = this.height;
    image(
      this.assetManager.healthRataledItems,
      this.x, this.y - 10,
      scaledWidth, scaledHeight,
      sx, sy, sw, sh
    );
  }
}
