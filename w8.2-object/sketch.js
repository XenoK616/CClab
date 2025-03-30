let boat1
let boat2

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  boat1 = new Boat(300,250,1);
  boat2 = new Boat(60,250,0.6);
}

function draw() {
  background(50,150,255);
  fill(50,100,255);
  noStroke();
  rect(0,250,800,250)

  boat1.update(1);
  boat1.display();
  boat2.update(0.5);
  boat2.display();
}

class Boat{
  constructor(startX,startY,sf){         //constructor function
    this.x = startX;
    this.y = startY;
    this.scaleFactor = sf;
  }

  update(speed){
    this.x += speed
  }

  display(){
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor)

    noStroke();
    
    fill(20, 40, 90)
    arc(0, -20, 150, 90, 0, PI);

    this.drawSail()
    
    fill('red')
    circle(0,0,5)
    pop();
  }

  drawSail(){
    push();
    translate(0, -50);
    fill(200, 120, 90)
    triangle(0, -30, 20, 0, 0, 30)

    fill("green");
    circle(0, 0, 5)
    pop();
  }
}