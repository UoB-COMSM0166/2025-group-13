/**
 * SkyFall class models the objects falling from the sky. These objects reduce the player's health
 * when they hit a player. SkyFall objects are generated randomly at regular intervals and fall
 * from top of the screen and disappear when they reach bottom of the screen. SkyFall objects can pass
 * through platforms.
 */
// Constructor, update, and display methods
class SkyFall {
  /**
   * Constructor initializes position, dimension and movement attributes.
   * @param type - Type of SkyFall objects.
   * @param positionX - X coordinate.
   * @param startY - Y coordinate.
   * @param assetManager - Reference to asset manager for audio and visual resources.
   * @param fallSpeed - Speed of falling.
   * @param groundY - Y coordinate. When object falling from sky reaches ground it disappears.
   * @param delayBeforeFall - Period before the first falling object appears.
   * @param cooldownTime - Delay between consecutive falls.
   */
  constructor(type = null, positionX, startY, assetManager, fallSpeed = 5,
    groundY = 485, delayBeforeFall = 120, cooldownTime = 180) {
    this.assetManager = assetManager;
    this.skyFallType = type;

    this.width = 30;
    this.height = 60;

    this.x = positionX;
    this.startY = startY;
    this.y = startY;

    this.fallSpeed = fallSpeed;
    this.groundY = groundY;
    this.delayBeforeFall = delayBeforeFall;
    this.cooldownTime = cooldownTime;

    this.timer = delayBeforeFall;
    this.cooldownTimer = 0;

    this.isFalling = false;
    this.hasLanded = false;

    // Random angle between -30 to 30 degrees (in radians)
    this.angle = random(-PI / 6, PI / 6);
    this.fallSpeedX = this.fallSpeed * sin(this.angle);
    this.fallSpeedY = this.fallSpeed * cos(this.angle);
  }

  /**
   * Updates the falling object based on its interaction with player
   */
  updateSkyFall() {
    if (this.hasLanded) {
      // Reset collision boundaries during cooldown
      this.top = this.bottom = this.left = this.right = 0;
    } else {
      // Update collision boundaries normally
      this.top = this.y - this.height / 2;
      this.bottom = this.y + this.height / 2;
      this.left = this.x - this.width / 2;
      this.right = this.x + this.width / 2;
    }
  }

  /**
   * Updates object's coordinates and calculates delay and pause times.
   */
  update() {
    if (this.hasLanded) {
      this.cooldownTimer--;
      if (this.cooldownTimer <= 0) {
        this.reset();
      }
      return;
    }

    if (!this.isFalling) {
      this.timer--;
      if (this.timer <= 0) {
        this.isFalling = true;
      }
    } else {
      this.x += this.fallSpeedX;
      this.y += this.fallSpeedY;

      if (this.y >= this.groundY - this.height / 2) {
        this.hasLanded = true;
        this.cooldownTimer = this.cooldownTime;
      }
    }

    this.updateSkyFall();
  }

  /**
   * Resets the next falling object's location, speed and angle of approach.
   */
  reset() {
    this.x = this.x - this.fallSpeedX * (this.delayBeforeFall / this.fallSpeedY); // Reset X near original
    this.y = this.startY;
    this.timer = this.delayBeforeFall;
    this.isFalling = false;
    this.hasLanded = false;

    // Re-randomize angle
    this.angle = random(-PI / 6, PI / 6);
    this.fallSpeedX = this.fallSpeed * sin(this.angle);
    this.fallSpeedY = this.fallSpeed * cos(this.angle);
  }

  /**
   * Displays the falling objects based on their types with appropriate graphics
   */
  display() {
    this.update();

    if (!this.hasLanded) {
      push();
      translate(this.x, this.y);
      rotate(-this.angle);
      imageMode(CENTER);
      if (this.skyFallType === "FIRE") {
        image(this.assetManager.skyFireImg, 0, 0, this.width, this.height);
      } else if (this.skyFallType === "ICESPIKE") {
        image(this.assetManager.skyIceImg, 0, 0, this.width, this.height);
      } else if (this.skyFallType === "DESERT") {
        image(this.assetManager.skyDesertImg, 0, 0, this.width, this.height);
      }
      pop();
    }
  }
}
