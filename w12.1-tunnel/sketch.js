let stars = [];
function setup() {
  
  let canvas = createCanvas(800, 500); // fullscreen!
  canvas.parent("p5-canvas-container");
  // p.push(new Poi())
}

function draw() {
  background(0);

  for(let i = 0; i < 1; i+=0.3){
    stars.push(new Star()) 
  }
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
  }

  // clean
  for (let i = stars.length-1; i>=0; i--){
    if(stars[i].s>4){
      stars.splice(i,1);
    }
  }
  

  console.log(stars.length)

}

class Star{
  constructor(){
    this.s = 0.02
    this.a = random(360)
    this.originX = mouseX; // variable point
    this.time = 0
    this.type = 'ball'
  }
  update(){
    this.s *= 1.04
    this.originX = lerp(this.originX, width/2, 0.02);
    this.time ++
    if (this.time % 50 ==1){
      this.type = 'ring'
    }else{
      this.type = 'ball'
    }
    // keep turning vision
  }
  display(){
    push()
    translate(this.originX, height/2)
    rotate(radians(this.a))
    scale(this.s)

    noStroke();
    if (this.type = 'ball'){
      fill(random(125,225))
      circle(0, 200, random(10,20))
    }
    if (this.type = 'ring'){
      noFill();
      stroke(255)
      circle(0, 800, 20)
      circle(0,0,800)
    }    
    
    pop()
  }
}