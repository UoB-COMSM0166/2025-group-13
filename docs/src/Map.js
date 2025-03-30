class Map {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.platforms = [];
        this.foods = [];
        this.groundDamages = [];
        this.groundEnemies = [];
        this.cave;
        this.xSpeed = 4;
        this.food_height = 25;
        this.groundDamange_height = 70;
        this.groundEnemy_height = 70;
    }

    setup(layout) {
        let platforms = layout[0];
        let foods = layout[1];
        let groundDamages = layout[2];
        let groundEnemies = layout[3];
        let cave = layout[4];
        for(let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            this.platforms.push(new Platform(platform[0], platform[1], platform[2], platform[3], platform[4], this.assetManager));
        }

        for(let i = 0; i < foods.length; i++){
            let food = foods[i];
            this.foods.push(new Food(food[0], food[1], food[2], this.assetManager));
        }

        for(let i = 0; i < groundDamages.length; i++){
            let groundDamage = groundDamages[i];
            this.groundDamages.push(new GroundDamage(groundDamage[0], groundDamage[1], groundDamage[2], this.assetManager));
        }

        for(let i = 0; i < groundEnemies.length; i++){
            let groundEnemy = groundEnemies[i];
            this.groundEnemies.push(new GroundEnemy(groundEnemy[0], groundEnemy[1], groundEnemy[2], this.assetManager));
        }

        this.cave = new Cave(cave[0], cave[1], this.assetManager);
    }

    update() {
        // Update positions for all platforms
        for (let platform of this.platforms) {
            platform.updateBounds();
        }
        for (let food of this.foods) {
            food.updateFood();
        }
        for (let groundDamage of this.groundDamages) {
            groundDamage.updateGroundDamage();
        }
        for (let groundEnemy of this.groundEnemies) {
            groundEnemy.updateGroundEnemy();
        }
        this.cave.updateCave();
    }

    display() {
        // Display all platforms
        this.cave.display();
        for (let platform of this.platforms) {
            platform.display();
        }
        for (let food of this.foods) {
            food.display();
        }
        for (let groundDamage of this.groundDamages) {
            groundDamage.display();
        }
        for (let groundEnemy of this.groundEnemies) {
            groundEnemy.display();
        }
    }

    stopMovement() {
        this.xSpeed = 0;
    }

    moveAllPlatforms()
    {
        if(game.player.x >= width / 2 && game.stopMapMovement === false){
            for (let platform of this.platforms) {
                platform.x -= this.xSpeed;
            }
            for (let food of this.foods) {
                food.x -= this.xSpeed;
            }
            for (let groundDamage of this.groundDamages) {
                groundDamage.x -= this.xSpeed;
            }
            for (let groundEnemy of this.groundEnemies) {
                groundEnemy.originX -= this.xSpeed;
            }
            this.cave.x -= this.xSpeed;
        }
    }

    handleInput(isKeyDown) {
        if (isKeyDown) {
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                this.moveAllPlatforms();
            }
        }
    }

    /*
    draw() {
        // draw the map
        for (var row = 0; row < this.blocks.length; row++) {
            for (var col = 0; col < this.blocks[row].length; col++) {

                if (this.blocks[row][col] != 0) {
                    this.blocks[row][col].draw(this.offset, this.yOffset);
                }
            }
        }
    }
    */
}
