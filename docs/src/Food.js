class Food {

  //static food_height = 20;
  //static food_width = 20;

    static preload() {
      Food.img = loadImage('src/assets/food.png');
    }
  
    constructor(positionX, positionY) {
      this.width = 20;
      this.height = 20;
  
      this.x = positionX;
      this.y = positionY;
  
      this.display();
      this.updateFood();
    }
  
    updateFood()
    {
      this.top = this.y - this.height / 2;
      this.bottom = this.y + this.height / 2;
      this.left = this.x - this.width / 2;
      this.right = this.x + this.width / 2;
    }
  
    display() {
      rectMode(CENTER);  // Draw the rectangle with the center point
      image(Food.img, this.x, this.y, this.width, this.height);
    }
  }