/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new KangkangDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  console.log(mouseX,mouseY)
  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class KangkangDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.scalefactor = 0.33
    this.bowAngle = 0
    this.bowX = 0
    this.bowY = 0
    this.angle = 0
    this.speed = 0
    this.accel = 0
    //..
    //..
  }
  update() {
    
    this.speed += sin(this.accel)*0.06
    
    this.x += sin(frameCount*0.02)*0.03
    this.angle = noise(frameCount*0.008)*0.08

    if (this.accel%10>5){
      this.accel += 0.04
    }else{
      this.accel += 0.02
    }
    this.bowAngle = 3*this.angle
    this.bowX = sin(this.speed)*50    
    this.bowY = sin(frameCount*0.025)*2

    
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();

    translate(this.x, this.y+300);
    scale(this.scalefactor);
    rotate(this.angle)
    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    this.drawCello()

    // push()
    // translate(this.x, this.y+300);
    // rotate(this.angle);
    // pop()

    this.drawBow(this.bowX,this.bowY,this.bowAngle)
    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
    translate(this.x,this.y+300)
    scale(this.scalefactor)
    stroke(255)
    fill(104,100,255)
    quad(-4,-5,4,-5,5.5,2,-5.5,2)

  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-300, -300, 600, 600);
    fill(255);
    stroke(0);
  }

  drawCello(){
    translate(0,-300)
    strokeWeight(1.5)
    stroke(16,25,84)
    fill(45,60,133)
    quad(-12,60,12,60,9,-250,-9,-250)

    stroke(125)
    strokeWeight(5)
    line(-117,54.5,100,12)

    strokeWeight(0.7)
    stroke(255)

    fill(104,100,249)
    arc(0,30,240,240,-0.056*PI,0.94*PI)
    for(let i=0;i<6;i++){
      line(-8+i*3.2,60,-6+i*2.3,-250)
      line(-8+i*3.2,60,-3.5+i*1.4,145)
    }
  //fill crescent
    fill(15,19,95);
    noStroke();
    beginShape(); 
    for (let a = -0.085 * PI; a <= 1.56 * PI; a += 0.1) {
      let x = cos(a) * 120 + 0;
      let y = sin(a) * 120 + 30;
      vertex(x, y);
    }
    for (let a = 1.56 * PI; a >= -0.085 * PI; a -= 0.1) {
      let x = cos(a) * 95 + 21;
      let y = sin(a) * 95 + 7;
      vertex(x, y);
    }  
    endShape(CLOSE);
  //end fill

  //fill middle shape
    fill(89,34,185);
    noStroke();
    beginShape(); 
    for (let a = 1.43 * PI; a <= 2.01 * PI; a += 0.1) {
      let x = cos(a) * 95 - 21;
      let y = sin(a) * 95 + 132.42;
      vertex(x, y);
    }
    vertex(74,132.42,74,192.42);
    for (let a = 2 * PI; a >= 1.57 * PI; a -= 0.1) {
      let x = cos(a) * 95 - 21;
      let y = sin(a) * 95 + 192.42;
      vertex(x, y);
    }  
    for (let a = 0.57 * PI; a <= 0.94 * PI; a += 0.1) {
      let x = cos(a) * 95 + 21;
      let y = sin(a) * 95 + 7;
      vertex(x, y);
    }   
    endShape(CLOSE);
  //end fill

    noFill()
    strokeWeight(2)
    stroke(117,113,255)
    arc(21,7,190,190,0.57*PI,1.5*PI)
    //mid shape
    arc(-21,192.42,190,190,1.57*PI,2*PI)
    arc(-21,132.42,190,190,1.43*PI,2*PI)
    line(74,192.42,74,132.42)

    stroke(255)
    arc(0,30,240,240,-0.085*PI,1.56*PI)

    fill(35,24,156)
    triangle(100,12,119,16,115,-2)


    line(-2,150,-2,300)
    line(2,150,2,300)
    //top part
    fill(45,60,133)
    noStroke()
    quad(-7,-253,-7,-300,-1,-285,-1,-253)
    quad(7,-253,7,-300,1,-285,1,-253)

    stroke(255)
    strokeWeight(3.5)
    line(9,-250,-9,-250)

    line(7,-253,7,-300)
    line(-7,-253,-7,-300)
    line(-7,-280,-37,-280)
    line(7,-280,37,-280)

    stroke(0)
    line(-12,60,12,60)
    line(-12,58,-12,62)
    line(12,58,12,62)


    fill(0)
    stroke(255)
    strokeWeight(2.5)
    quad(-4.5,150,4.5,150,3,155,-3,155)
    rect(-9.5,149,3,9)

    strokeWeight(0.7)
    for(let i=0;i<6;i++){
      line(-8+i*3.2,60,-3.5+i*1.4,145)
    }

  }

  drawBow(x,y,angle){
    push()
    translate(0,0)
    rotate(angle)

    strokeWeight(5.8);
    stroke(25);
    line(x-160,y+1,x+140,y+1)
    stroke(255);
    line(x-160,y+1,x+140,y+1)
    stroke(68,70,113)
    curve(x-300,y-25,x-220,y-5,x+140,y-3.5,x+250,y-22)
    triangle(x+140,y-1.4,x+143,y+1,x+140,y+1)
    bezier(x-170,y-3,x-160,y-3,x-170,y+2,x-160,y+2)
    pop()
  }

}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/