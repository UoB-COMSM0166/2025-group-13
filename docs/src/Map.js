class Map {
    constructor() {
        this.platforms=[];

    }
    setup() {
        // Create some sample platforms
        this.platforms.push(new Platform(width / 2, 375, width, 50));   // "Ground" platform
      //float platforms
      this.platforms.push(new Platform(100 + 50, 250 + 5, 100, 10));
      this.platforms.push(new Platform(300 + 60, 200 + 5, 120, 10));
      this.platforms.push(new Platform(450 + 40, 300 + 5, 80, 10));
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
