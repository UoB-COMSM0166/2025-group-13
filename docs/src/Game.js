// Game.js
class Game {
    static level1Platforms = 
    [
        ["TREE", 250, 425, 30, 90],
        ["GROUND", 335, 485, 670, 30],
        ["GROUND", 1155, 485, 670, 30],
        ["GROUND", 2125, 485, 850, 30],
        ["FLOAT", 120, 310, 90, 30],
        ["FLOAT", 450, 280, 210, 30],
        ["FLOAT", 970, 310, 90, 30],
        ["FLOAT", 1200, 330, 150, 30],
    ];
    static level1Foods = 
    [
        [120, 280],
    ];

    static level1Fires =
    [
        [500, 450],
    ]; 

    static level2Platforms = 
    [
        ["TREE", 250, 425, 30, 90],
        ["GROUND", 335, 485, 670, 30],
        ["GROUND", 1155, 485, 670, 30],
        ["GROUND", 2125, 485, 850, 30],
        ["FLOAT", 120, 310, 90, 30],
        ["FLOAT", 450, 280, 210, 30],
        ["FLOAT", 970, 310, 90, 30],
        ["FLOAT", 1200, 330, 150, 30],
    ];
    static level2Foods = 
    [
        [120, 280],
    ];

    static level2Fires =
    [
        [500, 450],
    ];

    static layouts = 
    [
        [Game.level1Platforms, Game.level1Foods, Game.level1Fires], 
        [Game.level2Platforms, Game.level2Foods, Game.level2Fires],
    ];

    preload() {
        this.background_img = loadImage('src/assets/bg_volcano.png');
        this.lavaImg = loadImage('src/assets/tile_lava.gif');
        this.player.preload();
        this.map.preload();
    }

    constructor() {
        // height = 400;
        // width = 600;

        this.windowBottom = height;
        this.windowLeft = 0;

        this.lavaTileHeight = 25;
        this.lavaTileWidth = 50;

        this.groundTop = height - this.lavaTileHeight;

        this.player = new Player(width / 2, this.groundTop / 2);
        this.map = new Map();
    }

    setup() {
        this.map.setup(Game.layouts[0]); //init map
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms);
    }

    draw() {

        if (this.background_img) {
            image(this.background_img, width/2, height/2, width, height);
        } else {
            background(220);
        }

        this.player.display();

        if (this.lavaImg) {
            let tilesX = Math.ceil(width * 2 / this.lavaTileWidth);
            for (let i = 0; i < tilesX; i++) {
                let dx = this.windowLeft + (i * this.lavaTileWidth) + this.lavaTileWidth / 2;
                // let dy = (this.windowBottom - this.lavaTileHeight / 2);
                let dy = (height - this.lavaTileHeight / 2);

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
