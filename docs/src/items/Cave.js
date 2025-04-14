// Constructor, update, and display methods
class Cave {
    static caveHeight = 120;

    constructor(positionX, positionY, assetManager) {
      this.assetManager = assetManager;
      this.width = 120;
      this.height = Cave.caveHeight;
  
      this.x = positionX;
      this.y = positionY;
    }
  
    updateCave()
    {
      this.top = this.y - this.height / 2;
      this.bottom = this.y + this.height / 2;
      this.left = this.x - this.width / 2;
      this.right = this.x + this.width / 2;

        if(this.right < width){
          game.stopMapMovement = true;
        }
    }
  
    display() {
      rectMode(CENTER);  // Draw the rectangle with the center point
      image(this.assetManager.caveImg, this.x, this.y, this.width, this.height);
    }
}