let xArray = [];


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let x = 20; x < width; x += 40){
    xArray.push(x);
  }
}

function draw() {
  background(0);
  rectMode(CENTER)
  for (let i = 0; i < xArray.length; i++){
    xArray[i] += random(-0.5,0.5)
    rect(xArray[i],250,20,20)
  } 
}