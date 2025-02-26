class Platform {

  static preload() {
    Platform.tileset = loadImage('src/assets/tile_grandTreePlatform.png');
  }

  constructor(positionX, positionY, widthOrBrickNumber, height = null) {
    if (height === null) {
      this.width = widthOrBrickNumber * Brick.width;
      this.height = Brick.height;
    } else {
      this.width = widthOrBrickNumber;
      this.height = height;
    }

    this.isGround = this.width === 600; // Ground
    this.isPlatform = this.width > 100 && this.width < 600; // Large platform

    this.x = positionX;
    this.y = positionY;

    this.display();
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
    if (this.isGround) {
      image(Platform.tileset, this.x, this.y, this.width, this.height);
    }
    else if (this.isGround) {
      image(Platform.img_ground, this.x, this.y, this.width, this.height);
    }
    else if (!this.isPlatform && !this.isGround && Platform.img_smallPlatform) {
      image(Platform.img_smallPlatform, this.x, this.y, this.width, this.height);
    }
    else {
      fill(100);
      rect(this.x, this.y, this.width, this.height);
    }
  }
}
// image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
