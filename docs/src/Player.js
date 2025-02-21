class Player {

    preload() {
        this.gif_walk = loadImage('src/assets/gif_walk.gif');
        this.gif_walkBack = loadImage('src/assets/gif_walkBack.gif');
        this.dino_static = loadImage('src/assets/dino_static.png');
    }

    constructor(positionX, positionY) {
        this.gif_walk = null;
        this.dino_static = null;

        this.x = positionX;
        this.y = positionY + 5;
        this.width = 30;
        this.height = 30;

        this.xSpeed = 0;
        this.ySpeed = 0;
        this.maxSpeed = 4;

        this.gravity = 0.6;
        this.jumpStrength = 7;
        this.isOnGround = false;

        this.isMoving = false;
        this.isBackwards = false;

        this.updateBounds();
    }

    display() {
        fill(255, 0, 0);
        rectMode(CENTER);
        //rect(this.x, this.y, this.width, this.height);
        if (this.isMoving) {
            if (this.isBackwards) {
                image(this.gif_walkBack, this.x, this.y - this.height / 2);
            }
            else {
                image(this.gif_walk, this.x, this.y - this.height / 2);
            }
        }
        else {
            image(this.dino_static, this.x, this.y - this.height / 2);
        }
    }

    update(platformArray) {
        this.applyGravity();
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.checkCollisions(platformArray);
        this.keepWithinBounds();

        this.updateBounds();
        this.display();
    }

    updateBounds() {
        this.bottom = this.y + this.height / 2;
        this.top = this.y - this.height / 2;
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
    }

    applyGravity() {
        if (!this.isOnGround) {
            if (this.ySpeed < 0) {
                this.ySpeed += this.gravity * 0.3;
            } else {
                this.ySpeed += this.gravity;
            }
        }
        this.ySpeed = constrain(this.ySpeed, -this.jumpStrength, 10);
    }

    checkCollisions(platformArray) {
        this.isOnGround = false;

        for (let platform of platformArray) {
            let withinXRange = this.right > platform.left && this.left < platform.right;
            // let withinYRange = this.top > platform.bottom && this.bottom < platform.top;
            if (withinXRange) {
                if (this.bottom >= platform.top && this.bottom - this.ySpeed <= platform.top) {
                    this.y = platform.top - this.height / 2;
                    this.ySpeed = 0;
                    this.isOnGround = true;
                } else if (this.top <= platform.bottom && this.top - this.ySpeed >= platform.bottom) {
                    this.y = platform.bottom + this.height / 2;
                    this.ySpeed = 0;
                }
            }
            // else if (withinYRange) {
            //     if (this.xSpeed > 0 && this.right >= platform.left) {
            //         this.x = platform.left - this.width / 2;
            //         this.xSpeed = 0;
            //     }
            // }
        }
    }

    keepWithinBounds() {
        this.x = constrain(this.x, this.width / 2, width - this.width / 2);

        if (this.bottom > height) {
            this.y = height - this.height / 2;
            this.ySpeed = 0;
            this.isOnGround = true;
        }
    }

    move(direction) {
        if (direction === -1) {
            this.isBackwards = true;
        }
        else {
            this.isBackwards = false;
        }
        this.isMoving = true;
        if (this.isOnGround) {    
            this.xSpeed = direction * this.maxSpeed;
        } else {
            this.xSpeed += direction * 0.3;
            this.xSpeed = constrain(this.xSpeed, -this.maxSpeed * 0.5, this.maxSpeed * 0.5);
        }
    }

    stopMovement() {
        this.isMoving = false;
        this.isBackwards = false;
        this.xSpeed = 0;
    }

    jump() {
        if (this.isOnGround) {
            this.ySpeed = -this.jumpStrength;
            this.isOnGround = false;
        }
    }

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
