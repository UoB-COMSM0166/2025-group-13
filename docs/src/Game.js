// Game.js
class Game {

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
        this.maps = [];
        for(let i = 0; i < layouts.length; i++){
            this.maps.push(new Map());
        }
        this.currentMap = 1;
        this.map = this.maps[this.currentMap];
    }

    setup() {
        this.map.setup(layouts[this.currentMap]); //init map
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms, this.map.foods, this.map.fires, this.map.cave);
    }

    draw() {

        if (this.background_img) {
            image(this.background_img, width/2, height/2, width, height);
        } else {
            background(220);
        }

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
        this.player.display();

        this.update();
    }


    handleInput() {
        if (keyIsDown) {
            this.map.handleInput(true); // handle map input
            this.player.handleInput(true); // handle player input
        }
    }

    nextLevel()
    {
        this.currentMap = (this.currentMap + 1) % this.maps.length;
        this.map = this.maps[this.currentMap];
    }
}
