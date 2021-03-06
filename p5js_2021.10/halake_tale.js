let sheet
let enemySheet
let dragSprite
let offsetX = 0
let offsetY = 0
let enemyGroup
let animation
let backSound
let removeSound

function preload(){
    sheet = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    enemySheet = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    backSound = loadSound('assets/sounds/tempo.mp3')
    removeSound = loadSound('assets/sounds/crash.wav')
}

async function setup(){
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight - 50)
    backSound.amp(0.2)
    backSound.loop()

    enemyGroup = new Group()
    
    animation = loadAnimation(sheet)
    dragSprite = createSprite(width/2, height/4*3, 40, 40)// 引数最後にある2つの40は記述しなくても自動でサイズに合わせてくれる
    dragSprite.addAnimation('default', animation)
    dragSprite.scale = (width/5) / 32 //横幅の5分の1のサイズに調整。32は1コマ当たりの横幅
    dragSprite.setDefaultCollider()
    dragSprite.debug = true

    animation = loadAnimation(enemySheet)
    //// 生成場所を決め打ち（下記の0.5秒おきに生成のとコメントアウトで入れ替え可能）
    // let spownPosList = [[width/2, height/10], [width/10, height/10*3], [width/10*3, height/10*2], [width/10*7, height/10*2], [width/10*9, height/10*3]] //[[X, Y], ...]
    // spownPosList.filter(function(value){
    //     enemySp = createSprite(value[0], value[1], 40, 40)
    //     enemySp.addAnimation('default', animation)
    //     enemySp.scale = (width/8) / 44 //横幅の8分の1のサイズに調整。44は1コマ当たりの横幅
    //     enemySp.setVelocity((width/2 - value[0]) / 300, (height/4*3 - value[1]) / 300)
    //     enemySp.addToGroup(enemyGroup)
    // })
    ////

    //// 0.5秒おきにランダム生成するプログラム
    setInterval(() =>{
        x = random(0, width)
        y = random(0, height)
        let enemySp = createSprite(x, y, 44, 44)// 引数最後にある2つの44は記述しなくても自動でサイズに合わせてくれる
        enemySp.addAnimation('default', animation)
        enemySp.scale = (width/8) / 44 //横幅の8分の1のサイズに調整。44は1コマ当たりの横幅
        enemySp.setCollider('rectangle')
        enemySp.setVelocity((dragSprite.position.x - x) / 300, (dragSprite.position.y - y) / 300)
        enemyGroup.add(enemySp)
        enemySp.debug = true
    },500)
    //// 
}

function draw(){
    background(50)
    fill(255)
    drawSprites()
    dragSprite.overlap(enemyGroup, ex) //setColliderで設定している場合はenemyGroup.overlap(dragSprite, ex)のどちらでもよい
}

function resetPressPos(){
    mouseOffsetX = mouseX
    mouseOffsetY = mouseY
    dsOffsetX = dragSprite.position.x
    dsOffsetY = dragSprite.position.y
}

function mousePressed(){
    resetPressPos()
}

function mouseReleased(){
    mouseX = null
    mouseY = null
}

function mouseDragged(){
    if(0 <= dsOffsetX + mouseX - mouseOffsetX && dsOffsetX + mouseX - mouseOffsetX <= width && 0 <= dsOffsetY + mouseY - mouseOffsetY && dsOffsetY + mouseY - mouseOffsetY < height){
        dragSprite.position.x = dsOffsetX + mouseX - mouseOffsetX
        dragSprite.position.y = dsOffsetY + mouseY - mouseOffsetY
    }else{
        resetPressPos()
    }
}

function ex(){
    dragSprite.remove()
    removeSound.play()
}
