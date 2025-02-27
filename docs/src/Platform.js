class Platform {

  static preload() {
    Platform.tilesetImg = loadImage('src/assets/tile_grandTreePlatform.png');
    // Platform.lavaImg = loadImage('src/assets/tile_lava.gif');
  }

  constructor(positionX, positionY, widthOrBrickNumber, height = null) {
    this.tilesetImg = null;
    // this.lavaImg = null;
    if (widthOrBrickNumber === "full") {
      this.width = width;
    } if (height === null) {
      this.width = widthOrBrickNumber * Brick.width;
      this.height = Brick.height;
    } else {
      this.width = widthOrBrickNumber;
      this.height = height;
    }
    this.tileNumber = widthOrBrickNumber;
    this.isGround = this.width === 600; // Ground
    this.isLava = this.width === "full"; // Lava
    this.isPlatform = this.width > 100 && this.width < 600; // Large platform

    this.x = positionX;
    this.y = positionY;

    this.display();
    this.updateBounds();
  }

  updateBounds() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
    let tileWidth = Brick.width;
    let tileHeight = Brick.height;
    let tilesX = Math.ceil(this.width / tileWidth);
    let scaledTileWidth = this.width / tilesX;

    if (this.isGround) {
      let sx = 0, sy = 0, sw = 800, sh = 800;

      for (let i = 0; i < tilesX; i++) {
        let dx = this.left + i * scaledTileWidth + tileWidth / 2;
        let dy = this.y;

        image(Platform.tilesetImg, dx, dy, scaledTileWidth, tileHeight, sx, sy, sw, sh);
      }
    }

    else {
      fill(100);
      rect(this.x, this.y, this.width, this.height);
    }
  }
}
// image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
