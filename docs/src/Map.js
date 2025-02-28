class Map {
    preload() {
        Platform.preload();
    }
    constructor() {
        this.platforms = [];
        this.xSpeed = 4;
    }
    setup() {
        //TODO: fix imageMode(CENTER), and all of these need to redo.

        let groundHeight = Brick.height;
        let groundY = height - Brick.height/2;
        // tree
        //TODO: fix tree's collision
        let treeHeightOne=90;
        this.platforms.push(new Platform("TREE", 250, groundY-treeHeightOne, 30, treeHeightOne));

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

    }

    update() {
        // Update positions for all platforms
        for (let p of this.platforms) {
            // console.log(p.platformType);
            p.updateBounds();
        }
    }

    display() {
        // Display all platforms
        for (let p of this.platforms) {
            p.display();
            // console.log("p.type = ", p.type);
        }
    }

    stopMovement() {
        this.xSpeed = 0;
    }

    moveAllPlatforms() {
        if (game.player.x === width / 2) {
            for (let p of this.platforms) {
                p.x -= this.xSpeed;
            }
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
