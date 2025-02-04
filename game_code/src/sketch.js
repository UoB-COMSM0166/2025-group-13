// Default -> small circle
let shape = 0;
 
function setup() {
  createCanvas(600, 600);
  background(00,200,200);
  rect(10,10,580);
  fill(250,250,250);
  textSize(10);
  fill(100);
  text("press s for square, c for circle, t for triangle\n Click rigth for eraser",30,30)
}
 
function draw() {
  if(mouseIsPressed){
    noStroke();  // Don't know purpose
    if(mouseButton === LEFT)
    {
      fill(random(0,250),random(0,255),random(100,255));
      if(shape === 1){
        // Paint with a circle
        triangle(mouseX, mouseY, mouseX+random(5,15), mouseY, mouseX, mouseY+random(5,15)); 
      }
      else if(shape === 2)
      {
        square(mouseX, mouseY, random(5,15), 0);
      }
      else if(shape === 3)
      {
        circle(mouseX, mouseY, random(5,15));
      }
      else{
        circle(mouseX, mouseY, 5);
      }  
    }
    else
    {
      fill(255);
      square(mouseX, mouseY, 50, 40);
    }

  }
}
 
function keyPressed() {
    // Paint with a square
  if (key === 't') {
      print("t is pressed");
      shape = 1;
  }else if (key === 's') {
      print("s is pressed");
      shape = 2;
    } else if(key === 'c'){
      shape = 3;
    } 
}