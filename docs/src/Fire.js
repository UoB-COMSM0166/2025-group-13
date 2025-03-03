class Fire {    
      constructor(positionX, positionY, assetManager) {
        this.assetManager = assetManager;
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
        switch(game.currentMap){
          case 0:
            image(this.assetManager.fireImg, this.x, this.y, this.width, this.height);
            break;
          case 1:
            image(this.assetManager.iceSpikeImg, this.x, this.y, this.width, this.height);
            break;
        }
      }
    }