// Class Screen handles the general configuration of the screen and draws them.
// Set the screen width and heigth
const MAX_SCREEN_WIDTH = 950;
const MAX_SCREEN_HEIGHT = 500;

let titleGlow = 0;
let glowDirection = 1;

class GameScreen {
    constructor(assetManager) {
        this.assetManager = assetManager;
    }

    setup() {
        // Get the canvas container element
        const canvasContainer = document.getElementById('canvas-container');
        let rect = canvasContainer.getBoundingClientRect();
        // Calculate canvas width and height: the minimum of your maximum size or the container's current width/height.
        //this.screenWidth = Math.min(MAX_SCREEN_WIDTH, rect.width * dpr); // container.offsetWidth, windowWidth, 
        //this.screenHeight = Math.min(MAX_SCREEN_HEIGHT, rect.height * dpr); // container.offsetHeight, windowHeight
        this.screenWidth = rect.width; // rect.width * dp 
        this.screenHeight = rect.height; // rect.height * dpr
        console.log("Screen Width: " + this.screenWidth);
        console.log("Screen Height: " + this.screenHeight);
        // Create the canvas with the calculated width and height
        let canvas = createCanvas(this.screenWidth, this.screenHeight);
        // Attach the canvas to the "canvas-container" div
        canvas.parent('canvas-container');
    }

    windowResized() {
        const canvasContainer = document.getElementById('canvas-container');
        let rect = canvasContainer.getBoundingClientRect();
        //let dpr = window.devicePixelRatio || 1; // Default to 1 if DPR is not available
        resizeCanvas(rect.width, rect.height);
    }

    drawHomeScreen() {
        imageMode(CENTER);
        image(this.assetManager.homePageBackground, width / 2, height / 2, width, height);

        textAlign(CENTER, CENTER);

        // Title text
        textFont('DinoEscapeMainPixelFont');
        textSize(24);
        stroke("black");
        strokeWeight(8);
        fill(255, 215, 0);
        text("Outrun the Apocalypse!", width / 4, 60);

        // Box dimensions and position
        let boxWidth = 350;
        let boxHeight = 60;
        let boxX = width / 2;
        let boxY = height - 130;


        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind "Press SPACE to Start" the SPACE text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX - 20, boxY + 32, 90, 30, 0);

            textSize(18);
            fill(255);
            text("Press SPACE to Start", width / 2, boxY + boxHeight / 2);
        }
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
        let boxX = width / 2;
        let boxY = 160;

        // Draw instruction text (centered inside the box)
        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind "Press SPACE to Start" the SPACE text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX - 20, boxY + 38, 90, 30, 0);

            textSize(18);
            fill(255);
            text("Press SPACE to Start", width / 2, boxY + boxHeight / 2);
        }
    }

    drawPauseGame() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //Transparency 2 is very low (close to transparent), the old image of each frame is not completely covered, resulting in a visual **"Press SPACE to resume" flickering very slowly**, because the previous frame is still visible.
        background(128, 128, 128, 2); // mid-tone grey very-transparent
        // background(128, 128, 128, 150);
        textAlign(CENTER, CENTER);
        textSize(50);
        fill('white');
        stroke('black');
        strokeWeight(2);
        text("Game Paused", width / 2, height / 2 - 40);

        // Box dimensions and position
        let boxWidth = 350;
        let boxHeight = 60;
        let boxX = width / 2;
        let boxY = height - 130;

        // fill(0, 0, 0, 180);
        // noStroke();
        // rect(boxX-72, boxY+18, 90, 30, 0);

        textSize(18);
        fill(255);
        text("Press SPACE to resume", width / 2, boxY + boxHeight / 2);
        // // **Let the text flash every 60 frames (about 1 second)**
        // if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
        //     // Draw semi-transparent background behind "Press SPACE to Start" the SPACE text
        //     fill(0, 0, 0, 180);
        //     noStroke();
        //     rect(boxX-70, boxY+18, 90, 30, 0);

        //     textSize(18);
        //     fill(255);
        //     text("Press SPACE to resume", width / 2, boxY + boxHeight / 2);
        // }
    }

    drawGameOver() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        switch (game.currentMap) {
            case 0:
                image(this.assetManager.gameOverBackground, width / 2, height / 2, width, height);
                break;
            case 1:
                image(this.assetManager.gameOverByIce, width / 2, height / 2, width, height);
                break;
        }

        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0);
        stroke('white');
        strokeWeight(2);
        //text("Game Over", width / 2, height / 2 - 40);
        textSize(20);

        // Box dimensions and position
        let boxWidth = 450;
        let boxHeight = 60;
        let boxX = width / 2 - boxWidth / 2;
        let boxY = height - 60;

        // Draw instruction text (centered inside the box)
        // textSize(25);
        // fill(255);
        // text("Press SPACE to play again\n Press ESCAPE for home page", width / 2, height - 30);

        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind KEY text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX + 96, boxY + 16, 150, 30, 0);
            rect(boxX + 133, boxY - 22, 80, 30, 0);

            textFont('DinoEscapeMainPixelFont');
            stroke("black");
            strokeWeight(3);
            textSize(18);
            fill(255);
            text("Press SPACE to play again", width / 2, height - 70);
            text("Press ESCAPE / Q for home page", width / 2, height - 30);

        }
    }

    drawLevelComplete() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        image(this.assetManager.levelCompleteBackground, width / 2, height / 2, width, height);
        textAlign(CENTER, CENTER);

        // Volcano Era Survived (Left, Red with Black Stroke)
        textSize(30);
        fill(255, 50, 50); // Bright red
        stroke(0);
        strokeWeight(5);
        text("🔥 Volcano Era Survived!", width / 2 - 100, 50);

        // Now, time for Ice Age (Right, Light Blue with White Stroke)
        fill(100, 200, 255); // Light blue
        stroke(255);
        strokeWeight(5);
        text("❄️ Now, time for the Ice Age!", width / 2 + 100, 100);

        // Reset stroke
        strokeWeight(0);

        // Box dimensions and position
        let boxWidth = 600;
        let boxHeight = 100;
        let boxX = width / 2 - boxWidth / 2;
        let boxY = height - 80;

        // Draw instruction text (centered inside the box)
        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind KEY text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX + 168, boxY - 2, 80, 30, 0);
            rect(boxX + 172, boxY + 38, 150, 30, 0);

            textFont('DinoEscapeMainPixelFont');
            stroke("black");
            strokeWeight(3);
            textSize(18);
            fill(255);
            text("Press SPACE to start next level", width / 2, height - 70);
            text("Press ESCAPE / Q for home page", width / 2, height - 30);

        }
    }

    drawEndGame() {
        image(this.assetManager.gameWon, width / 2, height / 2, width, height);
        textAlign(CENTER, CENTER);

        // "Extinction Averted!" Styled Text at the Top
        textSize(50);
        textFont("DinoEscapeMainPixelFont");

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

        // Draw instruction text (centered inside the box)
        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind KEY text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX + 168, boxY - 2, 80, 30, 0);

            textFont('DinoEscapeMainPixelFont');
            stroke("black");
            strokeWeight(3);
            textSize(18);
            fill(255);
            text("Press SPACE for home page", width / 2, height - 70);

        }
    }
}
