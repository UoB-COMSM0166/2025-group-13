let game;
let playerTexture, mapTexture;

function preload() {
  playerTexture = loadImage('./src/assets/player.png');
  // mapTexture = loadImage('assets/map.png');
  // platformTexture = loadImage('assets/platform.png');
}

function setup() {
  game = new Game();
  game.setup();
}

function draw() {
  game.handleInput();
  game.update();
  game.draw();
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
