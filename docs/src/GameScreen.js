// Class Screen handles the general configuration of the screen and draws them. 
// Set the screen width and heigth
const SCREENWIDTH = 850;
const SCREENHEIGHT = 500;

class GameScreen {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.screenWidth = SCREENWIDTH;
        this.screenHeight = SCREENHEIGHT;
    }

    setup() {
        let canvas = createCanvas(this.screenWidth, this.screenHeight);
        // Attach the canvas to the "canvas-container" div
        canvas.parent('canvas-container');
      }
      
    drawHomeScreen() {
        //createCanvas(this.width, this.height);
        // 0.8 opacity -> 0.8 * 255 ≈ 200
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        image(this.assetManager.homePageBackground, width/2, height/2, width, height);
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('black');
        strokeWeight(2);
        text("Welcome to the Dino Escape!", width / 2, height / 2 - 40);
        textSize(25);
        text("Press SPACE to Start", width / 2, height / 2 + 30);
    }

    drawPauseGame() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        background(128, 128, 128, 2); // mid-tone grey very-transparent
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('black');
        strokeWeight(2);
        text("Game Paused", width / 2, height / 2 - 40);
        textSize(25);
        text("Press SPACE to resume", width / 2, height / 2 + 30);
    }

    drawGameOver() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        switch(game.currentMap){
            case 0:
                image(this.assetManager.gameOverBackground, width/2, height/2, width, height);
                break;
            case 1:
                image(this.assetManager.gameOverByIce, width/2, height/2, width, height);
                break;
        }
        
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('white');
        strokeWeight(2);
        //text("Game Over", width / 2, height / 2 - 40);
        textSize(25);
        text("Press SPACE to play again", width / 2, height / 2 + 30);
    }

    drawLevelComplete() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        image(this.assetManager.levelCompleteBackground, width/2, height/2, width, height);
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('white');
        strokeWeight(2);
        //text("Level Complete", width / 2, height / 2 - 40);
        textSize(25);
        text("Press SPACE to start next level \n Or press ESCAPE to return to the home page", width / 2, height / 2 + 30);
        textSize(25);
    }

    drawEndGame() {
        image(this.assetManager.levelCompleteBackground, width/2, height/2, width, height);
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('white');
        strokeWeight(2);
        //text("Level Complete", width / 2, height / 2 - 40);
        textSize(25);
        text("Press SPACE to return to the home page", width / 2, height / 2 + 30);
        textSize(25);
    }
}
