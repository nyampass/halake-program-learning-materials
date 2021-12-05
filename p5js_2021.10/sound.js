let sound
let sound2

function preload() {
    sound = loadSound("assets/sounds/zoom3.wav")
    sound2 = loadSound("assets/sounds/ding2.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  userStartAudio()
  for (let i = 0; i < 20; i++) {
    const sp = createSprite(
      random() * width, random() * height, 
      40, 40)
    sp.onMousePressed = function() {
      sound2.play()
    } 
  }
}

function draw() {
  drawSprites()
}