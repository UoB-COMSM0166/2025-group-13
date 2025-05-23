/**
 * GameScreen class handles the general configuration of the screen (contained in a canvas).
 * It also draws each game screen (home, instructions, pause, etc).
*/

// Set the base screen width and heigth
const baseWidth = 850;
const baseHeight = 500;
let screenWidth;
let screenHeight;
let scaleFactorX;
let scaleFactorY;
// Get the canvas container element
const canvasContainer = document.getElementById('canvas-container');
let titleGlow = 0;
let glowDirection = 1;
// Get and set full screen states
const requestFS = canvasContainer.requestFullscreen 
                || canvasContainer.webkitRequestFullscreen    /* Safari/iOS */
                || canvasContainer.msRequestFullscreen        /* IE11 */ 
                || canvasContainer.mozRequestFullScreen;      /* Firefox */
const exitFS = document.exitFullscreen
            || document.webkitExitFullscreen
            || document.msExitFullscreen
            || document.mozCancelFullScreen;
let isFullScreen = false;
const canLock = 'orientation' in screen && typeof screen.orientation.lock === 'function';

class GameScreen {
    /**
     * Constructor sets the assestManager attribute.
     * @param assetManager - Input asset manager reference.
     */
    constructor(assetManager) {
        this.assetManager = assetManager;
    }

    updateScreenSize(){
        let canvasRect = canvasContainer.getBoundingClientRect();
        screenWidth = canvasRect.width; // rect.width * dp
        screenHeight = canvasRect.height; // rect.height * dpr
        updateScalingFactors();
    }

    /**
     * Sets up the initial canvas dimensions and resizes the window
     */
    setup() {
        this.updateScreenSize();
        // Create the canvas with the calculated width and height
        const canvas = createCanvas(screenWidth, screenHeight);
        // CanvasSettings object's will read frequently, the user agent may optimize the canvas for readback operations.
        // Pull off the underlying <canvas> element
        const elt = canvas.elt;
        // Replace its drawingContext with a new one that has willReadFrequently
        const ctx = elt.getContext('2d', { willReadFrequently: true });
        canvas.drawingContext = ctx;
        // Attach the canvas to the "canvas-container" div
        canvas.parent('canvas-container');
        // Resize screen and scale the canvas based on the scale factors
        this.windowResized();
        // Add event listeners for full-screen changes
        this.fullScreenChange();
    }

    /**
     * Updates the scale factors for width and height of the canvas
     */
    updateScaleFactors() {
        scaleFactorX = screenWidth / baseWidth;
        scaleFactorY = screenHeight / baseHeight;
    }

    /**
     * Scales the canvas dimensions according to the scale factors
     */
    scaleCanvas() {
        this.updateScaleFactors();
        // Scale the canvas based on the scale factors
        scale(scaleFactorX, scaleFactorY);
        // Set the origin to the top-left corner of the canvas
        translate(-width / 2, -height / 2);
    }

    /**
     * Resizes the game window according to canvas dimensions
     */
    windowResized() {
        this.updateScreenSize();
        if(window.matchMedia("(orientation: portrait)").matches){
            screenHeight = screenWidth / 1.7;
        } else if(window.matchMedia("(orientation: landscape)").matches){
            screenWidth = screenHeight * 1.7;
        }
        // Set the canvas size to match the container size
        resizeCanvas(screenWidth, screenHeight);
        // Scale the canvas based on the new width and height
        this.scaleCanvas();
    }

