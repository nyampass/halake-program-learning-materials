let sheet
let coinSheet
let dragSprite
const createSpNum = 4;

function preload(){
    sheet = loadSpriteSheet('assets/Pixel Adventure 2/Enemies/Chicken/Idle (32x34).png', 32, 34, 13)
    coinSheet = loadSpriteSheet('assets/Rocky Roads/coin.png', 16, 16, 4)
}

function setup() {
    pixelDensity(2)
    createCanvas(windowWidth, windowHeight - 50)

    const animation = loadAnimation(sheet)
    const coinAnim = loadAnimation(coinSheet)

    for(let i = 0; i < createSpNum; i++){
        //画面から大きくはみ出さないように決め打ちで上下左右50の範囲には出現しないようにしました。
        w = random(50, width - 50)
        h = random(50, height - 50)
        
        if(i == 0){
            // h + 15はコインを隠す画像によってはコインが丸見えになってしまうため座標をずらしました（決め打ち）。
            // 使う画像を変えるなどして対応すると+15はいらなくなります。
            coinSp = createSprite(w, h + 15)
            coinSp.addAnimation('default', coinAnim)
            coinSp.scale = (width/5) / 16 / 3 //横幅の5分の1のサイズのさらに3分の1に調整。16は1コマ当たりの横幅。さらに3分の1したのはコインが手前に見えてしまうため（決め打ち
            charSp = createSprite(w, h)
            charSp.relate = true // 新しいパラメータを作っておく
        }else{
            charSp = createSprite(w, h)
            charSp.relate = false // 新しいパラメータを作っておく
        }

        charSp.addAnimation('default', animation)
        charSp.scale = (width/5) / 32 //横幅の5分の1のサイズに調整。32は1コマ当たりの横幅
        setMoveSprite(charSp)
    }
}

function draw() {
    background(50)
    fill(255)
    
    if(dragSprite != null){
        dragSprite.position.x = mouseX
        dragSprite.position.y = mouseY
    }

    drawSprites()
}

function setMoveSprite(sprite, x = width/2, y = height/2){
    sprite.onMousePressed = function() {
      if(dragSprite == null){
        dragSprite = this
      }
    }
    sprite.onMouseReleased = function() {
        if(dragSprite == this){
            dragSprite = null
            if(this.relate){
            }
        }
        mouseX = null //スマホタッチ操作の場合だと内部のカーソル座標更新タイミングで動作がおかしくなるため強制的にnullにする
        mouseY = null //上同様
    }
}
