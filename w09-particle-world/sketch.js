// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 1500; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 1500; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(60,width-60), 150);
  }
}

function draw() {
  background(0);
  colorMode(HSB);
  // consider generating particles in draw(), using Dynamic Array

  // update and display
  // for (let i = 0; i < particles.length; i++) {
  //   let p = particles[i];
  //   p.update();
  //   p.display();
  // }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
  for (let i = particles.length-1; i >= 0; i--){
    let p = particles[i];
    p.update();
    p.display();
    if (p.speedY < 0.1 && p.y < 8){
      particles.splice(i,1);
    }
  }

  strokeWeight(1)
  //text(particles.length,20,20)
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.scale = 1;
    this.angle = random(0,PI);
    this.colorHUE = (random(125,215))
    this.colorB = 225
    this.speedX = 0
    this.speedY = random(0.95,1.05)

  }
  // methods (functions): particle's behaviors
  update() {
    this.y += this.speedY
    this.x += this.speedX
    this.speedY += random(0.055,0.075)
    if (this.y > 492 || this.y < 8){
      this.speedY = -this.speedY 
    }
    if (this.x > 792 || this.x < 8){
      this.speedX = -this.speedX
    }

    if (dist(mouseX, mouseY, this.x, this.y) < 50 && dist(mouseX,this.x, this.x, this.y) > 1){
      this.speedX += (mouseX - pmouseX)/dist(mouseX,this.x, this.x, this.y)
      if (this.speedY < 10){
        this.speedY += (mouseX - pmouseX)/dist(mouseX,this.x, this.x, this.y)
      }
    }

    if (mouseIsPressed == true){
      this.x += (mouseX-this.x)*0.1
      this.y += (mouseY-this.y)*0.1
      this.scale = 0.8
    }else{
      this.scale = 1
    }

  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(this.colorHUE,225,this.colorB);
    scale(this.scale)
    circle(0,0,5)

    pop();

    noFill();
    stroke(155,235,65);
    strokeWeight(15)
    rect(0,0,800,500)
  }
}
