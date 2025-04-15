// Class Game handles the main game logic and delegate jobs through each independent objects
class Game {
    constructor(gameLevel, assetManager) {
        this.currentLevel = gameLevel;
        this.assetManager = assetManager;
        this.windowBottom = height;
        this.windowLeft = 0;

        //this.lavaTileHeight = 25;
        this.lavaTileHeight = 25;
        this.lavaTileWidth = 50;

        //this.groundTop = height - this.lavaTileHeight;
        this.groundTop = height - 50;

        this.maps = [];
        for (let i = 0; i < layouts.length; i++) {
            this.maps.push(new Map(assetManager));
        }

        // Set the current map
        this.currentMap = gameLevel - 1;
        this.map = this.maps[this.currentMap];

        // Create new health of the player
        this.health = new Health(assetManager);
        // Create new player
        //this.player = new Player(2, this.groundTop, this.health, assetManager);
        this.player = new Player(0, height / 2, this.health, assetManager);

        this.stopMapMovement = false;
    }

    setup() {
        this.map.setup(layouts[this.currentMap]); //init map
        // dino noisy - everytime start a level
        this.assetManager.effect_dino.setVolume(1.0);
        this.assetManager.effect_dino.play();

        if (this.assetManager.bgm_relax.isPlaying()) {
            this.assetManager.bgm_relax.stop();
        }
        if (this.assetManager.bgm_cave.isPlaying()) {
            this.assetManager.bgm_cave.stop();
        }
        // exciting bgn play
        this.assetManager.bgm_exciting.setVolume(0.4);
        this.assetManager.bgm_exciting.loop();
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms, this.map.foods, this.map.groundDamages, this.map.enemies, this.map.skyFalls, this.map.cave);
        this.health.updateHealth();
    }

    draw() {
        if (this.assetManager.gamePageBackground) {
            switch (this.currentMap) {
                case 0:
                    image(this.assetManager.gamePageBackground, width / 2, height / 2, width, height);
                    break;
                case 1:
                    image(this.assetManager.gamePageIceBackground, width / 2, height / 2, width, height);
                    break;
            }

        } else {
            background(220);
        }

        if (this.assetManager.lavaImg) {
            let tilesX = Math.ceil(width * 2 / this.lavaTileWidth);
            for (let i = 0; i < tilesX; i++) {
                let dx = this.windowLeft + (i * this.lavaTileWidth) + this.lavaTileWidth / 2;
                // let dy = (this.windowBottom - this.lavaTileHeight / 2);
                let dy = (height - this.lavaTileHeight / 2);

                switch (this.currentMap) {
                    case 0:
                        image(this.assetManager.lavaImg, dx, dy, this.lavaTileWidth, this.lavaTileHeight);
                        break;
                    case 1:
                        image(this.assetManager.iceLakeImg, dx, dy, this.lavaTileWidth, this.lavaTileHeight);
                        break;
                }

            }
        }

        this.map.display();
        this.player.display();
        this.health.display();

        // Display the actual level
        textSize(20);
        switch (this.currentMap) {
            case 0:
                fill('orange');
                stroke('red');
                break;
            case 1:
                fill(255);
                stroke('blue');
                break;
        }
        text("Level " + (this.currentLevel), width - 75, 25);
        textSize(30);
        switch (game.currentMap) {
            case 0:
                text("Lava Rush", width / 2, 25);
                break;
            case 1:
                text("Icy Endgame", width / 2, 25)
                break;
        }

        this.update();
    }

    handleInput(triggerJump, moveLeft, moveRight) {
        /*if (keyIsDown) {
            this.map.handleInput(true); // handle map input
            this.player.handleInput(true); // handle player input
        }*/
        this.map.handleInput(moveRight);
        this.player.handleInput(moveLeft, moveRight, triggerJump);
    }

    isGameOver() {
        if (this.health.getHealth() <= 0) {
            return true;
        }
        else return false;
    }

    nextLevel() {
        this.currentMap = (this.currentMap + 1) % this.maps.length;
        this.map = this.maps[this.currentMap];
    }

    isLevelComplete() {
        if (this.player.reachedCave) {
            if (this.assetManager.bgm_exciting.isPlaying()) {
                this.assetManager.bgm_exciting.stop();
            }
            if (!this.assetManager.bgm_cave.isPlaying()) {
                this.assetManager.bgm_cave.setVolume(0.5);
                this.assetManager.bgm_cave.play();
            }
            if (!this.assetManager.bgm_relax.isPlaying()) {
                this.assetManager.bgm_relax.setVolume(0.5);
                this.assetManager.bgm_relax.play();
            }
            //nextLevel();
            return true;
        }
        else return false;
    }

}
