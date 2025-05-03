// Player class is responsible for the player character in the game. 
// It handles player movement, jumping, and collision detection.
// Also manages the player's health and visual representation on the screen.

class Player {
    constructor(positionX, positionY, playerHealth, assetManager) {
        this.assetManager = assetManager;
        //
        this.playerHealth = playerHealth;
        // Variable to keep track of whether the player has reached end of level (collision with the cave)
        this.reachedCave = false;
        this.dino_walk = null;
        this.dino_static = null;

        this.x = positionX;
        this.y = positionY +  25 ;
        //this.y = height - 100;
        this.width = 30;
        this.height = 30;

        this.xSpeed = 0;
        this.ySpeed = 0; // yspeed is needed to keep track of the vertical velocity which changes due to gravity
        this.maxSpeed = 4;

        this.gravity = 1;
        this.jumpStrength = 10;
        this.isOnGround = false;

        this.isMoving = false;
        this.isBackwards = false;

        this.isHurt = false;
        this.hurtStartTime = 0;

        this.updateBounds();
        this.updatePreviousCoordinates();
    }

    display() {
        fill(255, 0, 0);
        rectMode(CENTER);

        if (this.isHurt) {
            let elapsed = millis() - this.hurtStartTime;
            Health.reductionRate = 0.001; // Increase reduction rate when hurt

            if (elapsed < 1000) {
                let alpha = map(sin(elapsed * 0.02), -1, 1, 100, 255);
                tint(255, 0, 0, alpha);
            }
        } else {
            tint(255);
            Health.reductionRate = 0.0002; // Normal reduction rate when not hurt
            // noTint();
        }

        let sx, sy, sw, sh;
        let aspectRatio, scaledWidth, scaledHeight;

        if (!this.isMoving) {
            if (!this.isBackwards) {
                //static && forward
                sx = 60; sy = 120; sw = 205; sh = 220;
            } else {
                //static && backward
                sx = 60; sy = 120; sw = 205; sh = 220;
            }
        } else {
            if (!this.isBackwards) {
                //moving && forward
                sx = 725; sy = 120; sw = 255; sh = 220;
            } else {
                //moving && backward
                sx = 725; sy = 120; sw = 255; sh = 220;
            }
        }

        aspectRatio = sw / sh;
        scaledWidth = this.height * aspectRatio;
        scaledHeight = this.height;

        if (this.isMoving && this.isBackwards) {
            push();
            translate(this.x, this.y);
            scale(-1, 1);

            image(
                this.assetManager.imgDinoRed,
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
                this.assetManager.imgDinoRed,
                0, 0,
                scaledWidth, scaledHeight,
                sx, sy, sw, sh
            );

            pop();
        } else {
            image(
                this.assetManager.imgDinoRed,
                this.x, this.y,
                scaledWidth, scaledHeight,
                sx, sy, sw, sh
            );
        }

        noTint();
    }

