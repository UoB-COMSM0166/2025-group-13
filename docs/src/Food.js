class Food {
  //static food_height = 20;
  //static food_width = 20;

  constructor(type = null, positionX, positionY, assetManager) {
    this.assetManager = assetManager;
    this.width = 20;
    this.height = 20;

    this.x = positionX;
    this.y = positionY;

    this.foodType = type;

    this.display();
    this.updateFood();
  }

  updateFood() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
    // image(this.assetManager.foodImg, this.x, this.y, this.width, this.height);
    let sx, sy, sw, sh;
    let aspectRatio, scaledWidth, scaledHeight;

    if (this.foodType === "APPLE") {
      sx = 0; sy = 0; sw = 525; sh = 500;
    } else if (this.foodType === "MEAT") {
      sx = (520 * 1 + 0); sy = 0; sw = 525; sh = 500;
    } else {
      //default food is meat
      sx = (520 * 1 + 0); sy = 0; sw = 525; sh = 500;
    }

    aspectRatio = sw / sh;
    scaledWidth = this.height * aspectRatio;
    scaledHeight = this.height;

    // draw background rectangle for testing
    // fill(200, 200, 255, 150);
    // noStroke();
    // rect(this.x, this.y, this.width, this.height);

    image(
      this.assetManager.healthRelatedItems,
      this.x, this.y,
      scaledWidth, scaledHeight,
      sx, sy, sw, sh
    );
  }
}
