var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacleGroup, cloudGroup;
var obstacle1Image, obstacle2Image;
var obstacle3Image, obstacle4Image;
var obstacle5Image, obstacle6Image;
var cloudImage;
var score, highScore = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");

  gameover = loadImage("gameOver.png");
  
  restartt = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("collided",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,30);
  
  //trex.debug = true;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  restart = createSprite(300,75,20,20);
  restart.visible = false;
  restart.addImage("restart",restartt);
  restart.scale = 0.4;
  
  gameOver = createSprite(300,125,20,20);
  gameOver.visible = false;
  gameOver.addImage("game over", gameover);
  gameOver.scale = 0.4;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround =       createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
  
}

function draw() {
  background("white");
  
  
  
  if(gamestate === PLAY){
    
    if(keyDown("space")&&trex.y >= 161) {
    trex.velocityY = -12;
    }
    
    ground.velocityX = -4;

    
    score = score + Math.round (getFrameRate()/67);
   
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    spawnClouds()
    spawnObstacles()
    
    if(trex.isTouching(obstacleGroup)){  
      gamestate = END;
    }
  }if(gamestate === END){
     
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    cloudGroup.setVelocityXEach (0);
    trex.velocityY = 0;
    
    obstacleGroup.setLifetimeEach (-1);
    cloudGroup.setLifetimeEach (-1);
    
   trex.changeImage("collided",trex_collided);
    
    restart.visible = true;
    gameOver.visible = true;
    
  }
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  textSize (16);
  text ("SCORE: " + score, 400, 20);
  text ("HIGH SCORE: " + highScore, 400, 40);
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 120 == 0){
    var rand = random (20,100);
    var cloud = createSprite(600,rand,20,20);
    cloud.velocityX = -3;
    cloud.addImage ("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.lifetime = 210;
    cloud.depth = trex.depth - 1;
    cloudGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 100 == 0){
    var obstacle = createSprite(600,170,20,20);
    var rand2 = Math.round (random (1,6))
    switch(rand2){
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
      case 3: obstacle.addImage(obstacle3Image);
              break;
      case 4: obstacle.addImage(obstacle4Image);
              break;
      case 5: obstacle.addImage(obstacle5Image);
              break;
      case 6: obstacle.addImage(obstacle6Image);
              break;
      default: break;
    }
    obstacle.velocityX = -4;
    obstacle.lifetime = 210; 
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);
  }
}

function reset(){

  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  if(highScore < score){
    highScore = score;
  }
  console.log(highScore);
  
  score = 0;

}