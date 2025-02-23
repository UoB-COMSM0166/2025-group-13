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
  game.update();
  game.draw();
}

function keyPressed() {
  game.player.handleInput(true);
}

function keyReleased() {
  game.player.handleInput(false);
}
