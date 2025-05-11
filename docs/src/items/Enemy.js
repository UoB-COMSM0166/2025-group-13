/**
 * Enemy class models the NPCs in the game. When player comes in contact with an enemy
 * the rate of reduction of health spikes while the player remains in contact. Enemies in the game
 * have their base location but keep moving and changing directions periodically.
 */

// Constructor, update, and display methods
class Enemy {
  /**
   * Constructor initializes location, dimensions and movement attributes of an enemy.
   * @param type - Type of enemy.
   * @param positionX - X coordinate.
   * @param positionY - Y coordinate.
   * @param assetManager - Reference to asset manager.
   * @param speed - Horizontal speed.
   * @param maxDistance - Maximum traversable distance from base location
   * @param pauseTime - Time lapsed after player has reached maxDistance and before direction is changed
   */
  constructor(
    type = null,
    positionX,
    positionY,
    assetManager,
    speed = 1.2,
    maxDistance = 100,
    pauseTime = 6
  ) {
    this.assetManager = assetManager;
    this.width = 50;
    this.height = 40;

    this.x = positionX;
    this.y = positionY;

    this.enemyType = type;
    this.stableHeight = 15;

    this.speed = speed;
    this.maxDistance = maxDistance;
    this.pauseTime = pauseTime; // Duration to pause before flipping

    this.direction = 1; // 1 = right, -1 = left
    this.distanceTravelled = 0;

    this.pauseCounter = 0; // Counter to track pause time
    this.flipped = false; // Track if image has been flipped
    this.isFlipping = false; // Track if we're in the process of flipping

    this.originX = positionX;
  }

  /**
   * Updates the span attributes of enemy based on its coordinates.
   */
  updateEnemy() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  /**
   * Displays the enemy with appropriate visual effects
   */
  display() {
    // If the enemy is pausing, count the time
    if (this.pauseCounter > 0) {
      this.pauseCounter--;

      // If pause is over, flip image and start moving in the opposite direction
      if (this.pauseCounter === 0) {
        if (!this.isFlipping) {
          this.isFlipping = true; // Start flipping phase
          this.direction *= -1; // Change direction
          this.flipped = !this.flipped; // Flip image
          this.pauseCounter = this.pauseTime; // Start second pause after flip
        } else {
          this.isFlipping = false; // Reset flip state after second pause
        }
      }
    } else {
      // Move enemy position if not paused
      this.x += this.speed * this.direction;
      this.distanceTravelled += this.speed;

      // Check if enemy reached max distance and should pause
      if (this.distanceTravelled >= this.maxDistance) {
        this.pauseCounter = this.pauseTime; // Start pause timer
        this.distanceTravelled = 0; // Reset travel distance
      }
    }

    // Draw the enemy image regardless of pause state
    push();
    translate(this.x, this.y + this.stableHeight);

    // Flip image when moving left or during the flipping phase
    if (this.direction === -1 || this.flipped) {
      scale(-1, 1);
      // translate(-this.width/2, 0);
    }

    if (this.enemyType === "FIRE") {
      image(this.assetManager.enemyFireImg, 0, 0, this.width, this.height);
    } else if (this.enemyType === "ICESPIKE") {
      image(this.assetManager.enemyIceImg, 0, 0, this.width, this.height);
    } else if (this.enemyType === "DESERT") {
      image(this.assetManager.enemyDesertImg, 0, 0, this.width, this.height);
    }
    pop();

    // Update collision box
    this.updateEnemy();
  }
}
