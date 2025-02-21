let game;

function preload() {
  game = new Game();
  game.preload();
}

function setup() {
  game.setup();
  imageMode(CENTER);
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
