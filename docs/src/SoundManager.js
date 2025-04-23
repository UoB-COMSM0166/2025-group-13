class SoundManager {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.isBGMStarted = false;
    }

    startGameBGM() {
        if (!this.isBGMStarted) {
            this.assetManager.bgm_exciting.setVolume(0.4);
            this.assetManager.bgm_exciting.rate(1.0);
            this.assetManager.bgm_exciting.loop();
            this.isBGMStarted = true;
        }
    }

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

    playLevelCompleteMusic() {
        this.stopAllBGM();
        this.assetManager.bgm_relax.setVolume(0.5);
        this.assetManager.bgm_cave.setVolume(0.5);
        this.assetManager.bgm_relax.play();
        this.assetManager.bgm_cave.play();
    }

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

    pauseBGM() {
        if (this.assetManager.bgm_exciting.isPlaying()) {
            this.assetManager.bgm_exciting.rate(0.5);
            this.assetManager.bgm_exciting.setVolume(0.1);
        }
    }

    resumeBGM() {
        if (!this.assetManager.bgm_exciting.isPlaying()) {
            this.assetManager.bgm_exciting.loop();
        }
        this.assetManager.bgm_exciting.setVolume(0.4);
        this.isBGMStarted = true;
    }
}
