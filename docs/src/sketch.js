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
  game.map.handleInput(true);
  game.player.handleInput(true);
}

function keyReleased() {
  game.map.handleInput(false);
  game.player.handleInput(false);
}
