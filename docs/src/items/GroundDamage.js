// Constructor, update, and display methods
class GroundDamage {
  constructor(type = null, positionX, positionY, assetManager) {
    this.assetManager = assetManager;
    this.width = scaleX * 40;
    this.height = scaleY * 48;

    this.x = positionX;
    this.y = positionY;

    this.groundDamageType = type;

    this.stableHeight = scaleY * 15; // Fire animation requirements: Fixed the height of the bottom of the flame

    // this.display();
    // this.updateGroundDamage();
  }

  updateGroundDamage() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);  // Draw the rectangle with the center point

    // draw background rectangle for testing
    // fill(200, 200, 255, 150);
    // noStroke();
    // rect(this.x, this.y, this.width, this.height);

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

    image(
      this.assetManager.healthRelatedItems,
      0, -this.stableHeight,
      scaledWidth, scaledHeight,
      sx, sy, sw, sh
    );

    noTint();
    pop();
  }
}
