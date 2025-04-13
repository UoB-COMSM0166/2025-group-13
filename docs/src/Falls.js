// falling.js

class Falls {
  constructor(type = null, positionX, positionY, assetManager, speed = 1.2, maxDistance = 100) {
    this.assetManager = assetManager;
    this.width = 40;
    this.height = 48;

    this.x = positionX;
    this.y = positionY;

    this.objectType = type;

    this.speed = speed;
    this.maxDistance = maxDistance;

    this.originY = positionY;
    this.distanceTravelled = 0;

    this.updateObject();
  }

  updateObject() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    // Move the object downward
    this.y += this.speed;
    this.distanceTravelled += this.speed;

    // Reset position if the object exceeds the max distance
    if (this.distanceTravelled >= this.maxDistance) {
      this.y = this.originY; // Reset to the original position
      this.distanceTravelled = 0; // Reset travel distance
    }

    // Draw the falling object
    push();
    translate(this.x, this.y);
    image(this.assetManager.fallingObjectImg, 0, 0, this.width, this.height);
    pop();

    // Update collision box
    this.updateObject();
  }
}

export default FallingObject;