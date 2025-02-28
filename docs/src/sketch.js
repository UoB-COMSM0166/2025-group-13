// Description: This file is the main entry point for the game. It creates the game object and the screen object.
// It also handles the key events and the game loop.

// Global variable to track the current screen state.
let screenState = "homePage"; // gameScreen, pausePage, lossScreen, levelCompleteScreen, etc
//let screenState = "gameScreen";
// Global variable to maintain the screen and game objects
let screenGame;
let game;
// Global variable to track the current state of the game.
//let gameState = unstarted; // playing, levelComplete, died;

function preload() {
  screenGame = new GameScreen();
  game = new Game();
  game.preload();
}

function setup() {
  screenGame.setup();
  game.setup();
  imageMode(CENTER);//Haru: I am so sorry about that, such a pain in the ass now
}

function draw() {
  if (screenState === "homePage") {
    screenGame.drawHomeScreen();
  }
  else if(screenState === "gameScreen") {
    game.handleInput();
    game.update();
    game.draw();
  }
  else if(screenState === "pausePage") {
    screenGame.drawPauseGame();
  }
}

function keyPressed() {
  if((screenState === "homePage" || screenState === "pausePage") && key === ' ') {
    screenState = "gameScreen"
  }
  else if(screenState === "gameScreen" && keyCode === ESCAPE) {
    screenState = "pausePage";
  }
  //game.map.handleInput(true);
  //game.player.handleInput(true);
}

/*
function keyReleased() {
  game.map.handleInput(false);
  game.player.handleInput(false);
}
*/
