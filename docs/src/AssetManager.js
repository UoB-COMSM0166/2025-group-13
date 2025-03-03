class AssetManager {
    preload() {
        this.homePageBackground = loadImage('assets/background/homePage.png');
        this.gamePageBackground = loadImage('assets/background/bg_volcano.png');
        this.gamePageIceBackground = loadImage('assets/background/bg_ice.png');
        this.gameOverBackground = loadImage('assets/background/screen_dead.png');
        this.gameOverByIce = loadImage('assets/background/screen_frozen.jpg');
        this.levelCompleteBackground = loadImage('assets/background/screen_win.png');
        this.lavaImg = loadImage('assets/items/tile_lava.gif');
        this.iceLakeImg = loadImage('assets/items/tile_icelake.png');
        this.imgDinoRed = loadImage('assets/player/item_dino_red.png');
        this.img_heart = loadImage('assets/items/heart.png');
        this.tilesetImg = loadImage('assets/items/tile_grandTreePlatform.png');
        this.foodImg = loadImage('assets/items/food.png');
        this.fireImg = loadImage('assets/items/fire.png');
        this.iceSpikeImg = loadImage('assets/items/ice_spike.png');
        this.fireGif = loadImage('assets/items/fire.gif');
        this.caveImg = loadImage('assets/items/cave.png');
    }

    constructor() {
    }
}