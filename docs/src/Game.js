/**
 * Game class handles the main game logic and delegate jobs through each independent objects.
 * Game class keep track of levels, draws game map based on it. passess asset manager reference to 
 * other class instances. Updates and draws player and the map.
 */

class Game {
    /**
     * Constructor initializes the game object which remains in memory until user closes the window.
     * @param gameLevel - index of level to be played at the start.
     * @param assetManager - asset manager reference required to retrieve visual & audio data.
     */
    constructor(gameLevel, assetManager) {
        this.currentLevel = gameLevel;
        this.assetManager = assetManager;
        this.windowBottom = height;
        this.windowLeft = 0;

        //this.lavaTileHeight = 25;
        this.lavaTileHeight = scaleY * 25;
        this.lavaTileWidth = scaleX * 50;

        //this.groundTop = height - this.lavaTileHeight;
        this.groundTop = height - (scaleY * 50);

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

    /**
     * Sets up the game map layout with data for current level and audio effect .
     */
    setup() {
        this.map.setup(layouts[this.currentMap]); //init map
        // dino noisy - everytime start a level
        this.assetManager.effect_dino.setVolume(1.0);
        this.assetManager.effect_dino.play();
    }

    /**
     * Updates the game based on player interactions with the map objects.
     */
    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms, this.map.foods, this.map.groundDamages, this.map.enemies, this.map.skyFalls, this.map.cave);
        this.health.updateHealth();
    }

    /**
     * Draws the game screen in its entirety i.e. the background, player, obstacles, NPCs and food items etc.
     */
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
        text("Level " + (this.currentLevel), width - scaleX * 75, scaleY * 25);
        textSize(30);
        switch (game.currentMap) {
            case 0:
                text("Lava Rush", width / 2, scaleY * 25);
                break;
            case 1:
                text("Icy Endgame", width / 2, scaleY * 25);
                break;
        }

        this.update();
    }

    /**
     * Handles input proved by the user via touch screen buttons or keyboard
     * @param triggerJump - True if jump key/button is provided.
     * @param moveLeft - True if left key/button is pressed.
     * @param moveRight - True if right key/button is pressed.
     */
    handleInput(triggerJump, moveLeft, moveRight) {
        this.map.handleInput(moveRight);
        this.player.handleInput(moveLeft, moveRight, triggerJump);
    }

    /**
     * Checks if the player has died while gameplay.
     * @returns {boolean}
     */
    isGameOver() {
        if (this.health.getHealth() <= 0) {
            return true;
        }
        else return false;
    }

    /**
     * Changes the game level and load the new map.
     * After last level the next level is the default first level.
     */
    nextLevel() {
        this.currentMap = (this.currentMap + 1) % this.maps.length;
        this.map = this.maps[this.currentMap];
    }

    /**
     * Checks if a level has been completed by the player by reaching the cave.
     * Sets the appropriate sound effect for level completion.
     * @returns {boolean} - True if level has been completed else false.
     */
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
            return true;
        }
        else return false;
    }

}
