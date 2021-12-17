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
        // enemy = createSprite(random(width), random(height))
        let x
        if (random() > 0.5) {
            x = 0
        } else {
            x = width
        }
        let y = random(height)        
        enemy = createSprite(x, y)
        enemy.addAnimation('default', enemySheet)
        // enemy.velocity.y = random(4) - 1
        // enemy.velocity.x = random(4) - 1
        console.log({p: player.position.x, x, z: (x - player.position.x) * 0.1})
        enemy.velocity.x = (player.position.x - x) * 0.02
        enemy.velocity.y = (player.position.y - y) * 0.02
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

        enemies.overlap(player, () => {
            player.remove()
            isGameOver = true
        })
    }

    drawSprites()
}
