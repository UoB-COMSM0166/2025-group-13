/**
 * Cave class models the cave used at marking point to indicate successful completion of a level
 */

// Constructor, update, and display methods
class Cave {
    //static caveHeight = 100;

    /**
     * Constructor initializes location, type and dimensions of a cave.
     * @param type
     * @param positionX
     * @param positionY
     * @param assetManager
     */
    constructor(type, positionX, positionY, assetManager) {
      this.assetManager = assetManager;
      this.caveType = type;
      this.width = scaleX * 100;
      this.height = scaleY * 100;
  
      this.x = positionX;
      this.y = positionY;
    }

    /**
     * Updates the span attributes(top, bottom, left, right) of cave based on its coordinates.
     * Stops the leftward movement of map when cave has completely appeared in the game screen.
     */
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

    /**
     * Displays the cave on screen based on the type of the cave.
     */
    display() {
      rectMode(CENTER);  // Draw the rectangle with the center point
      if (this.caveType === "FIRE") {
        image(this.assetManager.caveFire, this.x, this.y, this.width, this.height);
      } else if (this.caveType === "ICE") {
        image(this.assetManager.caveIce, this.x, this.y, this.width, this.height);
      }
    }
}