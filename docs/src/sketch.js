
let gameState = "start"; // start/playing/win
let player;
let platforms = [];
let flag;
let unlockedDinos = ['Raptor'];

function setup() {
  createCanvas(800, 450);
  initLevel();
  player = new Dino(unlockedDinos[0]);
}

function draw() {
  background(220);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    runGame();
  } else {
    drawWinScreen();
  }
}

// 核心游戏逻辑
function runGame() {
  // 绘制所有平台
  platforms.forEach(p => {
    fill(100);
    rect(p.x, p.y, p.w, p.h);
    fill(150);
    rect(p.x, p.y, p.w, 2); // 平台顶部高亮
  });

  // 绘制过关旗帜
  fill(0, 200, 200);
  rect(flag.x, flag.y, 40, 50);

  // 玩家更新
  player.update();
  player.display();

  // 过关检测
  if (player.checkFlagCollision(flag)) {
    unlockNewDino();
    gameState = "win";
  }

  // 显示游戏信息
  fill(0);
  text(`当前恐龙: ${player.type}`, 20, 30);
  text(`已解锁: ${unlockedDinos.join(', ')}`, 20, 50);
}

// 恐龙类（精简版）
class Dino {
  constructor(type) {
    this.type = type;
    this.speed = type === 'Raptor' ? 3 : 2.5;
    this.jumpPower = 10;
    this.size = {w:30, h:40};
    this.pos = {x:50, y:0};
    this.vel = {x:0, y:0};
    this.onGround = false;
  }

  update() {
    // 重力模拟
    this.vel.y += 0.5;
    this.pos.y += this.vel.y;

    // 左右移动
    this.vel.x = (keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW)) * this.speed;
    this.pos.x += this.vel.x;

    // 平台碰撞检测
    this.checkPlatformCollision();

    // 边界限制
    this.pos.x = constrain(this.pos.x, 0, width - this.size.w);
    this.pos.y = constrain(this.pos.y, -100, height - this.size.h);
  }

  checkPlatformCollision() {
    this.onGround = false;

    platforms.forEach(p => {
      // 精确碰撞检测
      const nextY = this.pos.y + this.size.h + this.vel.y;
      if (this.vel.y > 0 &&
          this.pos.x + this.size.w > p.x &&
          this.pos.x < p.x + p.w &&
          this.pos.y + this.size.h <= p.y &&
          nextY >= p.y)
      {
        this.pos.y = p.y - this.size.h;
        this.vel.y = 0;
        this.onGround = true;
      }
    });

    // 地面检测
    if (this.pos.y + this.size.h >= height) {
      this.pos.y = height - this.size.h;
      this.vel.y = 0;
      this.onGround = true;
    }
  }

  jump() {
    if (this.onGround) {
      this.vel.y = -this.jumpPower;
      this.onGround = false;
    }
  }

  display() {
    fill(this.type === 'Raptor' ? '#6B8E23' : '#CD5C5C');
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
  }

  checkFlagCollision(flag) {
    return (
      this.pos.x + this.size.w > flag.x &&
      this.pos.x < flag.x + 40 &&
      this.pos.y + this.size.h > flag.y &&
      this.pos.y < flag.y + 50
    );
  }
}

// 初始化关卡
function initLevel() {
  platforms = [
    {x:0, y:400, w:800, h:20},  // 地面
    {x:200, y:300, w:100, h:15},
    {x:400, y:250, w:80, h:15},
    {x:600, y:320, w:120, h:15},
    {x:150, y:200, w:80, h:15},  // 新增平台
    {x:350, y:150, w:100, h:15}  // 高空平台
  ];
  flag = {x:750, y:350};
}

// 解锁新恐龙
function unlockNewDino() {
  if (!unlockedDinos.includes('TRex')) {
    unlockedDinos.push('TRex');
  }
}

// 界面绘制
function drawStartScreen() {
  background('skyblue');

  textAlign(CENTER);
  textSize(128);
  stroke(0);
  strokeWeight(4);
  // fill(red);
  fill('black');
  text("DINO", width/2, height/2-50);
   //  textSize(16);
   // strokeWeight(2);
   //  text("RUN ADVENTURE", width/2, height/2-30);


  textSize(16);
  textSize(150);
  text('🦖',width/2, height/2+10);
  describe('A Dinasour in a blue sky.');

  textSize(20);
  strokeWeight(0.1);
  fill('black');
  text("In the moment when the asteroid streaks across the sky \n you \n as the last Velociraptor \n embark on a breathtaking journey...", width/2, height/2+40);

  fill('grey');
  text("PRESS ANY KEY TO START GAME", width/2, height/2+150);
}

function drawWinScreen() {
  background(144, 238, 144);
  textAlign(CENTER);

  textSize(36);
  fill(0);
  text("🎉 New dinasour unlocked!", width/2, 180);

  textSize(24);
  text("New you can control：", width/2, 240);
  text(unlockedDinos.join(' and '), width/2, 280);

  textSize(20);
  fill(255, 0, 0);
  text("按R重新开始", width/2, 350);
}

// 输入处理
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
  }

  if (key === ' ') {
    player.jump();
  }

  if (key === 'r' || key === 'R') {
    resetGame();
  }

  // 切换恐龙（仅限已解锁）
  if (key === '1' && unlockedDinos.includes('Raptor')) {
    player = new Dino('Raptor');
  }
  if (key === '2' && unlockedDinos.includes('TRex')) {
    player = new Dino('TRex');
  }
}

function resetGame() {
  gameState = "playing";
  initLevel();
  player = new Dino(unlockedDinos[0]);
}
