class Fire {
  
      static preload() {
        Fire.img = loadImage('src/assets/fire.png');
        Fire.gif = loadImage('src/assets/fire.gif');
      }
    
      constructor(positionX, positionY) {
        this.width = 70;
        this.height = 70;
    
        this.x = positionX;
        this.y = positionY;
    
        this.display();
        this.updateFire();
      }
    
      updateFire()
      {
        this.top = this.y - this.height / 2;
        this.bottom = this.y + this.height / 2;
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
      }
    
      display() {
        rectMode(CENTER);  // Draw the rectangle with the center point
        image(Fire.img, this.x, this.y, this.width, this.height);
      }
    }