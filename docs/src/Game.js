// Game.js
class Game {

    preload() {
        this.background_img = loadImage('src/assets/background_light.png');
        this.player.preload();
        this.map.preload();
    }

    constructor() {
        this.groundHeight = 380;
        this.player = new Player(width / 2, this.groundHeight/2);
        this.map = new Map();
    }

    setup() {
        createCanvas(600, 400);
        this.map.setup(); //init map
    }

    update() {        
        this.player.display(); // display player

        this.map.update(); // display map

        this.player.update(this.map.platforms);
    }

    draw() {
        if (this.background_img) {
            image(this.background_img, width/2, this.groundHeight/2, 600, 400);
        } else {
            background(220);
        }
        this.update();
    }
}
