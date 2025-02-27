class Map {
    preload() {
        Platform.preload();
    }
    constructor() {
        this.platforms = [];
        this.xSpeed = 4;
    }
    setup() {
        //TODO: fix imageMode(CENTER),and all of these need to redo.

        // "Ground" platform
        let groundGapTwo = Brick.width * 2;
        let groundGapSix = Brick.width * 6;
        let groundHeight = game.windowHeight - game.groundTop;
        let groundY = game.windowHeight - Brick.height;
        let groundOneEndX = (game.windowWidth / 2 - groundGapSix / 2) + (game.windowWidth - groundGapSix) / 2;

        this.platforms.push(new Platform((game.windowWidth / 2 - groundGapSix / 2), groundY, game.windowWidth - groundGapSix, groundHeight));
        this.platforms.push(new Platform(groundOneEndX + game.windowWidth / 2 + groundGapTwo, groundY, game.windowWidth - groundGapTwo, groundHeight));
        this.platforms.push(new Platform(game.windowWidth + game.windowWidth + game.windowWidth / 2, groundY, game.windowWidth, groundHeight));

        //float platforms
        this.platforms.push(new Platform(120, 310, 3));
        this.platforms.push(new Platform(350, 330, 5));
        this.platforms.push(new Platform(450, 250, 7));

        this.platforms.push(new Platform(width + 120, 310, 3));
        this.platforms.push(new Platform(width + 350, 330, 5));
        this.platforms.push(new Platform(width + 450, 250, 7));

        this.platforms.push(new Platform(width + width + 120, 310, 3));
        this.platforms.push(new Platform(width + width + 350, 330, 5));
        this.platforms.push(new Platform(width + width + 450, 250, 7));

        //lava behind ground
        let lava = new Platform(width / 2, 175, "full", 30);
        this.platforms.push(lava);
        // End wall
        this.platforms.push(new Platform(width + width + 600, height / 2, 30, height));
    }
    update() {
        // Update positions for all platforms
        for (let p of this.platforms) {
            p.updateBounds();
        }
    }

    display() {
        // Display all platforms
        for (let p of this.platforms) {
            p.display();
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
