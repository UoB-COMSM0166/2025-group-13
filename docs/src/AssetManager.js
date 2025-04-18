class AssetManager {
    preload() {
        // cover image
        this.homePageBackground = loadImage('assets/background/screen_cover.png');
        this.gamePageIceBackground = loadImage('assets/background/bg_lv2.png');
        this.gameOverBackground = loadImage('assets/background/screen_lv1Dead.png');
        this.gameOverByIce = loadImage('assets/background/screen_lv2Dead.png');
        this.levelCompleteBackground = loadImage('assets/background/screen_lv1ToLv2.png');
        this.gameWon = loadImage('assets/background/screen_lv1Win.png');
        this.instructionsPage = loadImage('assets/background/instructions.png');
        //enviroment image
        this.gamePageBackground = loadImage('assets/background/bg_lv1.png');
        this.lavaImg = loadImage('assets/items/tile_lava.gif');
        this.iceLakeImg = loadImage('assets/items/tile_icelake.png');
        this.enemyFireImg = loadImage('assets/items/enemyFire.png');
        this.enemyIceImg = loadImage('assets/items/enemyIce.png');
        this.skyFireImg = loadImage('assets/items/skyFire.png');
        this.skyIceImg = loadImage('assets/items/skyIce.png');
        this.tilesetImg = loadImage('assets/items/tile_grandTreePlatform.png');
        this.caveImg = loadImage('assets/items/item_cave.png');
        this.iceSpikeImg = loadImage('assets/items/ice_spike.png');
        //player image
        this.imgDinoRed = loadImage('assets/player/item_dino_red.png');
        ////items image
        this.healthRelatedItems = loadImage('assets/items/item_healthRelated.png');

        // music - background
        this.bgm_exciting = loadSound('assets/sounds/bgm_exciting.mp3');
        this.bgm_relax = loadSound('assets/sounds/bgm_relax.mp3');
        this.bgm_cave = loadSound('assets/sounds/bgm_cave.mp3');

        // music - effect
        this.effect_eat = loadSound('assets/sounds/effect_eat.mp3');
        this.effect_dino = loadSound('assets/sounds/effect_dinosaur_sound.mp3');
        this.effect_damage_environment = loadSound('assets/sounds/effect_damagedBy_environment.mp3');
        this.effect_damage_enemy = loadSound('assets/sounds/effect_damagedBy_enemy.mp3');
    }

    constructor() {
    }
}
