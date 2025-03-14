function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id('p5-canvas');
    canvas.parent('p5-canvas-container');
    background('#FFFDCD');
    circleX = width / 2;
    circleY = height / 2;
    speedX = 0;
    speedY = 0;
    accel = 10;
    sinV = sin(frameCount*0.1)*20+30;
    angle = 0;
      function mousePressed(){
      canvas1();
    }
  }
  
  function draw() {
    if (circleX>width-sinV || circleX<sinV){
      speedX = -speedX
    }
    if (circleY>height-sinV || circleY<sinV){
      speedY = -speedY
    }
    drawCreature(circleX,circleY);
    gravity();
    outline();
  }
  
  function drawCreature(x, y) {
    let x1 = 0
    let y1 = 0
    let sinV = sin(frameCount*0.1)*20+30
    let cosV = cos(frameCount*0.1)*20+30
    let sin2 = sin(frameCount*0.01)*30+speedX*40
    let r = map(sin(frameCount*0.1),-1,1,180,255)
    let g = map(sin(frameCount*0.11),-1,1,200,255)
    let b = map(sin(frameCount*0.12),-1,1,150,255)
    push();
    translate(x, y);
    fill(r,g,b);
    noStroke();
    circle(x1,y1,sinV)  
    if (mouseIsPressed){
      rectMode(CENTER)
      stroke('darkred')
      noFill()
      for(let i =0;i<2;i+=0.5){
        sinV = sin(frameCount*0.1+i)*20+30
        cosV = cos(frameCount*0.1+i)*20+30
        push()
        rotate(radians(45))
        stroke(0)
        rect(x1,y1,sin2,sin2)
        pop()
        rect(x1,y1,sinV*2+i,cosV*2+i)
      }
    }else{
      moon(x1+20,y1)
      moon2(x1+sinV-30,y1+sinV-30)
      moon3(x1,y1)
      moon4(x1,y1)
    }
    pop()
  }
  
  function moon(x1,y1){
    push();
    translate(x1,y1);
    stroke(0);
    noFill();
    rotate(noise(frameCount*0.005)*10);
    triangle(-10,-10,10,-10,-10,10);
    pop();
  }
  
  function moon2(x1,y1){
    push();
    fill(0);
    translate(x1,y1);
    rotate(noise(frameCount*0.005)*10);
    triangle(10,10,10,-10,-10,10);
    pop();
  }
  
  function moon3(x1,y1){
    let x3 =sin(frameCount*0.01)*30+50;
    let a = sin(frameCount*0.01)*30+50;
    push();
    translate(x1,y1);
    noStroke();
    rotate(angle);
    angle+=a*0.001;
    fill('skyblue');
    circle(x3,0,10);
    pop();
  }
  
  function moon4(x1,y1){
    let oscil = cos(frameCount*0.06)*50+80;
    push();
    rectMode(CENTER);
    translate(x1,y1);
    stroke(0);
    fill('rgb(224,141,255)');
    rotate(frameCount*0.03);
    rect(oscil,0,10,10);
    pop();
  }
  
  function gravity(){
    let dx = mouseX - circleX;
    let dy = mouseY - circleY;
    let dis = sqrt(dx*dx+dy*dy);
    if(dis > 0.1){
      let f= accel/(dis*dis);
      let accelX = f*dx;
      let accelY = f*dy;
      speedX += accelX;
      speedY += accelY;
      speedX *= 0.98;
      speedY *= 0.98;
      circleX += speedX;
      circleY += speedY;
    }
  }
  
  function outline(){
    stroke(0);
    strokeWeight(1);
    fill('#AA5909');
    quad(0,0,10,10,10,490,0,500);
    quad(0,0,800,0,790,10,10,10);
    quad(800,0,800,500,790,490,790,10);
    quad(0,500,800,500,790,490,10,490);
  }
  
  function mousePressed(){
    canvas1()
  }
  
  function canvas1(){
    background('#FFFDCD');
    noStroke();
    fill("#CDFCFF");
    for (let x = 0; x < 40; x++) {
      for (let y = 0; y < 25; y++) {
        let randomPick = random(0, 200);
        let posX = x * 20 + 10;
        let posY = y * 20 + 10;
        noStroke();
        if (randomPick < 10) {
          if (randomPick > 8) {
            stroke(0);
            strokeWeight(1);
          }
  
          fill("#CDFCFF");
          rect(posX, posY, random(3, 18));
        } else if (randomPick < 20) {
          if (randomPick > 18) {
            stroke(0);
            strokeWeight(1);
          }
          fill("#F78D37");
          rect(posX, posY, random(3, 18));
        } else if (randomPick < 23) {
          fill(random(220, 255), random(220, 255), random(110, 255));
          circle(posX, posY, random(5, 50));
          for (let l = 0; l < 3; l++) {
            stroke("#873F04");
            strokeWeight(2);
            line(
              200 - l * random(20, 21),
              480 - l * 20,
              random(399, 401) - l * 20,
              120 - l * 20 - random(-10, 0)
            );
            fill(random(0, 160), random(120, 230), random(150, 220));
            circle(660, 180, 200 - l * 40 - random(-20, 20));
            bezier(
              420 + l * 10,
              350 + l * 30,
              880 - l * 80,
              180 - l * 80,
              80 + l * 40,
              430 - l * 40,
              680 - l * 40,
              120 + l * 40
            );
          }
          stroke("#0F6174");
          line(320, 380, 220, 60);
          line(220, 60, 120, 380);
          strokeWeight(5);
          rect(50, 240, 795, 10);
        }
      }
    }
  }