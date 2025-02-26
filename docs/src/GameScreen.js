// Global variables for screen width and heigth
let SCREENWIDTH = 850;
let SCREENHEIGHT = 500;
// Class Screen handles the general configuration of the screen
// and draws the different types of screen when not playing. 
class GameScreen {
    constructor() {
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
        background(128, 128, 128, 200); // mid-tone grey semi-transparent
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
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
        text("Game Paused", width / 2, height / 2 - 40);
        textSize(25);
        text("Press SPACE to resume", width / 2, height / 2 + 30);
    }
}