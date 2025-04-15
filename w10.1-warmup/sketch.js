let balls = [];
let ballnum = 1;
let ballmax = 500;

function setup() {
 let canvas = createCanvas(800, 500);
 canvas.parent("p5-canvas-container");



}


function draw() {
 background(20, 20, 50);

for(let i = 0; i < ballnum; i++){
  let b = new Ball(400, 250);
  balls.push(b)
}
 
 // display all balls
 for(let i = 0; i < balls.length; i++){
   balls[i].update();
   balls[i].display();
   balls[i].checkOutOfCanvas();
 }

 for(let i = balls.length-1; i >= 0; i--){
   if (balls[i].outOfCanvas == true){
    balls.splice(i,1)
  }
 }






 // text on canvas
 fill(255);
 textSize(20)
 text("number of balls in array: " + balls.length, 20, 40)
}


class Ball{
 constructor(startX, startY){
   this.x = startX;
   this.y = startY;
   this.xSpeed = random(1, 3);
   this.ySpeed = random(-1, 1);
   this.size = random(2, 9);
   this.outOfCanvas = false
 }
 update(){
   this.x += this.xSpeed;
   this.y += this.ySpeed;

 }
 display(){
   push();
   translate(this.x, this.y);
   fill(255, 200);
   noStroke();
   circle(0, 0, this.size)
   pop();
 }
 checkOutOfCanvas(){
   if(this.y < -50 || this.y > 550 || this.x > 850){
    this.outOfCanvas = true
   }
 }

}
