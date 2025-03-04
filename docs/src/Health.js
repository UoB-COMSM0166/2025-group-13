class Health {
    static initialPercentage = 1;
    static reductionRate = 0.0004;
  
    constructor(assetManager) {
      this.assetManager = assetManager;
      // Initialize the health bar
      this.percentage = Health.initialPercentage;
      this.width = 5 * Brick.width;
      this.height = Brick.height/2;

      this.x = 40;
      this.y = 15;
    }
  
    updateHealth()
    {
      if(this.percentage>0){
        this.percentage = this.percentage - Health.reductionRate;
      }
    }
  
    display() {
      image(this.assetManager.img_heart, 20, 22, 30, 30);
      // Draw the rectangle with the top right corner point
      rectMode(CORNER);
      // A CSS named color.
      switch(game.currentMap)
      {
          case 0:
              fill('rgba(255, 165, 0, 0.2)'); // Orange with 80% transparency
              break;
          case 1:
              fill('rgba(0, 0, 255, 0.2)'); // Blue with 80% transparency
              break;
      }
      stroke('red');
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height, 2);
      fill('green');
      rect(this.x, this.y, this.percentage*this.width, this.height);
    }

    getHealth() {
      return this.percentage;
    }

    setHealth(percentage) {
      this.percentage = percentage;
    }

    /*updateReductionRate(newRate) { 
      Health.reductionRate = newRate;
    }*/
}