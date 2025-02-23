class Game {
    constructor() {
        this.map = new Map(mapTexture); // 传入地图贴图
        this.groundHeight = 350; // Define ground height
        this.player = new Player(width / 2, this.groundHeight / 2, playerTexture); // 传入玩家贴图
    }

    setup() {
        createCanvas(600, 400);
        this.map.setup(); // init map
    }

    update() {
        background(220);

        this.map.update(); // display map
        this.player.update(this.map.platforms);
        this.player.display();
    }

    draw() {
        this.update();
    }
}