    update(platformArray, foodArray, groundDamageArray, enemyArray, skyFallArray, cave) {
        this.applyGravity();
        // this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.updateBounds();
        this.checkCollisions(platformArray);
        this.checkCollisionsFood(foodArray);
        // Items increasing health reduction rate
        this.checkCollisionsgroundDamage(groundDamageArray);
        this.checkCollisionsEnemy(enemyArray);
        this.checkCollisionsSkyFall(skyFallArray);
        // Items killing instantly
        this.checkCollisionsLava();
        this.checkCollisionsCave(cave);
        this.keepWithinBounds();
        // this.display();
        //Update previous coordinates
        this.updatePreviousCoordinates();
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

    //#region: collision
    checkCollisions(platformArray) {
        this.isOnGround = false;
        // this method should be optimised to check only those platforms which
        // are visible inside left half of the game window.
        for (let platform of platformArray) {
            let withinXRange = this.right > platform.left && this.left < platform.right;
            let withinYRange = this.bottom > platform.top && this.top < platform.bottom;
            let collision = withinXRange && withinYRange;
            if (collision) {
                /*
                let x_diff = Math.abs(Math.min(this.right, platform.right) - Math.max(this.left, platform.left));
                let y_diff = Math.abs(Math.min(this.bottom, platform.bottom) - Math.max(this.top, platform.top));
                if (x_diff > y_diff) {
                    this.checkVerticalCollisions(platform);
                    this.checkHorizontalCollisions(platform);
                } else {
                    this.checkHorizontalCollisions(platform);
                    this.checkVerticalCollisions(platform);
                }
                */
                this.checkVerticalCollisions(platform);
                this.checkHorizontalCollisions(platform);
            }
            if ((this.bottom === platform.top && this.right > platform.left && this.left < platform.right)
                || (this.bottom === height))
                this.isOnGround = true;
        }
    }

    checkCollisionsgroundDamage(groundDamageArray) {
        // this method should be optimized to check only those foods which
        // are visible inside the left half of the game window.
        let collisionDetected = false;
        for (let groundDamage of groundDamageArray) {
            let withinXRange = this.right > groundDamage.left && this.left < groundDamage.right;
            let withinYRange = this.bottom > groundDamage.top && this.top < groundDamage.bottom;
            let collision = withinXRange && withinYRange;

            if (collision) {
                if (!this.isHurt) {
                    this.isHurt = true;
                    this.hurtStartTime = millis();
                    if (!this.assetManager.effect_damage_environment.isPlaying()) {
                        this.assetManager.effect_damage_environment.setVolume(0.8);
                        this.assetManager.effect_damage_environment.play();
                    }
                }
                collisionDetected = true;  // Collision detected
                break; // Exit early to optimize performance
            }
        }

        // The injured state lasts for 1 second before recovering
        if (this.isHurt && millis() - this.hurtStartTime > 1000) {
            this.isHurt = false;
        }
    }

    checkCollisionsEnemy(enemyArray) {
        // this method should be optimised to check only those foods which
        // are visible inside left half of the game window.
        let collisionDetected = false;
        for (let enemy of enemyArray) {
            let withinXRange = this.right > enemy.left && this.left < enemy.right;
            let withinYRange = this.bottom > enemy.top && this.top < enemy.bottom;
            let collision = withinXRange && withinYRange;

            if (collision) {
                if (!this.isHurt) {
                    this.isHurt = true;
                    this.hurtStartTime = millis();
                    if (!this.assetManager.effect_damage_enemy.isPlaying()) {
                        this.assetManager.effect_damage_enemy.setVolume(0.8);
                        this.assetManager.effect_damage_enemy.play();
                    }
                }
                this.isHurt = true;
                break; // Exit early to optimize performance
            }
        }
        // The injured state lasts for 1 second before recovering
        if (this.isHurt && millis() - this.hurtStartTime > 1000) {
            this.isHurt = false;
        }
    }

    checkCollisionsSkyFall(skyFallArray) {
        // this method should be optimised to check only those foods which
        // are visible inside left half of the game window.
        let collisionDetected = false;
        for (let skyFall of skyFallArray) {
            let withinXRange = this.right > skyFall.left && this.left < skyFall.right;
            let withinYRange = this.bottom > skyFall.top && this.top < skyFall.bottom;
            let collision = withinXRange && withinYRange;

            if (collision) {
                if (!this.isHurt) {
                    this.isHurt = true;
                    this.hurtStartTime = millis();
                }
                this.isHurt = true;
                break; // Exit early to optimize performance
            }
        }
        // The injured state lasts for 1 second before recovering
        if (this.isHurt && millis() - this.hurtStartTime > 1000) {
            this.isHurt = false;
        }
    }

    checkCollisionsLava() {
        let collision = this.bottom > (height - Brick.height / 2);
        if (collision) {
            // Set reduction rate based on collision detection with lava
            Health.reductionRate = 0.4;
        }
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
                let actualHealth = this.playerHealth.getHealth();
                if (actualHealth > 0.8) {
                    this.playerHealth.setHealth(1);
                } else {
                    this.playerHealth.setHealth(actualHealth + 0.2);
                }
                if (!this.assetManager.effect_eat.isPlaying()) {
                    this.assetManager.effect_eat.setVolume(0.8);
                    this.assetManager.effect_eat.play();
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
            this.reachedCave = true;
        }
    }

    checkVerticalCollisions(platform) {
        let withinXRange = this.right > platform.left && this.left < platform.right;
        /*
        let bottomCollision = this.bottom > platform.top && this.bottom < platform.bottom;
        let topCollision = this.top < platform.bottom && this.top > platform.top;
        if (withinXRange) {
            if (bottomCollision) {
                this.y = platform.top - this.height / 2;
                this.ySpeed = 0;
            } else if (topCollision) {
                this.y = platform.bottom + this.height / 2;
                this.ySpeed = 0;
            }
        }
        */
        if(withinXRange)
        {
            if (this.prevBottom <= platform.top) {
                // bottom collision
                this.y = platform.top - this.height / 2;
                this.ySpeed = 0;
            } else if (this.prevTop >= platform.bottom) {
                // top collision
                this.y = platform.bottom + this.height / 2;
                this.ySpeed = 0;
            }
        }
        this.updateBounds();
    }

    checkHorizontalCollisions(platform) {
        let withinYRange = this.bottom > platform.top && this.top < platform.bottom;
        /*
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
        */
        if(withinYRange){
            if (this.prevRight <= platform.left || platform.prevLeft >= this.right) {
                // right collision
                this.x = platform.left - this.width / 2;
                this.xSpeed = 0;
            } else if (this.prevLeft >= platform.right || platform.prevRight <= this.left) {
                // left collision
                this.x = platform.right + this.height / 2;
                this.xSpeed = 0;
            }
        }
        this.updateBounds();
    }
    //#endregion

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
        this.isMoving = true;
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

    handleInput(moveLeft, moveRight, triggerJump) {
        if(moveLeft || moveRight || triggerJump) {
            if (moveLeft) {
                this.move(-1);
                this.isMoving = true;
                this.isBackwards = true;
            }
            if (moveRight) {
                this.move(1);
                this.isMoving = true;
                this.isBackwards = false;
            }
            if (triggerJump) this.jump();
        } else {
            this.isMoving = false;
        }
    }

    updatePreviousCoordinates()
    {
        this.prevX = this.x;
        this.prevY = this.y;

        this.prevTop = this.top;
        this.prevBottom = this.bottom;

        this.prevLeft = this.left;
        this.prevRight = this.right;
    }
}
