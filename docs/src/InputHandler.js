class InputHandler {
    nextScreen;
    moveLeft;
    moveRight;
    jump;
    pause;
    
    init() {
        this.nextScreen = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;
        this.pause = false;
    }

    // TODO: Idially, this method should only call keyboard or buttons depending on the device
    update() {
        this.checkKeyboard();
        this.checkButtons();
        // Reset all the inputs
        this.init();
    }
    
    checkKeyboard() {
        window.addEventListener('keydown', (e) => {
            this.nextScreen = true;
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                this.moveRight = true;
            }
            else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                this.moveLeft = true;
            }
            if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) {
                this.jump = true;
                this.pause = false;
            }
            else if (e.keyCode === ESCAPE || e.keyCode === 81) {
                this.pause = true;
                //console.log("ESCAPE key pressed!");
            }
        });
    }
    
    checkButtons() {
        document.getElementById('left-btn').addEventListener('click', (e) => {
            this.moveLeft = true
            console.log("Left button clicked!");
        });
        document.getElementById('right-btn').addEventListener('click', (e) => {
            this.moveRight = true
            console.log("Right button clicked!");
        });
        document.getElementById('jump-btn').addEventListener('click', (e) => {
            this.jump = true
            console.log("Jump button clicked!");
        });
        
        // For mobile touch events:
        document.getElementById('left-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveLeft = true;
        });
        document.getElementById('right-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveRight = true;
        });
        document.getElementById('jump-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump = true;
        });
    }
}