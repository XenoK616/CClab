let phone,lockpage,blackscreen,logo;
let textY = 10;
let scenes = []; 
let currentSceneIndex = 0; 
let canAdvanceScene = false; // mark if advanceable
let hasAdvancedInThisScene = false; // mark if advanced

function preload() {
  phone=loadImage('assets/phone.png');
  lockpage=loadImage('assets/lockpage.png');
  blackscreen=loadImage('assets/blackscreen.png');
  logo=loadImage('assets/logo.jpg')
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
      text: '7:00',
      onPhoneClick: function() {
        //click to enter the next scene

        advanceScene();
      }
    },

    {//2
      bgColor: color(100, 50, 80),
      phoneContent: logo,
      onPhoneClick: function() {
        
        advanceScene();
      }
    },

    {//3
      bgColor: color(100, 50, 80),
      phoneContent: lockpage,
      text: '9:00',
      customDraw: function() {
        fill(255);
        circle(0,0,100);
      },
      onPhoneClick: function() {
        
        currentSceneIndex = 0;
      }
    }
  ];  

}

function draw() {
  background(scenes[currentSceneIndex].bgColor);
  startText();
  p.update();
  p.display();

  //show something if advanceable
  if (canAdvanceScene) {
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text(scenes[currentSceneIndex].prompt, width/2, height/2);
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
  }
  update() {
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
    
    // reset back to false
    if (!mouseIsPressed) {
      this.wasPressed = false;
    }
  }

  display(){
    push();
    translate(this.x,this.y)
    scale(this.scale);
    image(phone,0,0);
    pop();
    this.blackscreen();
  }
  unlock(){
    push();
    translate(this.x,this.y)
    scale(this.scale*0.5);
    image(logo,0,0);
    pop();
  }
  blackscreen(){
    push();
    translate(this.x,this.y);
    scale(this.scale*4/7);
    image(blackscreen,0,0);
    pop();
  }

  //checking if the phone is clicked
  checkIfClicked(){
    if(
      mouseX > this.x - this.width/2 && 
      mouseX < this.x + this.width/2 && 
      mouseY > this.y - this.height/2 && 
      mouseY < this.y + this.height/2
    ){
      this.scale = 0.5;
    }
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

function startText(){
  textSize(32);
  textFont('Courier New');
  fill(255);
  text("A phone, in the context of early 21st-century human civilization, was a handheld, pocket-sized electronic device that served as a multi-functional tool for communication, information processing, entertainment, navigation, social connection, and personal organization—a kind of miniature, portable command center for daily life that became nearly indispensable across much of the world. Originally designed as a means of voice-based long-distance communication via analog or digital signals transmitted over wires and later wireless networks, the modern phone of the 2020s—commonly referred to as a “smartphone”—had evolved far beyond its telephonic roots, becoming an integrated digital hub equipped with a touch-sensitive screen, internet connectivity, high-resolution cameras, sensors for orientation and location, processors rivaling early supercomputers, and a constantly expanding universe of software applications (or 'apps') that could perform everything from banking and biometric monitoring to video editing and immersive gaming. Phones were not merely tools but extensions of their users' identities—both a mirror and a megaphone of personal expression, social belonging, and cultural participation—often containing intimate data such as messages, photographs, browsing history, personal notes, and social media profiles, making them almost like digital diaries or proxies of the self. People would spend hours a day interacting with these devices—reading news, scrolling through visual feeds curated by algorithms, sending instant messages, attending virtual meetings, mapping routes through satellite-based GPS, translating languages, shopping, streaming music and films, and engaging in a constant flow of social exchanges mediated by cloud-connected platforms. So central were phones to human behavior that they reshaped the built environment (with charging stations and signal towers), rewired attention spans, transformed economies, altered human interaction patterns, and introduced new forms of anxiety, dependency, and etiquette, as well as empowerment, creativity, and global connection. In short, a phone was not just a machine—it was a portable portal to the digital dimension, a constant companion and mediator between the individual and the vast, ever-unfolding network of technological and human systems that defined life in the early digital age. This portable object—usually rectangular, slim, and encased in glass and metal or plastic—was rarely thought of in terms of its raw materials or internal architecture by the people who used it daily; yet within its dense shell lived millions of lines of code and a lattice of microchips, transistors, sensors, and radios that enabled it to function as if it were alive, responsive not only to human touch but increasingly to voice, gesture, and location. The smartphone, as it came to be known, became a convergence point of human attention, compressing an array of previously separate tools and experiences—camera, map, clock, calculator, radio, television, library, notepad, flashlight, and even mirror—into a single device, radically transforming the tempo, structure, and emotional texture of daily existence. It influenced the way humans woke up (often to alarms set on their phones), how they worked (with many jobs becoming digitally mediated or dependent on constant communication), how they socialized (with platforms like Instagram, TikTok, WeChat, and WhatsApp allowing instantaneous exchanges of images, videos, and text), and how they conceptualized presence and absence, since one could be physically alone yet socially connected to thousands at any given moment. It became common for people to refer to their phones as if they were companions, guardians, assistants, and sometimes even antagonists—devices people could not live without, and yet sometimes wished they could escape. This paradoxical relationship was deeply embedded in the rhythms of early 21st-century life, especially among younger generations, who often experienced the world first through the lens of a phone’s camera or screen, crafting their sense of reality through filters, captions, and curated timelines.",10,textY,width*0.66);
  textY -=0.11;
  textSize(70);
  textFont('Rockwell');
  text('Cell Phone Instruction Manual:   A Day in 2025',width*0.68,height*0.25,width*0.3);
  if (textY > height) {
    textY += 1
  }
}

function mousePressed() {
  if (p.isMouseOver) {
    // execute click function
    scenes[currentSceneIndex].onPhoneClick();
  }
}
