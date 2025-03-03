class Player {

    static reachedCave = false;

    preload() {
        this.imgDinoRed = loadImage('src/assets/item_dino_red.png');
    }

    constructor(positionX, positionY) {
        // this.dino_walk = null;
        // this.dino_static = null;

        this.x = positionX;
        this.y = positionY + 5;
        this.width = 30;
        this.height = 30;

        //this.xSpeed = 0;  xspeed is not needed because the player does not face any horizontal acceleration
        this.ySpeed = 0; // yspeed is needed to keep track of the vertical velocity which changes due to gravity
        this.maxSpeed = 4;

        this.gravity = 1;
        this.jumpStrength = 10;
        this.isOnGround = false;

        this.isMoving = false;
        this.isBackwards = false;

        this.updateBounds();
    }

    display() {
        fill(255, 0, 0);
        rectMode(CENTER);

        let sx, sy, sw, sh;
        let aspectRatio, scaledWidth, scaledHeight;

        if (!this.isMoving) {
            if (!this.isBackwards) {
                sx = 450; sy = 13; sw = 60; sh = 100;
            } else {
                sx = 450; sy = 13; sw = 60; sh = 100;
            }
        } else {
            if (!this.isBackwards) {
                sx = 105; sy = 300; sw = 110; sh = 80;
            } else {
                sx = 105; sy = 300; sw = 110; sh = 80;
            }
        }

        aspectRatio = sw / sh;
        scaledWidth = this.height * aspectRatio;
        scaledHeight = this.height;

        // draw background rectangle
        fill(200, 200, 255, 150);
        noStroke();
        rect(this.x, this.y, this.width, this.height);

        if (this.isMoving && this.isBackwards) {
            push();
            translate(this.x, this.y);
            scale(-1, 1);

            image(
                this.imgDinoRed,
                0, 0,
                scaledWidth, scaledHeight,
                sx, sy, sw, sh
            );

            pop();
        } else if (!this.isMoving && this.isBackwards) {
            push();
            translate(this.x, this.y);
            scale(-1, 1);

            image(
                this.imgDinoRed,
                0, 0,
                scaledWidth, scaledHeight,
                sx, sy, sw, sh
            );

            pop();
        } else {
            image(
                this.imgDinoRed,
                this.x, this.y,
                scaledWidth, scaledHeight,
                sx, sy, sw, sh
            );
        }
    }

    update(platformArray, foodArray, fireArray, cave) {
        this.applyGravity();
        //this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.updateBounds();
        this.checkCollisions(platformArray);
        this.checkCollisionsFood(foodArray);
        this.checkCollisionsFire(fireArray);
        this.keepWithinBounds();
        // this.display();
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
        // this method should be optimised to check only those platforms which
        // are visible inside left half of the game window.
        for (let platform of platformArray) {
            let withinXRange = this.right > platform.left && this.left < platform.right;
            let withinYRange = this.bottom > platform.top && this.top < platform.bottom;
            let collision = withinXRange && withinYRange;
            if (collision) {
                let x_diff = Math.abs(Math.min(this.right, platform.right) - Math.max(this.left, platform.left));
                let y_diff = Math.abs(Math.min(this.bottom, platform.bottom) - Math.max(this.top, platform.top));
                if (x_diff > y_diff) {
                    this.checkVerticalCollisions(platform);
                    this.checkHorizontalCollisions(platform);
                } else {
                    this.checkHorizontalCollisions(platform);
                    this.checkVerticalCollisions(platform);
                }
            }
            if ((this.bottom === platform.top && this.right > platform.left && this.left < platform.right)
                || (this.bottom === height))
                this.isOnGround = true;
        }
    }

    checkCollisionsFire(fireArray) {
        // this method should be optimised to check only those foods which
        // are visible inside left half of the game window.
        let collisionDetected = false;
        for (let fire of fireArray) {
            let withinXRange = this.right > fire.left && this.left < fire.right;
            let withinYRange = this.bottom > fire.top && this.top < fire.bottom;
            let collision = withinXRange && withinYRange;
        
            if (collision) {
                collisionDetected = true;
                break; // Exit early to optimize performance
            }
        }
        // Set reduction rate based on collision detection with any of the fires
        Health.reductionRate = collisionDetected ? 0.002 : 0.0004;
    }

    checkCollisionsFood(foodArray) {
        // this method should be optimised to check only those foods which
        // are visible inside left half of the game window.
        for (let i = foodArray.length - 1; i >= 0; i--) {
            let food = foodArray[i];
            let withinXRange = this.right > food.left && this.left < food.right;
            let withinYRange = this.bottom > food.top && this.top < food.bottom;
            let collision = withinXRange && withinYRange;
        
            if (collision) {
                if (Health.percentage > 0.8) { 
                    Health.percentage = 1; 
                } else { 
                    Health.percentage += 0.2; 
                }
                foodArray.splice(i, 1); // Remove collided food
            }
        }
    }

    checkCollisionsCave(cave) {
        // this method should be optimised to check only those foods which
        // are visible inside left half of the game window.
        let withinXRange = this.right > cave.left && this.left < cave.right;
        let withinYRange = this.bottom > cave.top && this.top < cave.bottom;
        let collision = withinXRange && withinYRange;
    
        if (collision) {
            Player.reachedCave = true;
        }
    }

    checkVerticalCollisions(platform) {
        let withinXRange = this.right > platform.left && this.left < platform.right;
        let bottomCollision = this.bottom > platform.top && this.bottom < platform.bottom;
        let topCollision = this.top < platform.bottom && this.top > platform.top;
        if (withinXRange) {
            if (bottomCollision /* && this.bottom - this.ySpeed <= platform.top*/) {
                this.y = platform.top - this.height / 2;
                this.ySpeed = 0;
            } else if (topCollision) {
                this.y = platform.bottom + this.height / 2;
                this.ySpeed = 0;
            }
        }
        this.updateBounds();
    }

    checkHorizontalCollisions(platform) {
        let withinYRange = this.bottom > platform.top && this.top < platform.bottom;
        let leftCollision = this.left < platform.right && this.left > platform.left;
        let rightCollision = this.right > platform.left && this.right < platform.right;
        if (withinYRange) {
            if (rightCollision) {
                this.x = platform.left - this.width / 2;
                this.xSpeed = 0;
            } else if (leftCollision) {
                this.x = platform.right + this.height / 2;
                this.xSpeed = 0;
            }
        }
        this.updateBounds();
    }

    keepWithinBounds() {
        this.x = constrain(this.x, this.width / 2, min(game.map.cave.x, width - this.width / 2));
        if (this.bottom > height) {
            this.y = height - this.height / 2;
            this.ySpeed = 0;
            this.isOnGround = true;
        }
        this.updateBounds();
    }

    move(direction) {
        if (direction === -1) {
            this.isBackwards = true;
        }
        else {
            this.isBackwards = false;
        }
        // this.isMoving = true;
        if (this.isOnGround) {
            this.xSpeed = direction * this.maxSpeed;
        } else {
            this.xSpeed += direction * 0.3;
            this.xSpeed = constrain(this.xSpeed, -this.maxSpeed * 0.5, this.maxSpeed * 0.5);
        }
        if (game.stopMapMovement || (game.stopMapMovement === false && direction > 0 && this.x < width / 2) || (direction < 0)) {
            this.x += direction * this.maxSpeed;
        }
    }

    stopMovement() {
        // this.isMoving = false;
        // this.isBackwards = false;
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
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                this.move(-1);
                this.isMoving = true;
                this.isBackwards = true;
            }
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                this.move(1);
                this.isMoving = true;
                this.isBackwards = false;
            }
            if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) this.jump();
        } else {
            this.isMoving = false;
        }
    }
}
