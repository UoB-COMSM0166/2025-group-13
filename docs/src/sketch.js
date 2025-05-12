/**
 * This file is the main entry point for the game. It creates the main game and screen objects.
 * It also handles the key events and the game loop.
 */

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
let maxLevels = 3;
// Global variables to store the triggers of actions that changes screens
let triggerJump = false;
let triggerESC = false;
// Manage sound
let hasPlayedGameOverSound = false;
let soundManager;
// Global variable to store if the device is touch enabled or not
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
//Scaling factors
let scaleX = 1;
let scaleY = 1;
//#endregion

/**
 * Preloads all graphic assets using the assetManager
 */
function preload() {
  assetManager = new AssetManager();
  assetManager.preload();
}

/**
 * Setups the supporting features to make the game playable.
 * Sets the game the by initialising SoundManger, GameScreen and InputHandler.
 */
function setup() {
  // Set the pixel density to 1 to avoid scaling issues
  pixelDensity(1);
  soundManager = new SoundManager(assetManager);
  screenGame = new GameScreen(assetManager);
  screenGame.setup();
  updateScalingFactors();
  newGame();
  imageMode(CENTER);
  inputHandler = new InputHandler();
  inputHandler.setup();
  Brick.setup();
}

/**
 * Starts a new game session in the beginning. The session remains active
 * until the user has quit or closed the browser window of the game.
 */
function newGame() {
  soundManager.stopAllBGM();
  hasPlayedGameOverSound = false;
  game = new Game(gameLevel, assetManager);
  game.setup();
    // auto play Exciting BGM
    soundManager.startGameBGM();
}

/**
 * Draws the game screen based on current game state. Game state can be either of :
 * { homePage, gameInstructions, gameScreen, gameOver, levelComplete, gameEnd, pausePage, gameOver}.
 * Game state changes based on user interaction.
 */
function draw() {
  // Start by getting (and resetting) all inputs
  triggerJump = inputHandler.getAndResetJump();
  moveRight = inputHandler.getMoveRight();
  moveLeft = inputHandler.getMoveLeft();
  requestFullScreen = inputHandler.getAndResetFullScreenRequest();
  resumePause = inputHandler.getAndResetPause();
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
  else {
    screenGame.drawEndGame();
  }
  // Check if the user wants to go or exit full screen
  if(requestFullScreen) {
    screenGame.handleFullScreenRequest();
  }
  // Check if we need to change the screen
  changeScreen();
}

/**
 * Changes the contents of the screen based on current game state and user input.
 */
function changeScreen() {
  if(gameState === "homePage" && triggerJump) {
    userStartAudio();
    gameState = "gameInstructions";
    soundManager.startGameBGM();
  }
  else if(gameState === "gameInstructions" && triggerJump) {
    gameState = "gameScreen";
  }
  else if(gameState === "gameScreen" && (inputHandler.escape || resumePause)) {
    gameState = "pausePage";
    soundManager.pauseBGM();
  }
  else if(gameState === "pausePage" && (triggerJump || resumePause)) {
    gameState = "gameScreen";
    soundManager.resumeBGM();
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

/**
 * Redirects the key pressed callback to keyPressed method of InputHandler
 */
function keyPressed() {
  inputHandler.keyPressed();
}

/**
 * Redirects the key released callback to keyReleased method of InputHandler
 */
function keyReleased() {
  inputHandler.keyReleased();
}

/**
 * Redirects the windowResized callback to windowResized method of GameScreen
 */
function windowResized() {
  console.log("Window resized -> calling from sketch.js");
  screenGame.windowResized();
}

function updateScalingFactors(){
  scaleX = width/850;
  scaleY = height/500;
}
