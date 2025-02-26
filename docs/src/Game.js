// Game.js
class Game {

    preload() {
        this.background_img = loadImage('src/assets/bg_volcano.png');
        this.player.preload();
        this.map.preload();
    }

    constructor() {
        this.groundHeight = 350;
        this.player = new Player(width / 2, this.groundHeight/2);
        this.map = new Map();
    }

    setup() {
        createCanvas(600, 400);

        this.map.setup(); //init map
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms);
    }

    draw() {
        if (this.background_img) {
            image(this.background_img, width/2, this.groundHeight/2, 600, 400);
        } else {
            background(220);
        }
        this.player.display(); // display player
        this.map.display(); // display map
        this.update();
    }

    handleInput(){
        if(keyIsDown){
            this.map.handleInput(true); // handle player input
            this.player.handleInput(true); // handle map input
        }
    }
}
