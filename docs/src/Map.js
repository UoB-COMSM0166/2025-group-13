class Map {
    constructor() {
        this.platforms = [];

    }
    setup() {
        // "Ground" platform
        this.platforms.push(new Platform(width / 2, 375, width, Brick.height*2));
        //float platforms
        this.platforms.push(new Platform(120, 250, 3));
        this.platforms.push(new Platform(230, 170, 5));
        this.platforms.push(new Platform(450, 250, 7));
    }
    update() {
        // Draw all platforms
        for (let p of this.platforms) {
            p.display();
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
