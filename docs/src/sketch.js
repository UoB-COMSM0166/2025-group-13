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
  else if (gameState === "gameInstructions") {
    screenGame.drawInstructions();
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
  if(gameState === "homePage" && key === ' ') {
    gameState = "gameInstructions";
  }
  else if((gameState === "gameInstructions" || gameState === "pausePage") && key === ' ') {
    // console.log("Resuming game...");
    gameState = "gameScreen";
  }
  else if(gameState === "gameScreen" && (keyCode === ESCAPE || keyCode === 81)) {
    // console.log("Game Paused");
    gameState = "pausePage";
  }
  else if(gameState === "gameOver" && key === ' ') {
    // Restart from actual level
    newGame();
    gameState = "gameScreen";
  }
  else if((gameState === "gameScreen" || gameState === "gameInstructions") && (key === ' ' || key === 'W' || key === 'w' || key === "ArrowUp")){
    game.playerJump();
  }
  else if ((gameState === "gameEnd" && key === ' ') ||
          ((gameState === "gameOver" || gameState === "levelComplete") && (keyCode === ESCAPE || keyCode === 81))) {
    // Restart from first level
    gameLevel = 1;
    newGame();
    gameState = "homePage";
  }
  else if (gameState === "levelComplete" && key === ' ') {
    newGame();
    gameState = "gameScreen";
  }
}
