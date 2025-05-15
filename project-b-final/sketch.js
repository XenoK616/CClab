let phone,lockpage,blackscreen,logo;
let textY = 10;
let scenes = []; 
let currentSceneIndex = 0; 
let canAdvanceScene = false; // mark if advanceable
let hasAdvancedInThisScene = false; // mark if advanced

let currentAlpha = 0;
let targetAlpha = 255;

let phoneArray = [];
let maxPhones = 20; 
let alarmEffectActive = false;


function preload() {
  phone=loadImage('assets/phone.png');
  phone2=loadImage('assets/phone.png');
  lockpage=loadImage('assets/lockpage.png');
  blackscreen=loadImage('assets/blackscreen.png');
  logo=loadImage('assets/logo.jpg');
  title=loadImage('assets/title.png');
  alarm=loadSound('assets/alarm.mp3');
  insta=loadSound('assets/insta.mp3');
  scr=loadImage('assets/scroll.png');
  gun=loadSound('assets/wow.mp3')
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  p = new Phone(width/2,height/2);
  imageMode(CENTER)

  //scene array
  scenes = [
    {//1
      bgColor: color(20, 10, 30),
      phoneContent: blackscreen,
      scale: 0.16,
      interactNum: 0,
      interactNumBorder: 3,
      prompt: 'Press F to continue -->',

      //textfunction
      displayText: function() {
        textSize(32);
        textFont('Courier New');
        fill(255);
        text("A phone, in the context of early 21st-century human civilization, was a handheld, pocket-sized electronic device that served as a multi-functional tool for communication, information processing, entertainment, navigation, social connection, and personal organization—a kind of miniature, portable command center for daily life that became nearly indispensable across much of the world. Originally designed as a means of voice-based long-distance communication via analog or digital signals transmitted over wires and later wireless networks, the modern phone of the 2020s—commonly referred to as a “smartphone”—had evolved far beyond its telephonic roots, becoming an integrated digital hub equipped with a touch-sensitive screen, internet connectivity, high-resolution cameras, sensors for orientation and location, processors rivaling early supercomputers, and a constantly expanding universe of software applications (or 'apps') that could perform everything from banking and biometric monitoring to video editing and immersive gaming. Phones were not merely tools but extensions of their users' identities—both a mirror and a megaphone of personal expression, social belonging, and cultural participation—often containing intimate data such as messages, photographs, browsing history, personal notes, and social media profiles, making them almost like digital diaries or proxies of the self. People would spend hours a day interacting with these devices—reading news, scrolling through visual feeds curated by algorithms, sending instant messages, attending virtual meetings, mapping routes through satellite-based GPS, translating languages, shopping, streaming music and films, and engaging in a constant flow of social exchanges mediated by cloud-connected platforms. So central were phones to human behavior that they reshaped the built environment (with charging stations and signal towers), rewired attention spans, transformed economies, altered human interaction patterns, and introduced new forms of anxiety, dependency, and etiquette, as well as empowerment, creativity, and global connection. In short, a phone was not just a machine—it was a portable portal to the digital dimension, a constant companion and mediator between the individual and the vast, ever-unfolding network of technological and human systems that defined life in the early digital age. This portable object—usually rectangular, slim, and encased in glass and metal or plastic—was rarely thought of in terms of its raw materials or internal architecture by the people who used it daily; yet within its dense shell lived millions of lines of code and a lattice of microchips, transistors, sensors, and radios that enabled it to function as if it were alive, responsive not only to human touch but increasingly to voice, gesture, and location. The smartphone, as it came to be known, became a convergence point of human attention, compressing an array of previously separate tools and experiences—camera, map, clock, calculator, radio, television, library, notepad, flashlight, and even mirror—into a single device, radically transforming the tempo, structure, and emotional texture of daily existence. It influenced the way humans woke up (often to alarms set on their phones), how they worked (with many jobs becoming digitally mediated or dependent on constant communication), how they socialized (with platforms like Instagram, TikTok, WeChat, and WhatsApp allowing instantaneous exchanges of images, videos, and text), and how they conceptualized presence and absence, since one could be physically alone yet socially connected to thousands at any given moment. It became common for people to refer to their phones as if they were companions, guardians, assistants, and sometimes even antagonists—devices people could not live without, and yet sometimes wished they could escape. This paradoxical relationship was deeply embedded in the rhythms of early 21st-century life, especially among younger generations, who often experienced the world first through the lens of a phone’s camera or screen, crafting their sense of reality through filters, captions, and curated timelines.",10,textY,width*0.66);
        textY -=0.11;
        textSize(70);
        textFont('Rockwell');
        text('Cell Phone Instruction Manual in 2025',width*0.68,height*0.25,width*0.3);
        if (textY > height) {
          textY += 1
        }
      },

      //   //wheelfunction
      // handleWheel: function(event){
      //   if (event.delta > 0) textY -= 4;
      //   else textY += 4;
      //   return false;
      // }this is not necessary

    },

    {//2
      bgColor: color(6, 2, 50),
      phoneContent: blackscreen,
      scale: 0.16,
      interactNum: 0,
      interactNumBorder: 3,
      text: '7:00',
      prompt: 'Press F to continue -->',
      alarmPlaying: false,
      alarmTriggered: false,
      emojis: [
        { show: false },
        { char: "😴", size: 80, color: 255, x: -150, y: 0 },
        { char: "🤩", size: 90, color: [255,255,0], x: -150, y: 0 }
      ]
    },

    {//3
      bgColor: color(134, 131, 250),
      phoneContent: blackscreen,
      interactNum: 0,
      interactNumBorder: 5,
      doShowTime : false,
      text: '9:00',
      prompt: 'Press F to continue -->',
      instaPlayed: false,
      instaStopped: false,
    }
  ];  

  //phonearray
  for (let i = 0; i < maxPhones; i++) {
    phoneArray.push(
      {
      angle: random(TWO_PI), 
      distance: random(50, 150), 
      speed: random(0.02, 0.05), 
      size: random(0.08, 0.12) 
      }
    );
  }
}

