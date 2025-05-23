/**
 * AssetManager class is responsible for loading and managing all the assets used in the game.
 * Assets are preloaded at the beginning of the game and can be accessed later.
 */

class AssetManager {
    preload() {
        // cover image
        this.homePageBackground = loadImage('assets/background/screen_cover.png');

        this.gamePageBackground = loadImage('assets/background/bg_lv1.png');
        this.gamePageIceBackground = loadImage('assets/background/bg_lv2.png');
        this.gamePageDesertBackground = loadImage('assets/background/bg_lv3.gif');

        this.gameOverBackground = loadImage('assets/background/screen_lv1Dead.png');
        this.gameOverByIce = loadImage('assets/background/screen_lv2Dead.png');
        this.gameOverByDesert = loadImage('assets/background/screen_lv3Dead.jpeg');

        this.level1CompleteBackground = loadImage('assets/background/screen_lv1ToLv2.png');
        this.level2CompleteBackground = loadImage('assets/background/screen_lv2ToLv3.png');
        this.gameWon = loadImage('assets/background/screen_Win.png');
        this.instructionsPage = loadImage('assets/background/instructions.png');
        
        //enviroment image
        this.lavaImg = loadImage('assets/items/tile_lava.gif');
        this.iceLakeImg = loadImage('assets/items/tile_icelake.gif');
        this.desertImg = loadImage('assets/items/tile_desert.png');

        this.enemyFireImg = loadImage('assets/items/enemyFire.png');
        this.enemyIceImg = loadImage('assets/items/enemyIce.png');
        this.enemyDesertImg = loadImage('assets/items/enemyDesert.png');

        this.skyFireImg = loadImage('assets/items/skyFire.png');
        this.skyIceImg = loadImage('assets/items/skyIce.png');
        this.skyDesertImg = loadImage('assets/items/skyDesert.png');

        this.tilesetImg = loadImage('assets/items/tile_grandTreePlatform.png');
        this.floatLava = loadImage('assets/items/floatLava.png');
        this.floatDesert = loadImage('assets/items/floatDesert.png');
        this.groundIce = loadImage('assets/items/groundIce.png');
        this.groundDesert = loadImage('assets/items/groundDesert.png');
        
        this.caveFire = loadImage('assets/items/caveFire.png');
        this.caveIce = loadImage('assets/items/caveIce.png');
        this.caveDesert = loadImage('assets/items/caveDesert.png');

        //player image
        this.imgDinoRed = loadImage('assets/player/item_dino_red.png');
        ////items image
        this.healthRelatedItems = loadImage('assets/items/item_healthRelated.png');
        this.damageDesert = loadImage('assets/items/damageDesert.png');

        // music - general background
        this.bgm_exciting = loadSound('assets/sounds/bgm_exciting.mp3');
        this.bgm_tragic = loadSound('assets/sounds/bgm_tragic.mp3');
        this.bgm_relax = loadSound('assets/sounds/bgm_relax.mp3');
        this.bgm_cave = loadSound('assets/sounds/bgm_cave.mp3');
        // music - environment background
        this.effect_ice_cracking = loadSound('assets/sounds/effect_ice_cracking.mp3');
        this.effect_lava_loop = loadSound('assets/sounds/effect_lava_loop.mp3');
        this.effect_snow_storm = loadSound('assets/sounds/effect_snow_storm.mp3');
        // music - effect
        this.effect_eat = loadSound('assets/sounds/effect_eat.mp3');
        this.effect_dino = loadSound('assets/sounds/effect_dinosaur_sound.mp3');
        this.effect_dino_hurt = loadSound('assets/sounds/effect_dinosaur_hurt.mp3');
        this.effect_damage_environment = loadSound('assets/sounds/effect_damagedBy_environment.mp3');
        this.effect_damage_enemy = loadSound('assets/sounds/effect_damagedBy_enemy.mp3');
    }

    constructor() {
    }
}
