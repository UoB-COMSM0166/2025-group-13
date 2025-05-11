/**
 * Health class models the health property associated with a player.
 * This is one of the twist elements of our game where player's health deteriorate
 * over time, incentivising the player to navigate obstacles and reach the cave.
 * Health is displayed using a bar on top left of the screen.
 */

// Constructor, update, and display methods
class Health {
  //Default maximum health
  static initialPercentage = 1;
  //Default reduction rate for health.
  static reductionRate = 0.00032;

  /**
   * Constructor initializes the graphic attributes corresponding to the health i.e. health bar.
   * @param assetManager - Reference of asset manager.
   */
  constructor(assetManager) {
    this.assetManager = assetManager;
    // Initialize the health bar
    this.percentage = Health.initialPercentage;
    this.width = 5 * Brick.width;
    this.height = Brick.height / 2;

    this.x = scaleX * 50;
    this.y = scaleY * 25;
  }

  /**
   * Updates the health before each new frame of the game according to set reduction rate.
   */
  updateHealth() {
    if (this.percentage > 0) {
      this.percentage = this.percentage - Health.reductionRate;
    }
  }

  /**
   * Getter for health percentage
   * @returns {number} - Health percentage
   */
  getHealth() {
    return this.percentage;
  }

  /**
   * Setter for health percentage
   * @param percentage - Input health percentage.
   */
  setHealth(percentage) {
    this.percentage = percentage;
  }

  /**
   * Displays the health using a health bar using appropriate visual resources
   * from asset manager on the top left side of the game screen.
   */
  display() {
    // Draw the rectangle with the top right corner point
    rectMode(CORNER);

    let sx, sy, sw, sh;
    let heartHeight = 30;
    let heartWidth = 30;
    sx = (520 * 2); sy = 0; sw = 520; sh = 522;
    image(
      this.assetManager.healthRelatedItems,
      this.x - heartWidth / 2 - 5, this.y + heartHeight / 2 - 2,
      heartWidth, heartHeight,
      sx, sy, sw, sh
    );

    // A CSS named color.
    switch (game.currentMap) {
      case 0:
        fill('rgba(255, 165, 0, 0.2)'); // Orange with 80% transparency
        break;
      case 1:
        fill('rgba(0, 0, 255, 0.2)'); // Blue with 80% transparency
        break;
    }
    stroke('red');
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height, 2);
    fill('limegreen');
    rect(this.x, this.y, this.percentage * this.width, this.height);
  }
}
