let bgdImage;
let fish;
let particles = [];
let numParticles = 20;
let worldX = 0;
let worldY = 0;

function preload(){
  bgdImage = loadImage('assets/Paper-Texture-4.jpg')
  fish = loadImage('assets/alexfish (1).png')
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i=0; i<numParticles; i++){
    particles.push(new Particle())
  }
}

function draw() {
  background(0);
  push();
  translate(worldX,worldY)

  image(bgdImage,0,0,1600,1000)

  for (let i=0; i<particles.length; i++){
    particles[i].update();
    particles[i].display();
    particles[i].checkClick();
  }
  pop();

  if (keyIsPressed == true){
    if (key == 'a'){
      worldX+=1;
    }else if(key =='d') {
      worldX -=1;
    }else if(key =='s'){
      worldY -=1;
    }else if(key =='w'){  
      worldY +=1
    }
  }

}

class Particle{
  constructor(){
    this.x = random (0,width)
    this.y = random (0,height)
    this.speedX = random(-2,2)
    this.speedY = random(-3,3)
    this.dia = 20
    this.angle = 0
    this.swordY = 0
  }

  update(){
    this.x += this.speedX
    this.y += this.speedY
    this.angle += this.speedX*0.01+0.01*this.speedY

    if (this.x < this.dia/2 || this.x > 1600 - this.dia/2){
      this.speedX = -this.speedX
    }
    if (this.y < this.dia/2 || this.y > 1000 - this.dia/2){
      this.speedY = -this.speedY
    }
  }

  display(){
    push()
    translate(this.x,this.y)
    rotate(this.angle)
    scale(0.5)
    image(fish,0,0)
    strokeWeight(4)
    line(6,0+this.swordY,6,60+this.swordY)
    line(-2,50+this.swordY,14,50+this.swordY)
    pop()
  }

  checkClick(){
    let d = dist(this.x,this.y,mouseX,mouseY);
    if(d<30){
      this.swordY +=10
    }
  }
}

function mousePressed(){
  for (let i = 0; i < particles.length; i++){
    particles[i].checkClick();
  }
}