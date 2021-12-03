let animation1
let animation2
let player
let enemies

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    
    const sheet1 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    animation1 = loadAnimation(sheet1)

    const sheet2 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    animation2 = loadAnimation(sheet2)

    setTimeout(() => {
      player = createSprite(0, 0, 40, 40)
      player.addAnimation('default', animation1)
      player.scale = 4
    }, 1000)

    enemies = new Group()
    setInterval(() => {
        const enemy = createSprite(width / 2, height / 2, 40, 30)
        enemy.addAnimation('default', animation2)
        enemy.scale = 2
        enemy.velocity.x = random(2) - 1
        enemy.velocity.y = random(2) - 1
        enemies.push(enemy)
    }, 1000)
}

let score = 0

function draw() {
    background(50)

    if (player) {
      player.velocity.x = (mouseX - player.position.x) * 0.1
      player.velocity.y = (mouseY - player.position.y) * 0.1
      player.overlap(enemies, (p, e) => {
        e.remove()
      })
    }

    drawSprites()
}

function mousePressed() {
}