    fullScreenChange() {
        // Listen for all variants of fullscreen change
        ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange']
        .forEach(evt => document.addEventListener(evt, () => {
            isFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement
                        || document.mozFullScreenElement || document.msFullscreenElement); // true if now in full-screen
            if(canLock) {
                try {
                    // Lock to any landscape orientation
                    screen.orientation.lock('landscape'); 
                } catch (err) {
                }
            }
            canvasContainer.classList.toggle('fullscreen', isFullScreen);
            // Recalculate and resize the p5 canvas
            this.windowResized();
            //Call sketch.js setup to reset the game
            setup();
        }));
    }

    handleFullScreenRequest() {
        if(!isFullScreen) {
            this.goFullScreen().then(() => {this.windowResized();}).catch(console.warn);
        }
        else {
            this.exitFullScreen().then(() => {this.windowResized();}).catch(console.warn);
        }
    }

    async goFullScreen() {
        // Request full screen for the container element
        if (!requestFS) return Promise.reject('Fullscreen not supported');
        // Note: requestFullscreen() returns a promise in modern browsers :contentReference[oaicite:0]{index=0}
        return requestFS.call(canvasContainer);
    }

    async exitFullScreen() {
        // Exit full screen
        if (!exitFS) return Promise.reject('Fullscreen not supported');
        return exitFS.call(document);
    }

    //#region Draw Methods
    /**
     * Draws the home screen of the game with engaging graphics.
     */
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

        // Box dimensions and position
        let boxWidth = 350;
        let boxHeight = 60;
        let boxX = width / 2;
        let boxY = height - 130;


        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind "Press ⬆ to Start" the SPACE text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX - 29, boxY + 17, 20, 30, 0);

            textSize(18);
            fill(255);
            text("Press ⬆ to Start", width / 2, boxY + boxHeight / 2);
        }
    }

    /**
     * Draws the game instruction on the screen
     */
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
            // Draw semi-transparent background behind "Press ⬆ to Start" the SPACE text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX - 29, boxY + 21, 20, 30, 0);

            textSize(18);
            fill(255);
            text("Press ⬆ to Start", width / 2, boxY + boxHeight / 2);
        }
    }

    /**
     * Draws the paused game screen.
     */
    drawPauseGame() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //Transparency 2 is very low (close to transparent), the old image of each frame is not completely covered, resulting in a visual **"Press ⬆ to resume" flickering very slowly**, because the previous frame is still visible.
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
        text("Press ⬆ to resume", width / 2, boxY + boxHeight / 2);
        // Text flash every 20 frames (about 2 second)
        if (frameCount % 30 < 15) { // Display the first 15 frames per second, and hide the last 15 frames
            // Draw semi-transparent background behind "Press ⬆ to Start" the SPACE text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX-36, boxY+18, 20, 30, 0);

            textSize(18);
            fill(255);
            text("Press ⬆ to resume", width / 2, boxY + boxHeight / 2);
        }
    }

    /**
     * Draws the game over screen shown when player loses.
     */
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
            case 2:
                image(this.assetManager.gameOverByDesert, width / 2, height / 2, width, height);
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
        // text("Press ⬆ to play again\n Press ESCAPE for home page", width / 2, height - 30);

        // **Let the text flash every 60 frames (about 1 second)**
        if (frameCount % 60 < 30) { // Display the first 30 frames per second, and hide the last 30 frames
            // Draw semi-transparent background behind KEY text
            fill(0, 0, 0, 180);
            noStroke();
            rect(boxX + 162, boxY - 22, 20, 30, 0);
            rect(boxX + 125, boxY + 16, 100, 30, 0);

            textFont('DinoEscapeMainPixelFont');
            stroke("black");
            strokeWeight(3);
            textSize(18);
            fill(255);
            text("Press ⬆ to play again", width / 2, height - 70);
            text("Press ESCAPE for home page", width / 2, height - 30);

        }
    }

    /**
     * Draws the level complete screen shown after a level is completed.
     */
    drawLevelComplete() {
        // 0.01 opacity -> 0.01 * 255 ≈ 2
        //background(128, 128, 128, 200); // mid-tone grey semi-transparent
        // image(this.assetManager.levelCompleteBackground, width / 2, height / 2, width, height);
        textAlign(CENTER, CENTER);


        // Volcano Era Survived (Left, Red with Black Stroke)
        textSize(28);
        strokeWeight(2);
        switch (game.currentMap) {
            case 0:
                image(this.assetManager.level1CompleteBackground, width / 2, height / 2, width, height);
                textSize(30);
                fill(255, 50, 50); // Bright red
                stroke(0);
                text("Volcano Era Survived!", width / 2 - 100, 50);
                break;
            case 1:
                image(this.assetManager.level2CompleteBackground, width / 2, height / 2, width, height);
                fill(100, 200, 255); // Light blue
                stroke(255);
                text("❄️ Ice Age Survived!", width / 2 - 100, 50);
                break;
        }

        switch (game.currentMap) {
            case 0:
                fill(100, 200, 255); // Light blue
                stroke(255);
                text("❄️ Now, time for the Ice Age!", width / 2 + 100, 100);
                break;
            case 1:
                fill('#A35E37');
                stroke('#401E24');
                strokeWeight(5);
                text("Now run, run, run!", width / 2 + 100, 100);
                break;
        }
        // text("❄️ Now, time for the Ice Age!", width / 2 + 100, 100);

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
            rect(boxX + 200, boxY - 2, 20, 30, 0);
            rect(boxX + 195, boxY + 38, 100, 30, 0);

            textFont('DinoEscapeMainPixelFont');
            stroke("black");
            strokeWeight(3);
            textSize(18);
            fill(255);
            text("Press ⬆ to start next level", width / 2, height - 70);
            text("Press ESCAPE for home page", width / 2, height - 30);

        }
    }

    /**
     * Draws the game end screen which is shown when user completes all the levels successfully.
     */
    drawEndGame() {
        image(this.assetManager.gameWon, width / 2, height / 2, width, height);
        textAlign(CENTER, CENTER);

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
            rect(boxX + 236, boxY - 2, 20, 30, 0);

            textFont('DinoEscapeMainPixelFont');
            stroke("black");
            strokeWeight(3);
            textSize(18);
            fill(255);
            text("Press ⬆ for home page", width / 2, height - 70);

        }
    }
    //#endregion Draw Methods
}
