/**
 * SoundManager class manages background music and sound effects of the game.
 * It handles starting, stopping, and controlling the volume and playback rate of all sounds.
 */

class SoundManager {
    /**
     * Constructor to set default attributes.
     * @param assetManager - Asset manager reference.
     */
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.isBGMStarted = false;
        this.defaultVolume = 0.4;
        this.defaultRate = 1.0;
    }

    /**
     * Starts background music of the game.
     */
    startGameBGM() {
        if (!this.isBGMStarted) {
            this.assetManager.bgm_exciting.setVolume(0.4);
            this.assetManager.bgm_exciting.rate(1.0);
            this.assetManager.bgm_exciting.loop();
            this.isBGMStarted = true;
        }
    }

    /**
     * Stops background music of the game
     */
    stopAllBGM() {
        this.assetManager.bgm_exciting.stop();
        this.assetManager.bgm_tragic.stop();
        this.assetManager.bgm_relax.stop();
        this.assetManager.bgm_cave.stop();

        this.assetManager.effect_lava_loop.stop();
        this.assetManager.effect_ice_cracking.stop();
        this.assetManager.effect_snow_storm.stop();

        this.isBGMStarted = false;
    }

    /**
     * Plays harmonious music after level comlpetion
     */
    playLevelCompleteMusic() {
        this.stopAllBGM();
        this.assetManager.bgm_relax.setVolume(0.5);
        this.assetManager.bgm_cave.setVolume(0.5);
        this.assetManager.bgm_relax.loop();
        this.assetManager.bgm_cave.loop();
    }

    /**
     * Plays ominous music after player player dies in the game.
     * @param mapIndex - Current level/map index to play the appriate music based on the theme.
     */
    playGameOverMusic(mapIndex) {
        this.stopAllBGM();
        this.assetManager.effect_dino_hurt.setVolume(1.0);
        this.assetManager.effect_dino_hurt.play();

        this.assetManager.bgm_tragic.setVolume(0.5);
        this.assetManager.bgm_tragic.loop();

        if (mapIndex === 0) {
            this.assetManager.effect_lava_loop.setVolume(0.4);
            this.assetManager.effect_lava_loop.loop();
        } else {
            this.assetManager.effect_ice_cracking.setVolume(0.4);
            this.assetManager.effect_snow_storm.setVolume(0.4);
            this.assetManager.effect_ice_cracking.loop();
            this.assetManager.effect_snow_storm.loop();
        }
    }

    /**
     * Plays music for pause game screen.
     */
    pauseBGM() {
        if (this.assetManager.bgm_exciting.isPlaying()) {
            this.assetManager.bgm_exciting.rate(0.4);
            this.assetManager.bgm_exciting.setVolume(0.2);
        }
    }

    /**
     * Plays music for gameplay resumption.
     */
    resumeBGM() {
        if (!this.assetManager.bgm_exciting.isPlaying()) {
            this.assetManager.bgm_exciting.loop();
        }
        this.assetManager.bgm_exciting.rate(this.defaultRate);
        this.assetManager.bgm_exciting.setVolume(this.defaultVolume);
        this.isBGMStarted = true;
    }

}
