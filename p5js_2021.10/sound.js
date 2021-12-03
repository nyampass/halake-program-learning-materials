let sound;
let loopFlag = false;

function preload() {
  sound = loadSound("assets/buzz-grid-sounds-wav/zoom3.wav");
}

function setup() {
  pixelDensity(2);
  createCanvas(windowWidth - 20, windowHeight - 50);
  textSize(40);
  textAlign(CENTER);

  start = createSprite(width / 4, height / 4, width / 2, height / 2);
  pose = createSprite((width / 4) * 3, height / 4, width / 2, height / 2);

  start.onMousePressed = function () {
    if (getAudioContext().state !== "running") {
      getAudioContext().resume();
    }
    if (!sound.isPlaying()) {
      sound.play();
    }
  };
  pose.onMousePressed = function () {
    if (!sound.isPaused()) {
      sound.pause();
    }
  };
}

function draw() {
  background(50);
  fill(255);
  drawSprites();
  text("play", width / 4, height / 4);
  text("stop", (width / 4) * 3, height / 4);
}
