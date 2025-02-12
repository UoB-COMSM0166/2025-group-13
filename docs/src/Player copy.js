class Player {
    constructor(positionX, positionY) {
        this.x = positionX;
        this.y = positionY;
        this.width = 30;
        this.height = 30;
        this.Top = this.y - this.height / 2;
        this.Bottom = this.y + this.height / 2;
        this.Left = this.x - this.width / 2;
        this.Right = this.x + this.width / 2;

        this.ySpeed = 0;  // 🏁 控制碰撞时的速度归零
        this.xSpeed = 0;  // 🏁 控制左右碰撞时停止移动
        this.maxSpeed = 5;
        // 🚀 **Parameters for future adjustment of jump and physics effects**
        this.gravity = 0.7;  // 🏁 控制重力
        this.jumpStrength = 8;  // 🏁 控制跳跃高度

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
                // this.ySpeed += this.gravity;

            } else {
                // this.ySpeed += this.gravity * map(this.ySpeed, 0, 10, 1, 1.5); // Accelerate while falling
                this.ySpeed += this.gravity; // Accelerate while falling
            }
        }
        // this.xSpeed *= this.airResistance; // Simulate air resistance to reduce unnatural sudden stops
    }
    /** 🎯 **Check collisions with platforms and ground** */
    checkCollisions(platformArray) {
        this.isOnGround = false;
        for (let platform of platformArray) {

            let withinXRange = this.Right > platform.Left && this.Left < platform.Right;
            let withinYRange = this.Bottom > platform.Top && this.Top < platform.Bottom;

            if (withinXRange && withinYRange) {

                // Player collise the platform from - Top(fall)
                if (this.ySpeed > 0 && this.Bottom >= platform.Top && this.Bottom - this.ySpeed <= platform.Top) {
                    this.y = platform.Top - this.height / 2;
                    this.ySpeed = 0;
                    this.isOnGround = true;
                    return;
                }

                // // 🎯 **玩家头撞到平台（防止从底部穿过）**
                // if (this.ySpeed < 0 && this.Top <= platform.Bottom && this.Top - this.ySpeed >= platform.Bottom) {
                //     this.y = platform.Bottom + this.height / 2;
                //     this.ySpeed = 0;
                //     return;
                // }

                // // 🎯 **玩家撞到平台左侧（防止从左穿过）**
                // if (this.xSpeed > 0 && this.Right >= platform.Left) {
                //     this.x = platform.Left - this.width / 2;
                //     this.xSpeed = 0;
                //     return;
                // }

                // // 🎯 **玩家撞到平台右侧（防止从右穿过）**
                // if (this.xSpeed < 0 && this.Left <= platform.Right) {
                //     this.x = platform.Right + this.width / 2;
                //     this.xSpeed = 0;
                //     return;
                // }

            }

        }
        // 🎯 **玩家从平台边缘走出去，应该掉落**
        if (wasOnGround && !this.isOnGround) {
            this.ySpeed = 0;  // 防止掉落瞬间速度过快
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
