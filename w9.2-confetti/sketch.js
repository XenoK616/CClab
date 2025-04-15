let confettis = [];
let numConfetti = 5;

let backgroundHUE;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }
  // hue saturation brightness
  colorMode(HSB)

  backgroudHUE = random(0,255)
  
}

function draw() {
  background (backgroudHUE,10,235);

  confettis.push(new Confetti(mouseX, mouseY))
  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
    confettis[i].checkOutOfCanvas();
  }

  text(confettis.length, 10,10)

  //small issue. skipped the one after the deleted one.
  // for(let i = 0; i < confettis.length; i++){
  //   if(confettis[i].onCanvas == false){
  //     confettis.splice(i,1);
  //   }
  // }
  //check from backwards
  for(let i = confettis.length-1; i>=0; i--){
    if(confettis[i].onCanvas == false){
      confettis.splice(i,1);
    }
  }
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);

    this.confettiHUE = random(0,255)
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    
    this.onCanvas = true;
  }
  checkOutOfCanvas(){
    if(this.y > height+10){
      this.onCanvas = false;
    }
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    this.speedY += 0.08;
    this.speedX *= 0.995
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.confettiHUE, 255, 255);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

}

function mousePressed() {
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(mouseX, mouseY))
  }
}
