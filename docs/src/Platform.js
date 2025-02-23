class Platform {
  constructor(positionX, positionY, widthOrBrickNumber, height = null, texture = null) {
    if (height === null) {
      this.width = widthOrBrickNumber * Brick.width;
      this.height = Brick.height;
    } else {
      this.width = widthOrBrickNumber;
      this.height = height;
    }

    this.texture = texture;

    this.x = positionX;
    this.y = positionY;

    this.updateBounds();
  }

  updateBounds()
  {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
    if (this.texture) {
      image(this.texture, this.x, this.y, this.width, this.height);
    } else {
      fill(100);
      rect(this.x, this.y, this.width, this.height);
    }
  }
}
