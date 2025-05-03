// Constructor, update, and display methods
class Platform {
  constructor(type = null, positionX, positionY, widthOrBrickNumber, height = null, assetManager) {
    this.assetManager = assetManager;
    this.platformType = type;
    if (widthOrBrickNumber === "full") {
      this.width = game.windowWidth;
    } if (height === null) {
      this.width = widthOrBrickNumber * Brick.width;
      this.height = Brick.height;
      this.tileNumber = widthOrBrickNumber;
    } else {
      this.width = widthOrBrickNumber;
      this.height = height;
    }

    this.x = positionX;
    this.y = positionY;
    //this.y = 750;
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;

    this.updateBounds();
    this.updatePreviousCoordinates();
  }

  updateBounds() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point

    let tilesX = Math.ceil(this.width / Brick.width);
    let scaledTileWidth = this.width / tilesX;
    let tilesY = Math.ceil(this.height / Brick.height);
    let scaledTileHeight = this.height / tilesY;

    if (this.platformType === "GROUND") {
      let sx = 0, sy = 0, sw = 770, sh = 770;

      for (let i = 0; i < tilesX; i++) {
        let dx = this.left + i * scaledTileWidth + Brick.width / 2;
        let dy = this.y;
        //let dy = height - Brick.height / 2; 

        image(this.assetManager.tilesetImg, dx, dy, scaledTileWidth, Brick.height, sx, sy, sw, sh);
      }
    } else if (this.platformType === "FLOAT") {
      let sx = 1450, sy = 0, sw = 730, sh = 800;

      for (let i = 0; i < tilesX; i++) {
        let dx = this.left + i * scaledTileWidth + Brick.width / 2;
        let dy = this.y;

        image(this.assetManager.tilesetImg, dx, dy, scaledTileWidth, Brick.height, sx, sy, sw, sh);
      }
    }else if (this.platformType === "TREE") {
      let sx = 770, sy = 0, sw = 700, sh = 810;

      for (let i = 0; i < tilesY; i++) {
        let dx = this.x;
        let dy = this.top + scaledTileHeight/2 + (i * scaledTileHeight);

        image(this.assetManager.tilesetImg, dx, dy, scaledTileWidth, scaledTileHeight, sx, sy, sw, sh);

      }
    }else {
      fill("pink");
      rect(this.x, this.y, this.width, this.height);
    }
  }

  updatePreviousCoordinates()
  {
    this.prevX = this.x;
    this.prevLeft = this.left;
    this.prevRight = this.right;
  }
}
