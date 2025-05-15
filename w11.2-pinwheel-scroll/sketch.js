function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  p = new Pinwheel(width/2,height/2);
}

function draw() {
  background(250,150,120);

  let alreadyScrolled = document.getElementById("scrollContainer").scrollTop;
  let entireScrollSpace = document.getElementById("scrollBox").scrollHeight - height;
  let scrollPercentage = alreadyScrolled/entireScrollSpace;

  p.update();
  p.display();
  p.angle = map (scrollPercentage, 0,1,0,360)
  
}

class Pinwheel{
  constructor (startX,startY){
    this.x = startX;
    this.y = startY;
    this.angle = 1;
    this.scale = 1;
    this.radius = 100;
    // this.dist = dist(mouseX,mouseY,this.x,this.y);
  }
  update(){
    this.angle += 1
    // this.scale = 200/(dist(mouseX,mouseY,this.x,this.y)+10)
  }
  drawSingleWing(){
    fill(50,190,120)
    triangle(0,0, 0,-this.radius/2, this.radius/2,-this.radius/2)
    fill(220,190,20)
    triangle(0,0, this.radius/2, -this.radius/2, this.radius,0)
  }
  display(){
    push();
    translate(this.x,this.y);
    scale(this.scale);


    push();
    translate(0,0);
    rotate(radians(-this.angle));    
    for(let i=0; i<4; i++){
      rotate(radians(360/4))
      this.drawSingleWing();
    }
    pop();

    fill(190,210,120);
    circle(0,0,15);

    pop();
  }  
}
