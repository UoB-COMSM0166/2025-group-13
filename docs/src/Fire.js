class Fire {
  constructor(positionX, positionY, assetManager) {
    this.assetManager = assetManager;
    this.width = 40;
    this.height = 48;

    this.x = positionX;
    this.y = positionY;

    this.stableHeight = 15; // Fire animation requirements: Fixed the height of the bottom of the flame

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
    //nomal stable fire
    // image(
    //   this.assetManager.healthRataledItems,
    //   this.x, this.y - 10,
    //   scaledWidth, scaledHeight,
    //   sx, sy, sw, sh
    // );

    //Fire animation
    let shearAmount = sin(frameCount * 0.1) * 0.1;

    push();
    translate(this.x, this.y + this.stableHeight); //steable fire bottem
    shearX(shearAmount);

    // Breathing flash
    let alpha = map(sin(frameCount * 0.05), -1, 1, 150, 255);
    tint(255, alpha);

    image(
      this.assetManager.healthRataledItems,
      0, -this.stableHeight,
      scaledWidth, scaledHeight,
      sx, sy, sw, sh
    );

    noTint();
    pop();

  }
}
