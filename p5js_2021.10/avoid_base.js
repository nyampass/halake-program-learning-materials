let player
let enemy

let playerSheet
let enemySheet

function preload() {
    playerSheet = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    enemySheet = loadSpriteSheet("assets/Pixel Adventure 2/Enemies/Duck/Idle (36x36).png", 36, 36, 10);
}

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    
    const playerAnimation = loadAnimation(playerSheet)
    const enemyAnimation = loadAnimation(enemySheet)

    player = createSprite(windowWidth / 2, windowHeight / 2)
    player.addAnimation('default', playerAnimation)
    player.scale = 4

    enemies = new Group()
    setInterval(() => {
        enemy = createSprite(random(width), random(height))
        enemy.addAnimation('default', enemyAnimation)
        enemy.velocity.y = random(4) - 1
        enemy.velocity.x = random(4) - 1
        enemy.scale = 4
        enemies.push(enemy)
    }, 1000)
}

function draw() {
    background(50)
    drawSprites()
}
