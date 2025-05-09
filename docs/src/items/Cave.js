// Constructor, update, and display methods
class Cave {
    //static caveHeight = 100;

    constructor(type, positionX, positionY, assetManager) {
      this.assetManager = assetManager;
      this.caveType = type;
      this.width = scaleX * 100;
      this.height = scaleY * 100;
  
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
      if (this.caveType === "FIRE") {
        image(this.assetManager.caveFire, this.x, this.y, this.width, this.height);
      } else if (this.caveType === "ICE") {
        image(this.assetManager.caveIce, this.x, this.y, this.width, this.height);
      }
    }
}