let animation1
let animation2

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    
    const sheet1 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    animation1 = loadAnimation(sheet1)

    const sheet2 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    animation2 = loadAnimation(sheet2)
}

function draw() {
    background(50)
    // drawSprites()
}

function mousePressed() {
    const sp = createSprite( random(width), random(height), 40, 40)
    
    if (random(2) < 1) {
      sp.addAnimation('default', animation1)
    } else {
      sp.addAnimation('default', animation2)
    }

    sp.velocity.y = 2
    sp.velocity.x = 0
    sp.position.x = mouseX;
    sp.position.y = mouseY;
    // sp.rotation = random(360)
    sp.scale = 1
}
