/**
 * InputHandler class handles all the possible inputs from the user.
 * It checks for keyboard inputs and button touches for responsive/mobile devices.
 */

/**
 * Retrieves all buttons with the control-btn class
 */
const buttons = document.querySelectorAll('.control-btn');

class InputHandler {
    /**
     * Constructor initializes all the input attributes to false.
     */
    constructor() {
        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;
        this.escape = false;
        this.jumpReady = true;
        this.requestFS = false;
        this.fsReady = true;
    }

    /**
     * If the device is touchable, show and set up the buttons.
     */
    setup() {
        if(isTouchDevice) {
            this.showButtons(true);
            this.setupButtons();
        }
        else {
            this.showButtons(false);
        }
    }

    /**
     * Shows or hides buttons based on the device type
     */
    showButtons(visible) {
        buttons.forEach((button) => {
            if(visible) {
                button.classList.remove('hidden');
            }
            else {
                button.classList.add('hidden');
            }
        });
    }

    /**
     * Adds listeners for touch events for all buttons
     */
    setupButtons() {
        document.getElementById('left-btn').addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.moveLeft = true;
        });
        document.getElementById('left-btn').addEventListener('pointerup', (e) => {
            e.preventDefault();
            this.moveLeft = false;
        });
        document.getElementById('right-btn').addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.moveRight = true;
        });
        document.getElementById('right-btn').addEventListener('pointerup', (e) => {
            e.preventDefault();
            this.moveRight = false;
        });
        document.getElementById('jump-btn').addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if(this.jumpReady) {
                this.jumpReady = false;
                this.jump = true;
            }
            else {
                this.jump = false;
            }
        });  
        document.getElementById('jump-btn').addEventListener('pointerup', (e) => {
            e.preventDefault();
            this.jumpReady = true;
            this.jump = false;
        });
        document.getElementById('fs-btn').addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if(this.fsReady) {
                this.fsReady = false;
                this.requestFS = true;
            }
            else {
                this.requestFS = false;
            }
        });
        document.getElementById('fs-btn').addEventListener('pointerup', (e) => {
            e.preventDefault();
            this.fsReady = true;
            this.requestFS = false;
        });
    }

    /**
     * Sets up keyboard events for right and left arrow keys
     */
    keyPressed() {
        if(keyCode === RIGHT_ARROW || keyCode === 68) {
            this.moveRight = true;
        }
        else if(keyCode === LEFT_ARROW || keyCode === 65) {
            this.moveLeft = true;
        }
        // Set up jump preventing continuous jumps
        if(keyCode === UP_ARROW || keyCode === 87 || keyCode === 32) {
            if(this.jumpReady) {
                this.jumpReady = false;
                this.jump = true;
            }
            else {
                this.jump = false;
            }
        }
        if(keyCode === ESCAPE || keyCode === 81) {
            this.escape = true;
        }
    }

    /**
     * Unsets keyboard events for right and left arrow keys
     */
    keyReleased() {
        if (keyCode === RIGHT_ARROW || keyCode === 68) {
            this.moveRight = false;
        }
        if (keyCode === LEFT_ARROW || keyCode === 65) {
            this.moveLeft = false;
        }
        if(keyCode === UP_ARROW || keyCode === 87 || keyCode === 32) {
            this.jumpReady = true;
            this.jump = false;
        }
        if(keyCode === ESCAPE || keyCode === 81) {
            this.escape = false;
        }
    }
    
    //#region Getters and Setters
    /**
     * Resets the jump attribute to prevent multiple jumps unless
     * the user explicitly presses the jump button again.
     */
    getAndResetJump() {
        if(this.jump) {
          this.jump = false;
          return true;
        }
        return false;
    }

    /**
     * Getter for moveLeft attribute
     */
    getMoveLeft() {
        return this.moveLeft;
    }

    /**
     * Getter for moveRight attribute
     */
    getMoveRight() {
        return this.moveRight;
    }

    getAndResetFullScreenRequest() {
        if(this.requestFS) {
            this.requestFS = false;
            return true;
        }
        return false;
    }
    //#endregion
}
