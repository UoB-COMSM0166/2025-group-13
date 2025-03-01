class Map {

    preload() {
        Platform.preload();
        Health.preload();
        Food.preload();
        Fire.preload();
        Cave.preload();
    }
    constructor() {
        this.platforms = [];
        this.foods = [];
        this.fires = [];
        this.cave;
        this.xSpeed = 4;
        this.food_height = 25;
        this.fire_height = 70;
    }
    setup() {
        //TODO: fix imageMode(CENTER), and all of these need to redo.

        let groundHeight = Brick.height;
        let groundY = height - Brick.height/2;
        // cave
        this.cave = new Cave(width + width + 620, height - groundHeight - Cave.caveHeight/3);
        // tree
        //TODO: fix tree's collision
        let treeHeightOne=90;
        this.platforms.push(new Platform("TREE", 250, height - groundHeight - treeHeightOne/2, 30, treeHeightOne));

        // "Ground" platform
        let groundGapTwo = Brick.width * 2;
        let groundGapSix = Brick.width * 6;
        let groundOneEndX = (width / 2 - groundGapSix / 2) + (width - groundGapSix) / 2;

        this.platforms.push(new Platform("GROUND", (width / 2 - groundGapSix / 2), groundY, width - groundGapSix, groundHeight));
        this.platforms.push(new Platform("GROUND", groundOneEndX + width / 2 + groundGapTwo, groundY, width - groundGapTwo, groundHeight));
        this.platforms.push(new Platform("GROUND", width + width + width / 2, groundY, width, groundHeight));

        //float platforms
        this.platforms.push(new Platform("FLOAT", 120, 310, 3));
        // this.platforms.push(new Platform("FLOAT", 350, 330, 5));
        this.platforms.push(new Platform("FLOAT", 450, 250, 7));

        this.platforms.push(new Platform("FLOAT", width + 120, 310, 3));
        this.platforms.push(new Platform("FLOAT", width + 350, 330, 5));
        this.platforms.push(new Platform("FLOAT", width + 450, 250, 7));

        this.platforms.push(new Platform("FLOAT", width + width + 120, 310, 3));
        this.platforms.push(new Platform("FLOAT", width + width + 350, 330, 5));
        this.platforms.push(new Platform("FLOAT", width + width + 450, 250, 7));

        // End wall
        this.platforms.push(new Platform("ENDSIGN", width + width + 600, height / 2, 30, height));

        // Food
        this.foods.push(new Food(120, 310 - this.food_height));
        this.foods.push(new Food(450, 250 - this.food_height));
        this.foods.push(new Food(width + 120, 310 - this.food_height));

        // Fire
        this.fires.push(new Fire(550, groundY-groundHeight));
        this.fires.push(new Fire(width + 480, groundY-groundHeight));

        // Health level
        this.health = new Health();
    }

    update() {
        // Update positions for all platforms
        for (let platform of this.platforms) { 
            platform.updateBounds();
        }
        for (let food of this.foods) { 
            food.updateFood();
        }
        for (let fire of this.fires) { 
            fire.updateFire();
        }
        this.cave.updateCave();
        this.health.updateHealth();
    }

    display() {
        // Display all platforms
        for (let platform of this.platforms) {
            platform.display();
        }
        for (let food of this.foods) {
            food.display();
        }
        for (let fire of this.fires) {
            fire.display();
        }
        this.cave.display();
        this.health.display();
    }

    stopMovement() {
        this.xSpeed = 0;
    }

    moveAllPlatforms()
    {
        if(game.player.x === width / 2){
            for (let platform of this.platforms) {
                platform.x -= this.xSpeed;
            }
            for (let food of this.foods) {
                food.x -= this.xSpeed;
            }
            for (let fire of this.fires) {
                fire.x -= this.xSpeed;
            }
            this.cave.x -= this.xSpeed;;
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
