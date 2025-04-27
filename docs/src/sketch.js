// Description: This file is the main entry point for the game. It creates the game object and the screen object.
// It also handles the key events and the game loop.

//#region: declaration of variables
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
// Manage sound
let hasPlayedGameOverSound = false;
let soundManager;

//#endregion

// Preload all assets using the assetManager
function preload() {
  assetManager = new AssetManager();
  assetManager.preload();
}

function setup() {
  soundManager = new SoundManager(assetManager);
  screenGame = new GameScreen(assetManager);
  screenGame.setup();
  newGame();
  imageMode(CENTER);
  inputHandler = new InputHandler();
  inputHandler.setup();
}

function newGame() {
  soundManager.stopAllBGM();
  hasPlayedGameOverSound = false;
  game = new Game(gameLevel, assetManager);
  game.setup();
    // auto play Exciting BGM
    soundManager.startGameBGM();

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
    // soundManager.startGameBGM();
    game.handleInput(triggerJump, moveLeft, moveRight);
    game.update();
    game.draw();
    if (game.isGameOver()) {
      if (!hasPlayedGameOverSound) {
        hasPlayedGameOverSound = true;
        soundManager.playGameOverMusic(game.currentMap);
      }
      gameState = "gameOver";
  }

    if(game.isLevelComplete()) {
      soundManager.playLevelCompleteMusic();
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
  else if((gameState === "gameInstructions" || gameState === "pausePage") && triggerJump) {
    gameState = "gameScreen";
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
    soundManager.resumeBGM();
  }
  else if(gameState === "gameScreen" && inputHandler.escape) {
    // console.log("Game Paused");
    gameState = "pausePage";
    soundManager.pauseBGM();
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
