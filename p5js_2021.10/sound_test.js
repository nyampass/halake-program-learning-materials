let sound
let loopFlag = false

function preload(){
    // sound = loadSound('assets/buzz-grid-sounds-wav/zoom3.wav')
    sound = loadSound('assets/buzz-grid-sounds-wav/ding2.wav')
    // sound = loadSound('assets/sound.mp3')
}

function setup(){ //以下コメントを外してループ設定もいじれる
    pixelDensity(2)
    createCanvas(windowWidth-20, windowHeight - 50) //はみ出してスクロールが起こるため少し縮める（姑息療法）
    textSize(40)
    textAlign(CENTER)

    start = createSprite(width/4, height/4, width/2, height/2)
    pose = createSprite(width/4*3, height/4, width/2, height/2)
    // loop = createSprite(width/2, height/4*3, width, height/2)

    start.onMousePressed = function(){
        if(getAudioContext().state !== 'running') {
            getAudioContext().resume();
        }
        if(!sound.isPlaying()){
            sound.play()
        }
    }
    pose.onMousePressed = function(){
        if(!sound.isPaused()){
            sound.pause()
        }
    }
    // loop.onMousePressed = function(){
    //     if(loopFlag){ //Soud.isLooping()でループの有無を確認できるがSound.play()などでステータスが更新するため遅い
    //         sound.setLoop(false)
    //         loopFlag = false
    //     }else{
    //         sound.setLoop(true)
    //         loopFlag = true
    //     }
    // }
}

function draw(){
    background(50)
    fill(255)
    drawSprites()   
    text('play', width/4, height/4)
    text('stop', width/4*3, height/4)
    // if(loopFlag){
    //     text('loop', width/2, height/4*3)
    // }else{
    //     text('no loop', width/2, height/4*3)
    // }
}