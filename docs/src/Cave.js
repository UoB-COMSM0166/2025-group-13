class Cave {
  static caveHeight = 120;
      static preload() {
        Cave.img = loadImage('src/assets/cave.png');
      }
    
      constructor(positionX, positionY) {
        this.width = 120;
        this.height = Cave.caveHeight;
    
        this.x = positionX;
        this.y = positionY;
    
        this.display();
        this.updateCave();
      }
    
      updateCave()
      {
        this.top = this.y - this.height / 2;
        this.bottom = this.y + this.height / 2;
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
      }
    
      display() {
        rectMode(CENTER);  // Draw the rectangle with the center point
        image(Cave.img, this.x, this.y, this.width, this.height);
      }
    }