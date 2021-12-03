let player
let enemy

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight)
    

    const sheet2 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    enemyAnimation = loadAnimation(sheet2)

    const sheet1 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    // この時点でアニメーションは使えない
    // playerAnimation = loadAnimation(sheet1)
    // player = createSprite(width / 2, height / 2, 40, 40)
    // player.addAnimation('default', enemy)

    setTimeout(() => {
        player = createSprite(0, 0, 40, 40)
        // shee1を使えるように時間差
        playerAnimation = loadAnimation(sheet1)
        player.scale = 4
        player.addAnimation('default', playerAnimation)
    }, 1000)

    // ランダムに敵を出す。複数の衝突判定には最初難しい
    // setInterval(() => {
    //     const sp = createSprite( random(width), random(height), 40, 40)        
    //     sp.addAnimation('default', enemy)
    //     sp.velocity.y = random(2) - 1
    //     sp.velocity.x = random(2) - 1
    //     sp.scale = 4
    // }, 1000)

    // 1匹だけの判定で分かりやすく
    // setTimeout(() => {
    //     enemy = createSprite( random(width), random(height), 40, 40)        
    //     enemy.addAnimation('default', enemyAnimation)
    //     enemy.velocity.y = random(2) - 1
    //     enemy.velocity.x = random(2) - 1
    //     enemy.scale = 4
    // }, 1000)

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

let score = 0

function draw() {
    background(50)

    fill(255)
    textSize(40)
    textAlign(CENTER, CENTER)
    text("SCORE: " + score    fill(255)
    textSize(40)
    textAlign(CENTER, CENTER)
    text("SCORE: " + score, width / 2, height / 2)


    if (player) {
        // 直接移動
        // player.position.x = mouseX
        // player.position.y = mouseY    

        // 追従
        player.velocity.x = (mouseX - player.position.x) * 0.05;
        player.velocity.y = (mouseY - player.position.y) * 0.05;

        player.overlap(enemies, (_, e) => {
            score += 1;
            e.remove()
        })
    }

    drawSprites()
}

// PCならこれだけでプレイヤーが動く
function mouseMoved() {
    player.position.x = mouseX
    player.position.y = mouseY
}
