// Game.js
class Game {

    preload() {
        this.background_img = loadImage('src/assets/bg_volcano.png');
        this.lavaImg = loadImage('src/assets/tile_lava.gif');
        this.player.preload();
        this.map.preload();
    }

    constructor() {
        this.windowHeight = 400;
        this.windowWidth = 600;

        this.windowBottom = this.windowHeight;
        this.windowLeft = 0;

        this.lavaTileHeight = 25;
        this.lavaTileWidth = 50;

        this.groundTop = this.windowHeight - this.lavaTileHeight;

        this.player = new Player(width / 2, this.groundTop / 2);
        this.map = new Map();
    }

    setup() {
        this.map.setup(); //init map
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms);
    }

    draw() {

        if (this.background_img) {
            image(this.background_img, width/2, this.groundTop/2, width, height);
        } else {
            background(220);
        }

        this.player.display();

        if (this.lavaImg) {
            let tilesX = Math.ceil(this.windowWidth * 2 / this.lavaTileWidth);
            for (let i = 0; i < tilesX; i++) {
                let dx = this.windowLeft + (i * this.lavaTileWidth) + this.lavaTileWidth / 2;
                let dy = (this.windowBottom - this.lavaTileHeight / 2);

                image(this.lavaImg, dx, dy, this.lavaTileWidth, this.lavaTileHeight);
            }
        }

        this.map.display();


        this.update();
    }


    handleInput() {
        if (keyIsDown) {
            this.map.handleInput(true); // handle map input
            this.player.handleInput(true); // handle player input
        }
    }
}
