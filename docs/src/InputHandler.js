// Description: This file contains the InputHandler class that handles all the inputs from the user.
// It checks for keyboard inputs and button clicks. It also checks for touch events on mobile devices.

// Global variable to know if the device is touch enabled or not
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//let jumpReady = true;

class InputHandler {
    constructor() {
        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;
        this.escape = false;
        this.jumpReady = true;
    }

    setup() {
        /*if(isTouchDevice) {
            setupButtons();
        }*/
        this.setupButtons();
    }

    setupButtons() {
        // We will temporaly use mouse clicks to test
        /*
        // Left button
        document.getElementById('left-btn').addEventListener('click', () => {
            this.moveLeft = true;
            //console.log("Left button clicked!");
        });
        document.getElementById('left-btn').addEventListener('mouseup', () => {
            this.moveLeft = false;
         });
        //This was another approach using click events
        //document.getElementById('left-btn').addEventListener('mousedown', (e) => {
        //document.getElementById('jump-btn').addEventListener('clickend', (e) => {
        // Right button
       document.getElementById('right-btn').addEventListener('click', () => {
            this.moveRight = true;
            //console.log("Right button clicked!"); 
        });
        document.getElementById('right-btn').addEventListener('mouseup', () => {
            this.moveRight = false;
        });
        // Jump button
        document.getElementById('jump-btn').addEventListener('click', () => {
            if(jumpReady) {
                this.jump = true
                jumpReady = false;
                //console.log("Jump button clicked!");
            }
            else {
                this.jump = false;
            }
        });
        document.getElementById('jump-btn').addEventListener('mousedown', () => {
            this.jump = false;
            jumpReady = true;
        });
        */
        // For actual mobile touch events:
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
                //console.log("Jump button touched!");
                this.jumpReady = false;
                this.jump = true;
            }
            else {
                this.jump = false;
            }
        });  
        document.getElementById('jump-btn').addEventListener('pointerup', (e) => {
            e.preventDefault();
            //console.log("Jump button touch end!");
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
}
