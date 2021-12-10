let animation
let sheet
let dragSprite

function preload() {
    sheet = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
}

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight - 50)

    animation = loadAnimation(sheet)
    sp = createSprite(width / 2, height / 4 * 3, 40, 40)
    sp.addAnimation('default', animation)
    sp.scale = 4
    setMoveSprite(sp)
}

function draw() {
    background(50)
    fill(255)

    if (dragSprite != null) {
        dragSprite.position.x = mouseX
        dragSprite.position.y = mouseY
    }

    drawSprites()
}

function setMoveSprite(sprite) {
    sprite.onMousePressed = function () {
        if (dragSprite == null) {
            dragSprite = this
        }
    }
    sprite.onMouseReleased = function () {
        if (dragSprite == this) {
            dragSprite = null
        }
        mouseX = null
        mouseY = null
    }
}
