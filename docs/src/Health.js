class Health {

    static preload() {
      Health.img_heart = loadImage('src/assets/heart.png');
    }
  
    constructor() {
      this.width = 4 * Brick.width;
      this.height = Brick.height/3;

      this.x = 40;
      this.y = 15;

      this.percentage = 1;
      this.reductionRate = 0.0004;
  
      this.display();
      this.updateHealth();
    }
  
    updateHealth()
    {
      if(this.percentage>0){
        this.percentage = this.percentage - this.reductionRate;
      }
    }
  
    display() {
      image(Health.img_heart, 20, 20, 25, 25);
      // Draw the rectangle with the top right corner point
      rectMode(CORNER);
      // A CSS named color.
      stroke('red');
      strokeWeight(2);
      fill('orange')
      rect(this.x, this.y, this.width, this.height, 2);
      fill('green');
      rect(this.x, this.y, this.percentage*this.width, this.height);

    }
}