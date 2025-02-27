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

        this.windowBottom = windowHeight;
        this.windowLeft = 0;

        this.lavaTileHeight = 50;
        this.lavaTileWidth = 50;

        this.groundTop = this.windowHeight - this.lavaTileHeight;

        this.player = new Player(width / 2, this.groundTop / 2);
        this.map = new Map();
    }

    setup() {
        createCanvas(this.windowWidth, this.windowHeight);

        this.map.setup(); //init map
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms);
    }

    draw() {
        if (this.background_img) {
            image(this.background_img, width / 2, this.groundTop / 2, this.windowWidth, this.windowHeight);
        } else {
            background(220);
        }

        if (this.lavaImg) {
            let tilesX = Math.ceil(this.windowWidth / this.lavaTileWidth);
            for (let i = 0; i < tilesX; i++){
                let dx = this.windowLeft + (i* this.lavaTileWidth / 2);
                let dy = (this.windowBottom - this.lavaTileHeight*2);
                image(this.lavaImg, dx, dy, this.lavaTileHeight, this.lavaTileWidth, 0, 0, this.lavaImg.width, this.lavaImg.height, CONTAIN)
            }
        }
        this.player.display(); // display player
        this.map.display(); // display map
        this.update();
    }

    handleInput() {
        if (keyIsDown) {
            this.map.handleInput(true); // handle player input
            this.player.handleInput(true); // handle map input
        }
    }
}
