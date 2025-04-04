// Description: This file is the main entry point for the game. It creates the game object and the screen object.
// It also handles the key events and the game loop.

// Global variable to track the current state of the game.
let gameState = "homePage"; // gameScreen, pausePage, lossScreen, levelCompleteScreen, etc.
// Global variable to maintain the assetManager, screen, game and input handler objects
let assetManager;
let screenGame;
let game;
let inputHandler;
// Global variable to store the level of the game
let gameLevel = 1;
let maxLevels = 2;
// Global variables to store the triggers of actions that changes screens
let triggerJump = false;
let triggerESC = false;

// Preload all assets using the assetManager
function preload() {
  assetManager = new AssetManager();
  assetManager.preload();
}

function setup() {
  screenGame = new GameScreen(assetManager);
  screenGame.setup();
  newGame();
  imageMode(CENTER);//Haru: I am so sorry about that, such a pain in the ass now
  inputHandler = new InputHandler();
  inputHandler.setup();
}

function newGame() {
  game = new Game(gameLevel, assetManager);
  game.setup();
}

function draw() {
  // Start by reseting all inputs to false (maybe this is not the best approach)
  triggerJump = inputHandler.getAndResetJump();
  moveRight = inputHandler.getMoveRight();
  moveLeft = inputHandler.getMoveLeft();
  // Check the game state and draw the corresponding screen
  if (gameState === "homePage") {
    screenGame.drawHomeScreen();
  }
  else if (gameState === "gameInstructions") {
    screenGame.drawInstructions();
  }
  else if(gameState === "gameScreen") {
    game.handleInput(triggerJump, moveLeft, moveRight);
    game.update();
    game.draw();
    if(game.isGameOver()) gameState = "gameOver";
    if(game.isLevelComplete()) {
      if(gameLevel < maxLevels) {
        gameLevel++;
        gameState = "levelComplete";
      }
      else {
        gameState = "gameEnd";
      }
    }
  }
  else if(gameState === "pausePage") {
    screenGame.drawPauseGame();
  }
  else if(gameState === "gameOver") {
    screenGame.drawGameOver();
  }
  else if(gameState === "levelComplete") {
    screenGame.drawLevelComplete();
  }
  else screenGame.drawEndGame();
  
  // Check if we need to change the screen
  changeScreen();
}

function changeScreen() {
  if(gameState === "homePage" && triggerJump) {
    gameState = "gameInstructions";
  }
  else if((gameState === "gameInstructions" || gameState === "pausePage") && triggerJump) {
    // console.log("Resuming game...");
    gameState = "gameScreen";
  }
  else if(gameState === "gameScreen" && inputHandler.escape) {
    // console.log("Game Paused");
    gameState = "pausePage";
  }
  else if(gameState === "gameOver" && triggerJump) {
    // Restart from actual level
    newGame();
    gameState = "gameScreen";
  }
  else if ((gameState === "gameEnd" && triggerJump) ||
          ((gameState === "gameOver" || gameState === "levelComplete") && inputHandler.escape)) {
    // Restart from first level
    gameLevel = 1;
    newGame();
    gameState = "homePage";
  }
  else if (gameState === "levelComplete" && triggerJump) {
    newGame();
    gameState = "gameScreen";
  }
}

function keyPressed() {
  inputHandler.keyPressed();
}

function keyReleased() {
  inputHandler.keyReleased();
}

function windowResized() {
  screenGame.windowResized();
}
