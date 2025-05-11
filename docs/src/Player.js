/**
 * Player class is responsible for the player character in the game.
 * It handles player movement, jumping, and collision detection.
 * Also manages the player's health and visual representation on the screen.
 */

class Player {
    /**
     * Initializes player
     * @param positionX - Initial horizontal location of the player.
     * @param positionY - Initial vertical location of the player in pixels.
     * @param playerHealth - Initial health of the player at birth.
     * @param assetManager - AssetManager has all the graphic resources.
     */
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

        this.gravity = 0.5;
        this.jumpStrength = 7;
        this.isOnGround = false;

        this.isMoving = false;
        this.isBackwards = false;

        this.isHurt = false;
        this.hurtStartTime = 0;
        Health.reductionRate = 0.00032;

 // Load the static sprite (first frame of the sprite sheet)
 this.dino_static = this.assetManager.imgDinoRed.get(0, 0, 221, 184);
 // Load the walking sprites from the sprite sheet
 this.dino_walk = [];
 for (let i = 0; i < 4; i++) {
     let x = i * 221;
     this.dino_walk.push(this.assetManager.imgDinoRed.get(x, 0, 221, 184)); // take out each frame
 }

        this.updateBounds();
        this.updatePreviousCoordinates();
    }

    /**
     * Displays the player(dino) on screen.
     * Makes the player turn red and flicker if player is hurt after it touches fire, spikes, enemies or meteors.
     */
    display() {
        fill(255, 0, 0);
        rectMode(CENTER);

        if (this.isHurt) {
            let elapsed = millis() - this.hurtStartTime;
            Health.reductionRate = 0.0016; // Increase reduction rate when hurt

            if (elapsed < 1000) {
                let alpha = map(sin(elapsed * 0.02), -1, 1, 100, 255);
                tint(255, 0, 0, alpha);
            }
        } else {
            tint(255);
            Health.reductionRate = 0.00032; // Normal reduction rate when not hurt
        }

        let scaledWidth = this.height * (this.dino_walk[0].width / this.dino_walk[0].height);
        let scaledHeight = this.height;

        if (!this.isOnGround) {
            if (this.isBackwards) {
                push();
                translate(this.x, this.y);
                scale(-1, 1); // flip
                image(this.dino_walk[3], 0, 0, scaledWidth, scaledHeight);
                pop();
            } else {
                image(this.dino_walk[3], this.x, this.y, scaledWidth, scaledHeight);
            }
        } else {
            if (this.isMoving) {
                let index = floor(millis() / 200) % 4; // 4 frames
                if (this.isBackwards) {
                    push();
                    translate(this.x, this.y);
                    scale(-1, 1); // flip
                    image(this.dino_walk[index], 0, 0, scaledWidth, scaledHeight);
                    pop();
                } else {
                    image(this.dino_walk[index], this.x, this.y, scaledWidth, scaledHeight);
                }
            } else {
                // static
                if (this.isBackwards) {
                    push();
                    translate(this.x, this.y);
                    scale(-1, 1);
                    image(this.dino_static, 0, 0, scaledWidth, scaledHeight);
                    pop();
                } else {
                    image(this.dino_static, this.x, this.y, scaledWidth, scaledHeight);
                }
            }
        }

        noTint();
    }

    animate() {
        if (this.isMoving) {
            this.x += this.xSpeed;
        }
    }

    /**
     * Updates the player's coordinates, health, orientation and gameplay status.
     * @param platformArray - List of platforms to detect player's collision with and update coordinates.
     * @param foodArray - List of foods to detect player's collision with and increase the health.
     * @param groundDamageArray - List of spikes to detect a player's collision with and reduce health.
     * @param enemyArray - List of enemies to detect player's collision with then reduce health.
     * @param skyFallArray - List of meteors to detect player's collision with and reduce health.
     * @param cave - Cave object to keep track of the location in the game, the player need to reach to complete the level.
     */
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

    /**
     * Updates the top, bottom, left and right attributes of the player based on current coordinates
     */
    updateBounds() {
        this.bottom = this.y + this.height / 2;
        this.top = this.y - this.height / 2;
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
    }

    /**
     * Updates player's vertical coordinate based on gravity attribute.
     * Simulates falling motion of the player.
     */
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
    /**
     * Checks if player is colliding with any platform and if it does then updates its
     * coordinates accordingly.
     * @param platformArray - Array of all the floating platforms and trees.
     */
    checkCollisions(platformArray) {
        this.isOnGround = false;
        for (let platform of platformArray) {
            let withinXRange = this.right > platform.left && this.left < platform.right;
            let withinYRange = this.bottom > platform.top && this.top < platform.bottom;
            let collision = withinXRange && withinYRange;
            if (collision) {
                this.checkVerticalCollisions(platform);
                this.checkHorizontalCollisions(platform);
            }
            if ((this.bottom === platform.top && this.right > platform.left && this.left < platform.right)
                || (this.bottom === height))
                this.isOnGround = true;
        }
    }

    /**
     * Checks if the player is colliding with any of the fixed damaging objects(fire or spikes).
     * If collision is detected mark the player as hurt so increased rate of health damage can take effect.
     * @param groundDamageArray - List fixed damaging objects.
     */
    checkCollisionsgroundDamage(groundDamageArray) {
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

    /**
     * Checks if the player has collided with enemies present in the game.
     * If collision is detected, the player is marked hurt so increased rate of health
     * damage can take effect.
     * @param enemyArray - List of enemies in the game.
     */
    checkCollisionsEnemy(enemyArray) {
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

    /**
     * Checks the player has collided with meteors falling from the sky.If collision is
     * detected, the player is marked hurt so increased rate of health damage can take effect.
     * @param skyFallArray - List of meteors.
     */
    checkCollisionsSkyFall(skyFallArray) {
        let collisionDetected = false;
        for (let skyFall of skyFallArray) {
            let withinXRange = this.right > skyFall.left && this.left < skyFall.right;
            let withinYRange = this.bottom > skyFall.top && this.top < skyFall.bottom;
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
                this.isHurt = true;
                break; // Exit early to optimize performance
            }
        }
        // The injured state lasts for 1 second before recovering
        if (this.isHurt && millis() - this.hurtStartTime > 1000) {
            this.isHurt = false;
        }
    }

    /**
     * Checks if the player is touching lava, and if it does then set the maximum health reduction rate.
     */
    checkCollisionsLava() {
        let collision = this.bottom > (height - Brick.height / 2);
        if (collision) {
            // Set reduction rate based on collision detection with lava
            Health.reductionRate = 0.4;
        }
    }

    /**
     * Checks if the player has come in contact with food item.
     * If it has, then increase the player's health
     * @param foodArray - List of food in the game layout
     */
    checkCollisionsFood(foodArray) {
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

    /**
     * Checks if the player has reached the cave which marks the target to be achieved
     * for successful completion of the level.
     * @param cave - Cave marks the target for a level.
     */
    checkCollisionsCave(cave) {
        let withinXRange = this.right > (cave.left + cave.right)/2 && this.left < cave.right;
        let withinYRange = this.bottom > (cave.top + cave.bottom)/2 && this.top < cave.bottom;
        let collision = withinXRange && withinYRange;

        if (collision) {
            this.reachedCave = true;
        }
    }

    /**
     * Checks if the player is colliding with a floating platform or a tree above or below it.
     * If it does then updates player's coordinates to avoid overlap.
     * @param platform - List of platforms
     */
    checkVerticalCollisions(platform) {
        let withinXRange = this.right > platform.left && this.left < platform.right;
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

    /**
     * Checks if the player is colliding with a floating platform or a tree from the sides.
     * If it does then updates player's coordinates to avoid overlap.
     * @param platform - List of platforms
     */
    checkHorizontalCollisions(platform) {
        let withinYRange = this.bottom > platform.top && this.top < platform.bottom;
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

    /**
     * Keeps the player within the bounds of the visible game screen.
     * Restricts player's motion beyond screen walls.
     */
    keepWithinBounds() {
        this.x = constrain(this.x, this.width / 2, min(game.map.cave.x, width - this.width / 2));
        if (this.bottom > height) {
            this.y = height - this.height / 2;
            this.ySpeed = 0;
            this.isOnGround = true;
        }
        this.updateBounds();
    }

    /**
     * Moves the player horizontally based on user input.
     * @param direction - direction to move the player in. (left = -1 and right = 1)
     */
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

    /**
     * Stops the player's horizontal movement
     */
    stopMovement() {
        this.isMoving = false;
        this.isBackwards = false;
        this.xSpeed = 0;
    }

    /**
     * Makes the player jump
     */
    jump() {
        if (this.isOnGround) {
            this.ySpeed = -this.jumpStrength;
            this.isOnGround = false;
        }
    }

    /**
     * Handles the user input to move the player left, right or make it jump.
     * @param moveLeft - Input to move left.
     * @param moveRight - Input to move right.
     * @param triggerJump - Input to make the player jump.
     */
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

    /**
     * Stores the current location and dimension attributes of the player.
     * This helps in collision detection
     */
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
