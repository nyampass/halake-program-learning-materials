let animation;
let coinAnimation;
let sheet;
let conSheet;
let duckSheet;
let duckAnimation;
let dragSprite;
let bgm;
let ding;

function preload() {
    sheet = loadSpriteSheet("assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png", 32, 34, 13);
    duckSheet = loadSpriteSheet("assets/Pixel Adventure 2/Enemies/Duck/Idle (36x36).png", 36, 36, 10);
    coinSheet = loadSpriteSheet("assets/Rocky Roads/coin.png", 16, 16, 4);

    bgm = loadSound("assets/sounds/tempo.mp3");
    ding = loadSound("assets/sounds/ding2.wav");
}

function setup() {
    pixelDensity(2);
    createCanvas(windowWidth, windowHeight - 50);

    animation = loadAnimation(sheet);
    duckAnimation = loadAnimation(duckSheet);
    coinAnimation = loadAnimation(coinSheet);

    for (let i = 0; i < 10; i++) {
        x = width * random()
        y = height * random()

        if (i == 0) {       
            coin = createSprite(x, y + 16, 40, 40);
            coin.addAnimation('default', coinAnimation);
            coin.scale = 4;
            coin.onMousePressed = function() {
                ding.play()
                this.remove()
            }
        }

        sp = createSprite(x, y, 40, 40);
        sp.addAnimation('default', animation);
        sp.scale = 4;
        setMoveSprite(sp);
    }

    // for (let i = 0; i < 10; i++) {
    //     sp = createSprite(width * random(), height * random(), 40, 40);
    //     sp.addAnimation('default', duckAnimation);
    //     sp.scale = 3.2;
    //     setMoveSprite(sp);
    // }

    userStartAudio();
    bgm.amp(0.1);
    bgm.loop();
}

function draw() {
    background(50);
    fill(255);

    if (dragSprite != null) {
        dragSprite.position.x = mouseX;
        dragSprite.position.y = mouseY;
    }

    drawSprites();
}

function setMoveSprite(sprite) {
    sprite.onMousePressed = function () {
        if (dragSprite == null) {
            dragSprite = this;
        }
    };
    sprite.onMouseReleased = function () {
        if (dragSprite == this) {
            dragSprite = null;
        }
        mouseX = null;
        mouseY = null;
    };
}
