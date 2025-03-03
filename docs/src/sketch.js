// Description: This file is the main entry point for the game. It creates the game object and the screen object.
// It also handles the key events and the game loop.

// Global variable to track the current state of the game.
let gameState = "homePage"; // gameScreen, pausePage, lossScreen, levelCompleteScreen, etc.
// Global variable to maintain the assetManager, screen and game objects
let assetManager;
let screenGame;
let game;
// Global variable to store the level of the game
let gameLevel = 1;
let maxLevels = 2;

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
}

function newGame() {
  game = new Game(gameLevel, assetManager);
  game.setup();
}

function draw() {
  if (gameState === "homePage") {
    screenGame.drawHomeScreen();
  }
  else if(gameState === "gameScreen") {
    game.handleInput();
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
}

function keyPressed() {
  if((gameState === "homePage" || gameState === "pausePage") && key === ' ') {
    gameState = "gameScreen"
  }
  else if(gameState === "gameScreen" && keyCode === ESCAPE) {
    gameState = "pausePage";
  }
  else if (((gameState === "gameOver" || gameState === "gameEnd") && key === ' ') || 
          (gameState === "levelComplete" && keyCode === ESCAPE)) {
    // Restart levels
    gameLevel = 1;
    newGame();
    gameState = "homePage";
  }
  else if (gameState === "levelComplete" && key === ' ') {
    newGame();
    gameState = "gameScreen";
  }
}
