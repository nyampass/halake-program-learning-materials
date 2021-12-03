let player
let enemy

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    
    const sheet2 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    enemyAnimation = loadAnimation(sheet2)

    const sheet1 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    setTimeout(() => {
        player = createSprite(0, 0, 40, 40)
        // shee1を使えるように時間差
        playerAnimation = loadAnimation(sheet1)
        player.scale = 4
        player.addAnimation('default', playerAnimation)
    }, 1000)

    enemies = new Group()
    setInterval(() => {
        enemy = createSprite( random(width), random(height), 40, 40)        
        enemy.addAnimation('default', enemyAnimation)
        enemy.velocity.y = random(2) - 1
        enemy.velocity.x = random(2) - 1
        enemy.scale = 4
        enemies.push(enemy)
    }, 1000)
}

let isGameOver = false

function draw() {
    background(50)

    if (isGameOver) {
        fill(255)
        textSize(40)
        textAlign(CENTER, CENTER)
        text("GAMEOVER", width / 2, height / 2)    
    }

    if (player) {
        player.velocity.x = (mouseX - player.position.x) * 0.05;
        player.velocity.y = (mouseY - player.position.y) * 0.05;

        player.overlap(enemies, (_, e) => {
            player.remove()
            isGameOver = true
        })
    }

    drawSprites()
}
