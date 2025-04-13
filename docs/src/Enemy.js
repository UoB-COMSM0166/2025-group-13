class Enemy {
  constructor(type = null, positionX, positionY, assetManager, speed = 1.2, maxDistance = 100, pauseTime = 6) {
    this.assetManager = assetManager;
    this.width = 40;
    this.height = 48;

    this.x = positionX;
    this.y = positionY;

    this.enemyType = type;

    this.stableHeight = 15;

    this.speed = speed;
    this.maxDistance = maxDistance;
    this.pauseTime = pauseTime;  // Duration to pause before flipping

    this.originX = positionX;
    this.direction = 1; // 1 = right, -1 = left
    this.distanceTravelled = 0;

    this.pauseCounter = 0;  // Counter to track pause time
    this.flipped = false;  // Track if image has been flipped
    this.isFlipping = false;  // Track if we're in the process of flipping

    this.updateEnemy();
  }

  updateEnemy() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

  display() {
    // If the enemy is pausing, count the time
    if (this.pauseCounter > 0) {
      this.pauseCounter--;

      // If pause is over, flip image and start moving in the opposite direction
      if (this.pauseCounter === 0) {
        if (!this.isFlipping) {
          this.isFlipping = true; // Start flipping phase
          this.direction *= -1;  // Change direction
          this.flipped = !this.flipped;  // Flip image
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
        this.pauseCounter = this.pauseTime;  // Start pause timer
        this.distanceTravelled = 0;  // Reset travel distance
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

    image(this.assetManager.enemyImg, 0, -this.stableHeight, this.width, this.height);
    pop();

    // Update collision box
    this.updateEnemy();
  }
}