function draw() {
  background(scenes[currentSceneIndex].bgColor);

  if (currentSceneIndex === 0) {
    scenes[0].displayText();
  }
  p.update();
  p.display();

  if (alarmEffectActive) {
    drawPhoneArray();
  }

  //show transition if advanceable
  if (canAdvanceScene) {
    fill(255);
    textSize(24);
    push();
    textAlign(CENTER);
    pop();

    if (frameCount % 70 < 40){
      text(scenes[currentSceneIndex].prompt, width*0.8, height*0.95);      
    }
    
  }

}

class Phone{
  constructor(startX,startY){
    this.x = startX
    this.y = startY
    this.width = phone.width * this.scale;
    this.height = phone.height * this.scale;
    this.scale = 0.28;
    this.isMouseOver = false;
    this.wasPressed = false; 
    this.scrY = -3000
  }
  
  update() {
    this.width = phone.width * this.scale;
    this.height = phone.height * this.scale;
    let phoneLeft = this.x - this.width/2;
    let phoneRight = this.x + this.width/2;
    let phoneTop = this.y - this.height/2;
    let phoneBottom = this.y + this.height/2;
    
    this.isMouseOver = (
      mouseX > phoneLeft && 
      mouseX < phoneRight && 
      mouseY > phoneTop && 
      mouseY < phoneBottom
    );
    // console.log(this.isMouseOver)
    // reset back to false
    if (!mouseIsPressed) {
      this.wasPressed = false;
    }

    if (scenes[1].interactNum === 1) {
      push()
      this.x = lerp(this.x, 300, 0.04)
      this.scale = lerp(this.scale, 0.1, 0.05)
      pop()

      if (!scenes[1].alarmTriggered) {
        alarm.play();
        scenes[1].alarmPlaying = true;
        scenes[1].alarmTriggered = true;
        alarmEffectActive = true;
      }
    } else if (scenes[1].interactNum === 2) {
      this.lerpPhoneDistances();
    }

    if (currentSceneIndex === 2) {

      if (scenes[2].interactNum === 1 && !scenes[2].instaPlayed) {
        insta.play();
        scenes[2].instaPlayed = true;      
      }
      else if (scenes[2].interactNum === 2){
        this.scale +=0.001    
        scenes[2].doShowTime = false
      }
      else if (scenes[2].interactNum === 3 && !scenes[2].instaStopped) {
        insta.stop();
        scenes[2].instaStopped = true;
      }
    }  

    if (scenes[2].interactNum === 1){
      push()
      this.x = lerp(this.x, width/2, 0.03)
      this.scale = lerp(this.scale, 0.3, 0.03)
      pop()
    }

    if (scenes[2].interactNum === 2){
      this.scrY+=5
    }

    if (scenes[2].interactNum === 5){
      this.scale = lerp(this.scale, 0.001, 0.03)
      if (this.scale < 0.01) {
        this.scale = lerp(this.scale, 6, 0.1)
        gun.play()
      }
    }
  }

  lerpPhoneDistances() {
    for (let i = 0; i < phoneArray.length; i++) {
      phoneArray[i].distance = lerp(phoneArray[i].distance, 1000, 0.05);
      // 当接近目标值时直接设为最终值
      if (abs(phoneArray[i].distance - 1000) < 1) {
        phoneArray[i].distance = 1000;
      }
    }
  }

