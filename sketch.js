var bg, bgImage
var boy, boyAnim, boyinjur;
var plant, plantImage;
var plant2, plant2Image;
var iGround;
var coin, coinImage;
var house ,houseImage;
var diamond, diamondImage;
var plantGrp, plant2Grp;
var diamondGrp, coinGrp;
var coinSound, diamondCollectSound;
var bgMusic;
var gameover, gameoverImage;
var reset, resetImage;
var score = 0;
var diam = 0;
var coinns = 0;
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;
 var gameoversound;



function preload(){
bgImage = loadImage("gamebg.png");
boyAnim = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png"
,"images/boy7.png","images/boy8.png","images/boy9.png","images/boy10.png","images/boy11.png");
plantImage = loadAnimation("images/pl1.png","images/pl2.png","images/pl3.png","images/pl4.png");
plant2Image = loadAnimation("images/plant1.png","images/plant2.png","images/plant3.png","images/plant4.png");
boyinjur = loadAnimation("boyinjur.png");
gameoverImage = loadImage("gameover.png");
resetImage = loadImage("reset.png");
houseImage = loadImage("house.png");
coinImage = loadImage("coin.png");
diamondImage = loadImage("blue.png");
coinSound = loadSound("coinCollect.mp3");
diamondCollectSound = loadSound("diamond collect.mp3");
bgMusic = loadSound("bgMusic.wav");
gameoversound = loadSound("gameOver.mp3");

}


function setup() {
canvas = createCanvas(1100,500);
background("black");

 bg = createSprite(980,295,1100,500);
 bg.addImage("bgImg",bgImage);
 bg.scale = 1.475;

 boy = createSprite(70,407,10,10);
 boy.addAnimation("boyAnimation",boyAnim);
 boy.scale = 0.5;
 boy.debug = false;
 boy.setCollider("rectangle",0,-10,160,300);

 iGround = createSprite(550,492,1100,25);
 iGround.visible = false;

 gameover = createSprite(550,150,10,10);
 gameover.addImage("gameoverImg",gameoverImage);
 gameover.scale = 0.8;
 gameover.visible = false;
 
 reset = createSprite(550,300,10,10);
 reset.addImage("resetPic",resetImage);
 reset.scale = 0.22;
 reset.visible = false;
 
 plantGrp = createGroup();
 plant2Grp = createGroup();
 diamondGrp = createGroup();
 coinGrp = createGroup();
bgMusic.loop();


}

function draw() {
if(gameState === PLAY){
 if(bg.x < 100){
  bg.x = 900;
 }
 bg.velocityX = -(6 + score/100);
 boy.collide(iGround);
 if(keyDown("space") && boy.y >380 ){
     boy.velocityY =  - 20;
 }

 boy.velocityY = boy.velocityY + 1;

 plants();
 coins();
 diamonds();

 score = score + Math.round(getFrameRate()/50);


 if(plantGrp.isTouching(boy)){
    gameoversound.play();
    plant.velocityX = 0;
    plant2.velocityX = 0;
     gameState = END;
 }

 if(plant2Grp.isTouching(boy)){
    gameoversound.play();
    plant.velocityX = 0;
    plant2.velocityX = 0;
    gameState = END;
}

if(coinGrp.isTouching(boy)){
    coinGrp.destroyEach();
    coinSound.play();
    coinns = coinns+1;
    
}

if(diamondGrp.isTouching(boy)){
    diamondGrp.destroyEach();
    diamondCollectSound.play();
    diam = diam+1;

}

}
else if(gameState === END){
   
    bg.velocityX = 0;
    bg.velocityY = 0;
    gameover.visible = true;
    reset.visible = true;
    score = score + 0;
    bgMusic.stop();
 boy.addAnimation("boyAnimation",boyinjur);
 diamondGrp.destroyEach();
 coinGrp.destroyEach();

 plantGrp.setLifetimeEach(-1);
 plant2Grp.setLifetimeEach(-1);

 if(mousePressedOver(reset)){
 boy = createSprite(70,407,10,10);
 boy.addAnimation("boyAnimation",boyAnim);
 boy.scale = 0.5;
 boy.debug = false;
 boy.setCollider("rectangle",0,-10,160,300);

     restart();
 }

}

 drawSprites();

fill("red")
stroke("blue");
textSize(32);
text("Score: "+score,900,50);

fill("yellow")
stroke("red");
textSize(32);
text("Coins: "+coinns,745,50);


fill("magenta")
stroke("purple");
textSize(32);
text("Diamonds: "+diam,530,50);


}

function plants(){
    var select = Math.round(random(1,2));
    if(frameCount % 80===0){
     plant = createSprite(1100,470,10,10);
     plant.velocityX = -(6 + score/100);
     plant.scale = 0.695;
     plant.lifetime = 500;
     plant.debug = false;
     plant.setCollider("rectangle",0,0,95,265);
     plantGrp.add(plant);


     plant2 = createSprite(1100,420,10,10);
     plant2.velocityX = -(6 + score/100);
     plant2.scale = 0.235;
     plant2.lifetime = 500;
     plant2.debug = false;
     plant2.setCollider("rectangle",0,0,308,455);
     plant2Grp.add(plant2);


    switch(select){
        case 1: plant.addAnimation("plantAnim",plantImage);
                
        break;

        case 2: plant2.addAnimation("plantAnim",plant2Image);
                
        default:
        break;
    }


 }
}

function coins(){
    if(frameCount%215===0){
        coin = createSprite(1100,320,10,10);
        coin.addImage("coinPic",coinImage);
        coin.scale = 0.64;
        coin.velocityX = -(6 + score/100);
        coin.lifetime = 500;
        coinGrp.add(coin);
        
    }
}

function diamonds(){
    if(frameCount%360===0){
        diamond = createSprite(1100,320,10,10);
        diamond.addImage("diamondPic",diamondImage);
        diamond.scale = 0.18;
        diamond.velocityX = -(6 + score/100);
        diamond.lifetime = 500;
        diamond.debug = false;
        diamond.setCollider("rectangle",0,0,280,240);
        diamondGrp.add(diamond);

    }
}

function restart(){
    gameover.visible = false;
    reset.visible = false;
    diamondGrp.destroyEach();
    coinGrp.destroyEach();
    plantGrp.destroyEach();
    plant2Grp.destroyEach();
    gameState = PLAY;
    bgMusic.loop();

 score = 0;
 diam = 0;
coinns = 0;

}