class Platform {

  static preload() {
    Platform.img_ground = loadImage('src/assets/ground.png');
    Platform.img_smallPlatform = loadImage('src/assets/platform_small2.png');
    Platform.img_largePlatform = loadImage('src/assets/platform_large2.png');
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
    this.largePlatform = this.width > 100 && this.width < 600; // Large platform

    this.x = positionX;
    this.y = positionY;

    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }


  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
    if (this.largePlatform) {
      image(Platform.img_largePlatform, this.x, this.y, this.width, this.height);
    }
    else if (this.isGround) {
      image(Platform.img_ground, this.x, this.y, this.width, this.height);
    }
    else if (!this.largePlatform && !this.isGround) {
      image(Platform.img_smallPlatform, this.x, this.y, this.width, this.height);
    }
  }
}