class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    fill(100);
    rectMode(CENTER);  // Draw the rectangle with the center point
    rect(this.x, this.y, this.w, this.h);
  }
}
