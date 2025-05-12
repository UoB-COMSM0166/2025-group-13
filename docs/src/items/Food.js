/**
 * Food class models the food objects present in game map. Consumption of food objects increases the
 * player's health and helps player recover after its health deteriorates over time and also after encountering
 * enemies and damaging objects in the game.
 */
// Constructor, update, and display methods
class Food {
  constructor(type = null, positionX, positionY, assetManager) {
    this.assetManager = assetManager;
    this.width = scaleX * 20;
    this.height = scaleY * 20;

    this.x = positionX;
    this.y = positionY;

    this.foodType = type;
  }

  /**
   * Updates food span attributes based on its coordinates
   */
  updateFood() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  /**
   * Displays the food with appropriate visual effects based on its type
   */
  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
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

    image(
      this.assetManager.healthRelatedItems,
      this.x, this.y,
      scaledWidth, scaledHeight,
      sx, sy, sw, sh
    );
  }
}
