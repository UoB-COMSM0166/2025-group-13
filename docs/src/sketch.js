let game;

function preload() {
  game = new Game();
  game.preload();
}

function setup() {
  game.setup();
  imageMode(CENTER);//Haru: I am so sorry about that, such a pain in the ass now
}

function draw() {
  game.handleInput();
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