  display(){
    push();
    translate(this.x,this.y)

    scale(this.scale*4/7)
    image(scenes[currentSceneIndex].phoneContent, 0, 0);   
    
    scale(7/4);
    image(phone,0,0);

    //0-1
    if (scenes[0].interactNum === 1){
      push()
      scale(0.28)
      image(logo,0,0)
      pop()
    }
    //0-2
    if (scenes[0].interactNum === 2){
      push()
      currentAlpha = lerp(currentAlpha, targetAlpha, 0.06)

      scale(3.45)
      tint(255,currentAlpha)
      image(title,0,-5)
      noTint()
      pop()
    }

    let emojiConfig = scenes[1].emojis[scenes[1].interactNum];
    if (emojiConfig && emojiConfig.char) {
      push();
      resetMatrix(); 
      textSize(emojiConfig.size);
      textAlign(CENTER, CENTER);
      fill(emojiConfig.color);
      text(emojiConfig.char, width + emojiConfig.x, height/2 + emojiConfig.y);
      pop();
    }

    //1-1
    if (scenes[1].interactNum === 1){
      textSize(420);
      push();
      textAlign(CENTER);
      pop();
      text('7:00',this.x-600,this.y*0.5);
    }

    //1-2
    if (scenes[1].interactNum === 2){
      push()
      resetMatrix()
      textSize(48)
      textAlign(LEFT,TOP)
      fill(255)
      text('Time perception signals are delivered directly to the cerebral cortex through electromagnetic wave transmission.',width*0.4,height*0.33,width*0.4)
      pop()
      textSize(420)
      if (frameCount % 70 < 40){
        text('7:01',this.x-780,this.y*0.4)
        for(let i=0;i<28;i++){
          noFill()
          strokeWeight(5)
          stroke(125,162,250)
          arc(this.x,0,1000+600*i,1000+600*i,-1,1)
        }
      }

    }

    if (currentSceneIndex === 2 && scenes[2].doShowTime){
      push()
      textSize(420)
      fill(255)
      if (frameCount % 70 < 40){
        text('12:30',this.x-780,this.y*0.4)
      }
      pop()
    }

    if (scenes[2].interactNum === 2 || scenes[2].interactNum === 3) { 
      push()
      currentAlpha = lerp(currentAlpha, targetAlpha, 0.003)
      tint(255,currentAlpha)
      scale(3.3)
      image(scr,0,this.scrY)
      noTint();
      pop()
    }


    //2-4
    if (scenes[2].interactNum === 4){
      push()
      resetMatrix()
      textSize(48)
      textAlign(LEFT,TOP)
      fill(255)  
      text('Engage in multiple 10-second information hunts by syncopated thumb movement while co-interpreting with irregular sound',width*0.23,height*0.36,width*0.6)
      pop()  
    }

    pop();


    // this.blackscreen();
  }
  // unlock(){
  //   push();
  //   translate(this.x,this.y)
  //   scale(this.scale*0.5);
  //   image(logo,0,0);
  //   pop();
  // }
  // blackscreen(){
  //   push();
  //   translate(this.x,this.y);
  //   scale(this.scale*4/7);
  //   image(blackscreen,0,0);
  //   pop();
  // }


  //checking if the phone is clicked
  checkClick() {
    // return true only when strictly
          // console.log("checking", this.isMouseOver);

    if (this.isMouseOver && !this.wasPressed) {
      // console.log("clicked");
      this.wasPressed = true;
      return true;
    }
    return false;
  }
}

//scrolling text in the first page
function mouseWheel(event) {
  if (event.delta > 0) {
    textY -= 4;
  } else {
    textY += 4;
  }
}


function mousePressed() {
  if (p.checkClick()) {
    scenes[currentSceneIndex].interactNum += 1;
      if (currentSceneIndex === 1 && scenes[1].alarmPlaying) {
        alarm.stop();
        scenes[1].alarmPlaying = false;
      } 
  }
  //只在点击手机达到interact上限才开始advancescene
  if (scenes[currentSceneIndex].interactNum >= scenes[currentSceneIndex].interactNumBorder){
    canAdvanceScene = true;
    hasAdvancedInThisScene = false;  
  }
}

function keyPressed() {
  // 只在允许前进且未在当前场景前进过时响应F键
  if (key === 'f' || key === 'F') {
    if (canAdvanceScene && !hasAdvancedInThisScene) {
      // 执行场景切换前的效果
      // if (scenes[currentSceneIndex].onAdvance) {
      //   scenes[currentSceneIndex].onAdvance();
      // }

      //清除phone array
      if (currentSceneIndex === 1) { 
        phoneArray = []; 
        scenes[2].doShowTime = true;
      }

      if (currentSceneIndex === 2) {
        currentAlpha = 0
      }
      
      //advance to the next scene

      currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
      
      //reset
      canAdvanceScene = false;
      hasAdvancedInThisScene = true;
    }
  }
}

function drawPhoneArray() {
  let centerX = p.x; 
  let centerY = p.y; 
  
  for (let i = 0; i < phoneArray.length; i++) {
    let phone = phoneArray[i];
    
    phone.angle += phone.speed;
    
    let x = centerX + cos(phone.angle) * phone.distance;
    let y = centerY + sin(phone.angle) * phone.distance;

    push();
    translate(x, y);
    scale(phone.size);
    rotate(sin(frameCount * 0.1 + i) * 0.2);
    
    image(phone2, 0, 0);
    pop();
  }
}
