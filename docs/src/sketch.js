let game;

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
