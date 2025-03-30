class GroundEnemy {
  constructor(type = null, positionX, positionY, assetManager, speed = 0.3, maxWidth = 50) {
    this.assetManager = assetManager;
    this.width = 40;
    this.height = 48;

    this.x = positionX;
    this.y = positionY;

    this.enemyType = type; // Renamed to enemyType for clarity

    this.stableHeight = 15; // Fire animation requirements: Fixed the height of the bottom of the flame

    this.speed = speed;  // Speed of movement
    this.maxWidth = maxWidth;  // Maximum width of movement
    this.originX = positionX;  // Original X position to calculate the to-and-fro movement

    this.display();
    this.updateGroundEnemy();
  }

  updateGroundEnemy() {
    // Update the enemy's position for collision detection and movement
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    rectMode(CENTER);

    // Calculate new position for oscillation
    let newX = this.originX + Math.sin(frameCount * this.speed * 0.1) * this.maxWidth;

    // Determine movement direction (left or right)
    let movingLeft = newX < this.x;
    this.x = newX;

    push();
    translate(this.x, this.y + this.stableHeight);

    // Flip the entire image if moving left
    if (movingLeft) {
      scale(-1, 1);  // Mirror the image horizontally
      translate(-this.width, 0);  // Offset so it stays in place
    }

    image(this.assetManager.enemyImg, 0, -this.stableHeight, this.width, this.height);

    pop();
  }
} //(flipping image at the end of travel is not smooth. Enemy should stop at the end then turn back, then start walking in reverse direction.)