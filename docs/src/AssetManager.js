class AssetManager {
    preload() {
        // cover image
        this.homePageBackground = loadImage('assets/background/screen_cover.png');
        this.gameOverBackground = loadImage('assets/background/screen_dead.png');
        this.levelCompleteBackground = loadImage('assets/background/screen_win.png');
        //enviroment image
        this.gamePageBackground = loadImage('assets/background/bg_volcano.png');
        this.lavaImg = loadImage('assets/items/tile_lava.gif');
        this.tilesetImg = loadImage('assets/items/tile_grandTreePlatform.png');
        this.caveImg = loadImage('assets/items/item_cave.png');
        //player image
        this.imgDinoRed = loadImage('assets/player/item_dino_red.png');
        //items image
        this.img_heart = loadImage('assets/items/heart.png');
        this.foodImg = loadImage('assets/items/food.png');
        this.fireImg = loadImage('assets/items/fire.png');
        this.fireGif = loadImage('assets/items/fire.gif');
    }

    constructor() {
    }
}
