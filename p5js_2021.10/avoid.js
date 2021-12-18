let player
let enemy

let playerSheet
let enemySheet
let enemy2Sheet

function preload() {
    playerSheet = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    enemySheet = loadSpriteSheet("assets/Pixel Adventure 2/Enemies/Duck/Idle (36x36).png", 36, 36, 10);
    enemy2Sheet = loadSpriteSheet("assets/Pixel Adventure 2/Enemies/AngryPig/Idle (36x30).png", 36, 30, 9);
}

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    
    const playerAnimation = loadAnimation(playerSheet)
    const enemyAnimation = loadAnimation(enemySheet)
    const enemy2Animation = loadAnimation(enemy2Sheet)

    player = createSprite(windowWidth / 2, windowHeight / 2)
    player.addAnimation('default', playerAnimation)
    player.scale = 2

    enemies = new Group()
    setInterval(() => {
        let x
        let y
        let r = random()
        if (r < 0.25) {
            // 左端から出現
            x = 0
            y = random(height)
        } else if (r < 0.5) {
            // 上端から出現
            x = random(width)
            y = 0
        } else if (r < 0.75) {
            // 右端から出現
            x = width
            y = random(height)
        } else {
            // 下端から出現
            x = random(width)
            y = height
        }
        enemy = createSprite(x, y)
        enemy.addAnimation('default', enemyAnimation)
        enemy.velocity.x = (player.position.x - x) * 0.01
        enemy.velocity.y = (player.position.y - y) * 0.01
        enemy.scale = 2
        enemies.push(enemy)
    }, 1000)

    setInterval(() => {
        let x
        let y
        let r = random()
        if (r < 0.25) {
            // 左端から出現
            x = 0
            y = random(height)
        } else if (r < 0.5) {
            // 上端から出現
            x = random(width)
            y = 0
        } else if (r < 0.75) {
            // 右端から出現
            x = width
            y = random(height)
        } else {
            // 下端から出現
            x = random(width)
            y = height
        }
        enemy = createSprite(x, y)
        enemy.addAnimation('default', enemy2Animation)
        enemy.velocity.x = (player.position.x - x) * 0.02
        enemy.velocity.y = (player.position.y - y) * 0.02
        enemy.scale = 2
        enemies.push(enemy)
    }, 1500)}

let isGameover = false

function draw() {
    background(50)

    if (isGameover) {
        fill(255)
        textSize(40)
        textAlign(CENTER, CENTER)
        text("Game Over", width / 2, height / 2)
    }
 
    player.velocity.x = (mouseX - player.position.x) * 0.05;
    player.velocity.y = (mouseY - player.position.y) * 0.05;

    enemies.overlap(player, () => {
        // player.remove()
        // isGameover = true
    })

    drawSprites()
}
