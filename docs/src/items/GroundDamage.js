/**
 * Ground damage class models the static health damaging objects like fire and ice-spikes.
 * Health reduction rate of the player increases while it remains in contact with Ground damage
 * in the map.
 */

// Constructor, update, and display methods
class GroundDamage {
  /**
   * Initializes the ground damage class
   * @param type - Type of object, either - Fire or Ice-Spike.
   * @param positionX - X coordinate.
   * @param positionY - Y coordinate.
   * @param assetManager - Reference to asset manager object useful in drawing the object based on its type.
   */
  constructor(type = null, positionX, positionY, assetManager) {
    this.assetManager = assetManager;
    this.width = 40;
    this.height = 48;

    this.x = positionX;
    this.y = positionY;

    this.groundDamageType = type;
    this.stableHeight = 15; // Fire animation requirements: Fixed the height of the bottom of the flame
  }

  /**
   * Updates the span ground damage objects based on its coordinates.
   */
  updateGroundDamage() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  /**
   * Retrieves the appropriate image from asset manager based on type of ground damage object and displays the objects.
   */
  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point
    let sx, sy, sw, sh;
    let aspectRatio, scaledWidth, scaledHeight;

    if (this.groundDamageType === "FIRE") {
      sx = (520 * 3) + 120; sy = 0; sw = 400; sh = 500;
    } else if (this.groundDamageType === "ICESPIKE") {
      sx = (520 * 4) + 120; sy = 0; sw = 400; sh = 500;
    }

    push();
    translate(this.x, this.y + this.stableHeight); // Anchor bottom

    // Animation
    if (this.groundDamageType === "FIRE") {
      let shearAmount = sin(frameCount * 0.1) * 0.1;
      shearX(shearAmount);
      // Breathing flash
      let alpha = map(sin(frameCount * 0.05), -1, 1, 150, 255);
      tint(255, alpha);
    }else if (this.groundDamageType === "ICESPIKE") {
      //The animation of ice spike repeatedly increasing and shortening
      let heightFactor = (frameCount % 30 < 15) ? 0.9 : 1.1; // Switch every 15 frames
      scale(1, heightFactor); // Vertical scaling
    }

    aspectRatio = sw / sh;
    scaledWidth = this.height * aspectRatio;
    scaledHeight = this.height;

    if (this.groundDamageType === "DESERT") {
      image(
        this.assetManager.damageDesert,
        0, -this.stableHeight,
        50, 55,
      );
    } else {
      image(
        this.assetManager.healthRelatedItems,
        0, -this.stableHeight,
        scaledWidth, scaledHeight,
        sx, sy, sw, sh
      );
    }

    noTint();
    pop();
  }
}
