// Global variable to track the current screen/state.
//let screenState = "homePage"; // pageScreen, lossScreen, levelCompleteScreen
let screenState = "pageScreen";
let game;
// Global variable to track the current state of the game.
//let gameState = unstarted; // playing, levelComplete, died;

function setup() {
  screenSetup();
  game = new Game();
  game.setup();
}

function draw() {
  if (screenState === "homePage") {
    drawHomeScreen();
  }
  else if(screenState === "pageScreen") {
    game.handleInput();
    game.update();
    game.draw();
  }
}

function screenSetup() {
  createCanvas(600, 400);
  background(10);
}

function drawHomeScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Welcome to the Game!", width / 2, height / 2 - 40);
  textSize(20);
  text("Click to Start", width / 2, height / 2);
}
/*
function keyPressed() {
  game.map.handleInput(true);
  game.player.handleInput(true);
}

function keyReleased() {
  game.map.handleInput(false);
  game.player.handleInput(false);
}
 */
