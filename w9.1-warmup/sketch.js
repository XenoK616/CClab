
let basket = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // egg1 = new Bouncingball(100,200);
  // egg2 = new Bouncingball(200,300);

  // let egg = new Egg(100,100)
  // basket.push(egg)

  for (let i=0; i<20; i++){
  let egg = new Egg(random (0,width), random(0,height))
  basket.push(egg)    
  }
}

function draw() {
  background(77,87,201);
  // egg1.display();
  // egg2.display();
  // egg1.update();
  // egg2.update();

  // basket[0].update();
  // basket[0].display();

  for (let i=0; i< basket.length; i++){
    basket[i].update();
    basket[i].display();   
  }

}

class Egg {
  constructor(startX,startY){
    this.x = startX
    this.y = startY
    this.diaX = 50
    this.diaY = 80
    this.speedX = random(-3,3)
    this.speedY = random(-3,3)
    this.scale = random(0.5,1.5)
    this.showYolk = false;
  }

  update(){
    this.x += this.speedX
    this.y += this.speedY
    if (this.x < this.diaX/2 || this.x > width-this.diaX/2) {
      this.speedX = -this.speedX
      this.showYolk = !this.showYolk
    }
    if (this.y < this.diaY/2 || this.y > height-this.diaX/2) {
      this.speedY = -this.speedY
      this.showYolk = !this.showYolk
    }
  }

  display(){
    push()
    translate(this.x,this.y)
    scale(this.scale)
    noStroke()
    fill(255,210)
    //circle(0,0,this.radius)
    arc(0, 0, this.diaX, this.diaY, PI, 0)
    arc(0, 0, this.diaX, this.diaX, 0, PI)
    if (this.showYolk = true){
      fill(240,140,40)
      circle(0,0,this.diaY/3)      
    }
    pop()
  }

}

function mousePressed(){
  let egg = new Egg(mouseX,mouseY)
  basket.push(egg)     
}