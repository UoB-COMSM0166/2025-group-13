class Map {
    preload() {
        Platform.preload();
    }
    constructor() {
        this.platforms = [];
        this.xSpeed = 4;
    }
    setup() {
        // "Ground" platform
        this.platforms.push(new Platform(width/2, 375, width, Brick.height*2));
        this.platforms.push(new Platform(width + width/2, 375, width, Brick.height*2));
        this.platforms.push(new Platform(width + width + width/2, 375, width, Brick.height*2));
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

        // End wall
        this.platforms.push(new Platform(width + width + 600, height/2, 30, height));
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

    stopMovement()
    {
        this.xSpeed = 0;
    }

    moveAllPlatforms()
    {
        if(game.player.x === width / 2){
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
