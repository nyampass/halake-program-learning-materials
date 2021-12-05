let sound;
let ding;
let drag;

function preload() {
  sound = loadSound("assets/buzz-grid-sounds-wav/zoom3.wav");
  ding = loadSound("assets/buzz-grid-sounds-wav/ding2.wav");
}

function setup() {
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  textSize(40);
  textAlign(CENTER);

  userStartAudio();

  const start = createSprite(width / 2, height / 4, width, height / 2);
  start.onMousePressed = function () {
    if (!sound.isPlaying()) {
      // sound.play();
    }
  };


  for (let index = 0; index < 10; index++) {
    const sp = createSprite(width * random(), height * random())
    sp.onMousePressed = () => {
      userStartAudio();
      ding.play()
      drag = sp;
      sp.remove()
    }      
    sp.onMouseReleased = () => {
      drag = null;
    }
  }
}

function draw() {
  background(50);
  fill(255);
  drawSprites();
  text("play", width / 2, height / 4);
  if (drag) {
    drag.position.x = mouseX
    drag.position.y = mouseY
  }
}
