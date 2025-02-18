class Map {
    constructor() {
        this.platforms = [];
        this.xSpeed = 0;
        this.maxSpeed = 4;
    }
    setup() {
        // "Ground" platform
        this.platforms.push(new Platform(width / 2, 375, width*3, Brick.height*2));
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

        this.platforms.push(new Platform(width + width + 600, height/2, 30, height));
    }
    update() {
        // Draw all platforms
        for (let p of this.platforms) {
            p.x -= this.xSpeed;
            p.updateBounds();
        }
    }

    display() {
        for (let p of this.platforms) {
            p.display();
        }
    }

    stopMovement()
    {
        this.xSpeed = 0;
    }

    setSpeed(direction)
    {
        if(game.player.x >= width / 2) {
            this.xSpeed = direction * this.maxSpeed;
        }
    }

    handleInput(isKeyDown) {
        if (isKeyDown) {
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.setSpeed(1);
        } else {
            if (keyCode === RIGHT_ARROW || keyCode === 68) {
                this.stopMovement();
            }
        }
    }

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

}
