// Constructor, update, and display methods
class SkyFall {
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

    // this.updateSkyFall();
  }

  updateSkyFall() {
    this.top = this.y - this.height / 2;
    this.bottom = this.y + this.height / 2;
    this.left = this.x - this.width / 2;
    this.right = this.x + this.width / 2;
  }

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
      }
      pop();
    }
  }
}
