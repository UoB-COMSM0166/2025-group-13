// Class Game handles the main game logic and delegate jobs through each independent objects
class Game {
    constructor(gameLevel, assetManager) {
        this.currentLevel = gameLevel;
        this.assetManager = assetManager;
        this.windowBottom = height;
        this.windowLeft = 0;

        this.lavaTileHeight = 25;
        this.lavaTileWidth = 50;

        this.groundTop = height - this.lavaTileHeight;

        this.maps = [];
        for(let i = 0; i < layouts.length; i++){
            this.maps.push(new Map(assetManager));
        }

        // Set the current map
        this.currentMap = gameLevel -1;
        this.map = this.maps[this.currentMap];

        // Create new health of the player
        this.health = new Health(assetManager);    
        // Create new player
        //this.player = new Player(width / 2, this.groundTop / 2,  assetManager); 
        this.player = new Player(0, this.groundTop,  this.health, assetManager); 

        this.stopMapMovement = false;
    }

    setup() {
        this.map.setup(layouts[this.currentMap]); //init map
    }

    update() {
        this.map.update(); // display map
        this.player.update(this.map.platforms, this.map.foods, this.map.fires, this.map.cave);
        this.health.updateHealth();
    }

    draw() {
        if (this.assetManager.gamePageBackground) {
            image(this.assetManager.gamePageBackground, width/2, height/2, width, height);
        } else {
            background(220);
        }

        if (this.assetManager.lavaImg) {
            let tilesX = Math.ceil(width * 2 / this.lavaTileWidth);
            for (let i = 0; i < tilesX; i++) {
                let dx = this.windowLeft + (i * this.lavaTileWidth) + this.lavaTileWidth / 2;
                // let dy = (this.windowBottom - this.lavaTileHeight / 2);
                let dy = (height - this.lavaTileHeight / 2);

                image(this.assetManager.lavaImg, dx, dy, this.lavaTileWidth, this.lavaTileHeight);
            }
        }

        this.map.display();
        this.player.display();
        this.health.display();

        // Display the actual level
        textSize(20);
        fill(0);
        text("Level " + (this.currentLevel), width-50, 25);

        this.update();
    }


    handleInput() {
        if (keyIsDown) {
            this.map.handleInput(true); // handle map input
            this.player.handleInput(true); // handle player input
        }
    }

    isGameOver() {
        if(this.health.getHealth() <= 0){
            return true;
        }
        else return false;
    }

    nextLevel()
    {
        this.currentMap = (this.currentMap + 1) % this.maps.length;
        this.map = this.maps[this.currentMap];
    }

    isLevelComplete() {
        if(this.player.reachedCave){
            //nextLevel();
            return true;
        }
        else return false;
    }
    
}

