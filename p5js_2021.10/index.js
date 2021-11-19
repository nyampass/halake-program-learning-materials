let animation1
let animation2

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    
    const sheet1 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    animation1 = loadAnimation(sheet1)

    const sheet2 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    animation2 = loadAnimation(sheet2)

    setInterval(() => {
        const sp = createSprite( random(width), random(height), 40, 40)        
        let type = 1
        if (random(2) < 1) {
            sp.addAnimation('default', animation1)
            type = 1
        } else {
            sp.addAnimation('default', animation2)
            type = 2
        }
        sp.velocity.y = random(2) - 1
        sp.velocity.x = random(2) - 1
        sp.scale = 4

        sp.onMousePressed = (event) => {
            sp.remove()
            if (type == 1)
                score = score + 100
            else
                score = score - 500
        }
    }, 1000)
}

let score = 0

function draw() {
    background(50)

    fill(255)
    textSize(40)
    textAlign(CENTER, CENTER)
    text("SCORE: " + score, width / 2, height / 2)

    drawSprites()
}

function mousePressed() {
}
