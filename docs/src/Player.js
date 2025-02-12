class Player {
    constructor(positionX, positionY) {
        this.x = positionX;
        this.y = positionY;
        this.width = 30;
        this.height = 30;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.maxSpeed = 5;
        // 🚀 **Parameters for future adjustment of jump and physics effects**
        this.gravity = 0.7;      // Controls gravity strength
        this.jumpStrength = 8;   // Controls jump height
        this.airResistance = 0.98; // Air resistance (0.98 = gradually reduce speed)

        this.isOnGround = false;
    }
    update(platformArray) {
        this.applyGravity();   // 🎯 Handle gravity and jumping
        this.x += this.xSpeed; // 🎯 Handle horizontal movement
        this.y += this.ySpeed; // 🎯 Handle vertical movement

        this.checkCollisions(platformArray); // 🎯 Check for collisions
        this.keepWithinBounds();  // 🎯 Ensure player stays within canvas
    }
    /** 🎯 **Handle gravity and air resistance** */
    applyGravity() {
        if (!this.isOnGround) {
            if (this.ySpeed < 0) {
                this.ySpeed += this.gravity * 0.3;  // Reduce gravity effect while ascending
            } else {
                this.ySpeed += this.gravity * map(this.ySpeed, 0, 10, 1, 1.5); // Accelerate while falling
            }
        }
        this.xSpeed *= this.airResistance; // 🏁 Simulate air resistance to reduce unnatural sudden stops
    }
    /** 🎯 **Check collisions with platforms and ground** */
    checkCollisions(platformArray) {
        this.isOnGround = false;
        for (let platform of platformArray) {
            let playerRight = this.x + this.width / 2;
            let playerLeft = this.x - this.width / 2;
            let platformLeft = platform.x - platform.w / 2;
            let platformRight = platform.x + platform.w / 2;
            let playerTop = this.y - this.height / 2;
            let playerBottom = this.y + this.height / 2;
            let platformTop = platform.y - platform.h / 2;
            let platformBottom = platform.y + platform.h /2;

            let withinXRange = playerRight > platformLeft && playerLeft < platformRight;
            let withinYRange = playerBottom > platformTop && playerTop < platformBottom;

            if (withinXRange) {

                if (playerBottom >= platformTop && playerBottom < platformBottom /*&& playerBottom - this.ySpeed <= platformTop*/) {
                    this.y = platformTop - this.height / 2;
                    this.ySpeed = 0;
                    this.isOnGround = true;
                }
                else if(playerTop < platformBottom && playerTop > platformTop)
                {
                    this.y = platformBottom + this.height/2;
                    this.ySpeed = 0;
                }
            }
        }
    }
    /** 🎯 **Ensure character doesn't fall off screen** */
    keepWithinBounds() {
        this.x = constrain(this.x, this.width / 2, width - this.width / 2);
        if (this.y + this.height / 2 > height) {
            this.y = lerp(this.y, height - this.height / 2, 0.3); // 🎯 Smooth landing
            this.ySpeed = 0;
            this.isOnGround = true;
        }
    }
    /** 🎯 **Render character** */
    display() {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }
    /** 🎯 **Character movement** */
    move(direction) {
        if (this.isOnGround) {
            this.xSpeed = direction * this.maxSpeed;
        } else {
            this.xSpeed += direction * 0.3;
            this.xSpeed = constrain(this.xSpeed, -this.maxSpeed * 0.5, this.maxSpeed * 0.5);
        }
    }
    /** 🎯 **Stop horizontal movement** */
    stopMovement() {
        this.xSpeed = 0;
    }
    /** 🎯 **Character jump** */
    jump() {
        if (this.isOnGround) {
            this.ySpeed = -this.jumpStrength;
            this.isOnGround = false;
        } else if (this.ySpeed > 0) {
            this.ySpeed -= this.jumpStrength * 0.5; // 🎯 Allow small double jump
        }
    }
    /** 🎯 **Handle user input (keypress & release)** */
    handleInput(isKeyDown) {
        if (isKeyDown) {
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.move(-1);
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.move(1);
            if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) this.jump();
        } else {
            if (keyCode === LEFT_ARROW || keyCode === 65 || keyCode === RIGHT_ARROW || keyCode === 68) {
                this.stopMovement();
            }
        }
    }
}
