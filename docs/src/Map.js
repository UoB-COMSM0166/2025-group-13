// Map class is responsible for managing the game map. 
// This includes platforms, food, enemies, and static/moving obstacles.

class Map {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.platforms = [];
        this.foods = [];
        this.groundDamages = [];
        this.enemies = [];
        this.skyFalls = [];
        this.cave;
        this.xSpeed = 4;
        this.food_height = scaleY * 25;
        this.groundDamage_height = scaleY * 70;
        this.enemy_height = scaleY * 70;
        this.skyFall_height = scaleY * 70;
    }

    setup(layout) {
        let platforms = layout[0];
        let foods = layout[1];
        let groundDamages = layout[2];
        let enemies = layout[3];
        let skyFalls = layout[4];
        let cave = layout[5];
        for(let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            this.platforms.push(new Platform(platform[0], scaleX * platform[1], scaleY * platform[2], platform[3], platform[4], this.assetManager));
        }

        for(let i = 0; i < foods.length; i++){
            let food = foods[i];
            this.foods.push(new Food(food[0], scaleX * food[1], scaleY *  food[2], this.assetManager));
        }

        for(let i = 0; i < groundDamages.length; i++){
            let groundDamage = groundDamages[i];
            this.groundDamages.push(new GroundDamage(groundDamage[0], scaleX * groundDamage[1], scaleY * groundDamage[2], this.assetManager));
        }

        for(let i = 0; i < enemies.length; i++){
            let enemy = enemies[i];
            this.enemies.push(new Enemy(enemy[0], scaleX *  enemy[1], scaleY *  enemy[2], this.assetManager, enemy[3], enemy[4], enemy[5]));
        }

        for(let i = 0; i < skyFalls.length; i++){
            let skyFall = skyFalls[i];
            this.skyFalls.push(new SkyFall(skyFall[0], scaleX * skyFall[1], scaleY * skyFall[2], this.assetManager, skyFall[3], skyFall[4], skyFall[5]));
        }

        this.cave = new Cave(cave[0], scaleX * cave[1], scaleY * cave[2], this.assetManager);
    }

    update() {
        // Update positions for all platforms
        for (let platform of this.platforms) {
            platform.updateBounds();
        }
        for (let food of this.foods) {
            food.updateFood();
        }
        for (let groundDamage of this.groundDamages) {
            groundDamage.updateGroundDamage();
        }
        for (let enemy of this.enemies) {
            enemy.updateEnemy();
        }
        for (let skyFall of this.skyFalls) {
            skyFall.updateSkyFall();
        }
        this.cave.updateCave();
    }

    display() {
        // Display all platforms
        this.cave.display();
        for (let platform of this.platforms) {
            platform.display();
        }
        for (let food of this.foods) {
            food.display();
        }
        for (let groundDamage of this.groundDamages) {
            groundDamage.display();
        }
        for (let enemy of this.enemies) {
            enemy.display();
        }
        for (let skyFall of this.skyFalls) {
            skyFall.display();
        }
    }

    stopMovement() {
        this.xSpeed = 0;
    }

    moveEntities()
    {
        if(game.player.x >= width / 2 && game.stopMapMovement === false){
            for (let platform of this.platforms) {
                platform.updatePreviousCoordinates();
                platform.x -= this.xSpeed;
            }
            for (let food of this.foods) {
                food.x -= this.xSpeed;
            }
            for (let groundDamage of this.groundDamages) {
                groundDamage.x -= this.xSpeed;
            }
            for (let enemy of this.enemies) {
                enemy.x -= this.xSpeed;
            }
            for (let skyFall of this.skyFalls) {
                skyFall.x -= this.xSpeed;
            }
            this.cave.x -= this.xSpeed;
        }
    }

    handleInput(moveRight) {
        if(moveRight) {
                this.moveEntities();
        }
    }
}
