
var monkey, monkey_running
var monkeyCrash;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var survivalTime = 0;
var bg, bg2, bgImage;
var ground, invisibleGround,groundImage;
var score = 0;
var gameState = 'PLAY'

function preload(){
  
  //Load animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyCrash = loadAnimation("monkeyCrash.png");
  
  //Load images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("HD-Jungle-Wallpaper.jpg");
  groundImage = loadImage("dirt.png");


}



function setup() {
  
  //Create canvas
  createCanvas(650,400);
  
  //Create background
  bg = createSprite(100,200,400,400);
  bg.addImage(bgImage);
  bg.scale = 1.2;
  
  //Create ground
  ground = createSprite(400,350,900,10);
  ground.shapeColor = 'green';
  ground.addImage(groundImage);
  
  //Create invisible ground
  invisibleGround = createSprite(400,320,900,10);
  invisibleGround.visible = false;

  //Create monkey
  monkey = createSprite(80,315,20,20);
  monkey.scale = 0.1;
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("crashed",monkeyCrash);
  monkey.setCollider('rectangle',20,20);
  //Create groups
  obstacleGroup = new Group();
  foodGroup = new Group();

}


function draw() {
  
  //GAMESTATE
  gameState = 'PLAY';
  
  if(gameState === 'PLAY'){
    //Set background velocity 
    bg.velocityX = -6;
    if(bg.x<-500){
      bg.x = bg.width/2; 
    }
    
    //Set ground velocity
    ground.velocityX = -6;
    if(ground.x<0){
      ground.x = ground.width/2;
    }
  
    //Monkey jump
    if(keyDown('space') && monkey.y>=200){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleGround);
  
    //Call obstacles and food
    if(frameCount%80 === 0){
      bananas();
    }
    if(frameCount%300 === 0){
      obstacles();
    }
  
    //Collect bananas
    if(foodGroup.isTouching(monkey)){
      score = score +1;
      foodGroup.destroyEach();
    }
    survivalTime= Math.ceil(frameCount/frameRate());
  }
  //END GAME
  if(obstacleGroup.isTouching(monkey)){
    gameState = 'END';
  }
  
   if(gameState === 'END'){
    bg.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.velocityY = 5;
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    survivalTime = 0;
    monkey.changeAnimation("crashed",monkeyCrash);
  }
  
  drawSprites();
  
  //Display score
  textSize(40);
  stroke('white');
  text("Score: "+ score, 20,120);
  
  //Display survival time
  textSize(40);
  stroke('yellow');
  text("Survival Time: "+ survivalTime, 190,50);

}

function obstacles(){
  obstacle = createSprite(700,300);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6;
  obstacle.scale = 0.2;
  obstacle.lifetime = 700;
  obstacleGroup.add(obstacle);
}

function bananas(){
  banana = createSprite(700,200);
  banana.y = Math.round(random(100,180));
  banana.addImage(bananaImage);
  banana.velocityX = -6;
  banana.scale = 0.1;
  banana.lifetime = 700;
  foodGroup.add(banana);
}


