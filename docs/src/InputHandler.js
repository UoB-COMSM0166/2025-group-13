// InputHandler class handles all the possible inputs from the user.
// It checks for keyboard inputs and button touches for responsive/mobile devices.

// Grab all buttons with the control-btn class
const buttons = document.querySelectorAll('.control-btn');

class InputHandler {
    constructor() {
        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;
        this.escape = false;
        this.jumpReady = true;
    }

    setup() {
        // If the device is touchable, show and setup the buttons
        if(isTouchDevice) {
            this.showButtons(true);
            this.setupButtons();
        }
        else {
            this.showButtons(false);
        }
    }

    // Show or hide buttons based on the device type
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

    // Add listeners for touch events for all buttons
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
    }

    keyPressed() {
        // Set up keyboard events for rigth and left arrow keys
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
    getAndResetJump() {
        if (this.jump) {
          this.jump = false;
          return true;
        }
        return false;
    }

    getMoveLeft() {
        return this.moveLeft;
    }

    getMoveRight() {
        return this.moveRight;
    }
    //#endregion
}
