// let greeting1 = 'hello';
// let greeting2 = '哈喽';
let xArray = []
let yArray = []

let greetings = ['hello','Hallo','你好','bonjour','안녕하세요','Здравствуйте','こんにちは','Ciao','Hola','侬好'];
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for(let i = 0; i < greetings.length; i++){
    let x=random(width);
    let y=random(height);
    xArray.push(x);
    yArray.push(y);
  }
}

function draw() {
 background(120,230,210);
 for(let i = 0; i < greetings.length; i++){
  let greeting = greetings[i]
  text(greeting, xArray, yArray);
}


  
}