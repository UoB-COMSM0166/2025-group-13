// Class Screen handles the general configuration of the screen and draws them. 
// Set the screen width and heigth
const SCREENWIDTH = 850;
const SCREENHEIGHT = 500;

let titleGlow = 0;
let glowDirection = 1;

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
      
    // drawHomeScreen() {
    //     //createCanvas(this.width, this.height);
    //     // 0.8 opacity -> 0.8 * 255 ≈ 200
    //     //background(128, 128, 128, 200); // mid-tone grey semi-transparent
    //     image(this.assetManager.homePageBackground, width/2, height/2, width, height);
    //     textAlign(CENTER, CENTER);
    //     textSize(40);
    //     fill(0);
    //     stroke('black');
    //     strokeWeight(2);
    //     text("Welcome to the Dino Escape!", width / 2, height / 2 - 40);
    //     textSize(25);
    //     text("Press SPACE to Start", width / 2, height / 2 + 30);
    // }

    drawHomeScreen() {
        imageMode(CENTER); // Ensure the background image is centered
        image(this.assetManager.homePageBackground, width / 2, height / 2, width, height);
    
        textAlign(CENTER, CENTER);
        
        // Title text with shadow effect
        textSize(30);
        stroke(0);
        strokeWeight(4);
        fill(255, 215, 0); // Golden text
        text("Outrun the Apocalypse!", width / 4, height / 2 - 150);
    
        // Box dimensions and position
        let boxWidth = 350;
        let boxHeight = 60;
        let boxX = width / 2 - boxWidth / 2;
        let boxY = height - 80;
    
        // Draw semi-transparent background behind instructions
        fill(0, 0, 0, 180); // Darker transparency for better contrast
        noStroke();
        rect(boxX, boxY, boxWidth, boxHeight, 20); // Rounded edges
    
        // Draw instruction text (centered inside the box)
        textSize(30);
        fill(255);
        text("Press SPACE to Start", boxX, boxY);
    }
    
    drawInstructions() {
        imageMode(CENTER); // Ensure the background image is centered
        //TODO: Update the 
        //image(this.assetManager.homePageBackground, width / 2, height / 2, width, height); // Delete this line
        image(this.assetManager.instructionsPage, width / 2, height / 2, width, height);

        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('white');
        strokeWeight(2);
        textSize(25);

        // Box dimensions and position
        let boxWidth = 400;
        let boxHeight = 70;
        let boxX = width/2;
        let boxY = 200;
    
        // Draw semi-transparent background behind instructions
        fill(0, 0, 0, 180); // Darker transparency for better contrast
        noStroke();
        rect(boxX, boxY, boxWidth, boxHeight, 20); // Rounded edges
    
        // Draw instruction text (centered inside the box)
        textSize(30);
        fill(255);
        text("Press SPACE to play", boxX, boxY);
    }
    
    drawPauseGame() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        background(128, 128, 128, 2); // mid-tone grey very-transparent
        textAlign(CENTER, CENTER);
        textSize(50);
        fill('white');
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

        // Box dimensions and position
        let boxWidth = 600;
        let boxHeight = 70;
        let boxX = width / 2 - boxWidth / 2;
        let boxY = height - 80;
    
        // Draw semi-transparent background behind instructions
        fill(0, 0, 0, 180); // Darker transparency for better contrast
        noStroke();
        rect(boxX, boxY, boxWidth, boxHeight, 20); // Rounded edges
    
        // Draw instruction text (centered inside the box)
        textSize(30);
        fill(255);
        text("Press SPACE to play again\n Press ESCAPE to return to the home page", width / 2, height-40);
    }

    drawLevelComplete() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        image(this.assetManager.levelCompleteBackground, width/2, height/2, width, height);
        textAlign(CENTER, CENTER);

        // Volcano Era Survived (Left, Red with Black Stroke)
        textSize(30);
        fill(255, 50, 50); // Bright red
        stroke(0); 
        strokeWeight(3);
        text("🔥 Volcano Era Survived!", width / 2 - 200, 100);

        // Now, time for Ice Age (Right, Light Blue with White Stroke)
        fill(100, 200, 255); // Light blue
        stroke(255); 
        strokeWeight(3);
        text("❄️ Now, time for the Ice Age!", width / 2 + 200, 100);

        // Reset stroke
        strokeWeight(0);
    
        // Box dimensions and position
        let boxWidth = 600;
        let boxHeight = 100;
        let boxX = width / 2 - boxWidth / 2;
        let boxY = height - 80;
    
        // Draw semi-transparent background behind instructions
        fill(0, 0, 0, 180); // Darker transparency for better contrast
        noStroke();
        rect(boxX, boxY, boxWidth, boxHeight, 20); // Rounded edges
    
        // Draw instruction text (centered inside the box)
        textSize(30);
        fill(255);
        text("Press SPACE to start next level \n Press ESCAPE to return to the home page", width / 2, height-40);
        textSize(25);
    }

    drawEndGame() {
        image(this.assetManager.gameWon, width/2, height/2, width, height);
        textAlign(CENTER, CENTER);
        
        // "Extinction Averted!" Styled Text at the Top
        textSize(50);
        textFont("Courier New");

        // Glow Effect: Outer Stroke
        stroke(255, 223, 0); // Golden glow
        strokeWeight(3);
        noFill(); // Transparent fill
        text("Extinction Averted !!!", width / 2, 40);
        strokeWeight(0);
    
        // Box dimensions and position
        let boxWidth = 600;
        let boxHeight = 60;
        let boxX = width / 2 - boxWidth / 2;
        let boxY = height - 80;
    
        // Draw semi-transparent background behind instructions
        fill(0, 0, 0, 180); // Darker transparency for better contrast
        noStroke();
        rect(boxX, boxY, boxWidth, boxHeight, 20); // Rounded edges
    
        // Draw instruction text (centered inside the box)
        textSize(30);
        fill(255);
        textFont("Georgia");
        text("Press SPACE to return to the home page", width/2, height-50);
    }
}
