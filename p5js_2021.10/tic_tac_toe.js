let animation1
let animation2
let dragSprite
let onSquare = false
let type = ''
let backSound
let changePlayerSound

function preload(){
    // soundFormats('mp3', 'wav');
    backSound = loadSound('assets/tempo.mp3')
    changePlayerSound = loadSound('assets/buzz-grid-sounds-wav/bzzzt.wav')
}

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth - 20, windowHeight - 50)
    
    const sheet1 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    animation1 = loadAnimation(sheet1)

    const sheet2 = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Ghost/Idle (44x30).png', 44, 30, 10)
    animation2 = loadAnimation(sheet2)
    
    userStartAudio();
    backSound.loop()
    
}

function draw() {
    background(50)
    fill(255)

    textSize(40)
    textAlign(CENTER, TOP)
    text("Player: " + type, width / 2, 0)

    noFill()
    stroke(255, 204, 0);
    onSquare = false
    for(let i = 1; i <= 3; i++){
        for(let j = 1; j <= 3; j++){
            square(width/5*j,width/5*i, width/5)
            if(dragSprite != null && width/5*j < mouseX && width/5*(j+1) > mouseX && width/5*i < mouseY && width/5*(i+1) > mouseY){
                dragSprite.position.x = width/5*j+width/5/2
                dragSprite.position.y = width/5*i+width/5/2
                onSquare = true
            }
        }
    }
    
    if(dragSprite != null && !onSquare){
        dragSprite.position.x = mouseX
        dragSprite.position.y = mouseY
    }
    
    drawSprites()
}

function setMoveSprite(sprite, x = width/2, y = height/2){
    sprite.onMousePressed = function() {
      if(dragSprite == null){
        dragSprite = this
        print(this)
      }
    }
    sprite.onMouseReleased = function() {
        if(dragSprite == this){
            dragSprite = null
        }
        mouseX = null
        mouseY = null
    }
}

function mouseClicked(){
    if(dragSprite == null){
        changePlayerSound.play()
        sp = createSprite(width/2, height/4*3, 40, 40) // 座標は適当です
        if(type == 1){
            sp.addAnimation('default', animation1)
            sp.scale = (width/5) / 32 //マスの大きさとスケールを比率で合わせる（マスの大きさ /　アニメーション1フレームの横幅）
            type = 2
        }else{
            sp.addAnimation('default', animation2)
            sp.scale = (width/5) / 44 //マスの大きさとスケールを比率で合わせる（マスの大きさ /　アニメーション1フレームの横幅）
            type = 1
        }
        setMoveSprite(sp)
    }
}