var monkey, monkeyImage;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var ground, groundImage;
var invGround;
var gameState = "play";
var score = 0;
var edges;
var tempBanana;
function preload() {

  monkeyImage = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  
}

function setup() {
    
    createCanvas(500, 400);
    
    ground = createSprite(250, 320, 500, 20);
    ground.x = ground.width/2;
    ground.scale = 1.9;
    ground.addImage(groundImage);
    //ground.shapeColor = "lime";
    ground.velocityX = -3;
    
    invGround = createSprite(250,340,500,10);
    invGround.visible = false;
    
    monkey = createSprite(100, 300, 20, 50);
    monkey.addAnimation("monkey", monkeyImage);
    monkey.scale = 0.1;
    
    // edges = createEdgeSprites();
    bananaGroup = new Group();
    obstacleGroup = new Group();
    
}


function draw() {
    
    background('skyblue');
    //console.log(monkey.y)
    text("Score: "+ score, 350,50);
  
   if(gameState === "play"){
    score = score + Math.round(frameRate()/ 60);

    if (ground.x < 0) {
      ground.x = width / 2;
    }
     
    monkey.collide(invGround);
  
    if(keyDown("space") && monkey.y > 250){
      monkey.velocityY = -12;
    }
  
    monkey.velocityY += 0.7;
    
    if(frameCount%60 === 0){
      tempBanana = spawnBanana();
      
    }
  
    if(frameCount%100 === 0){
      spawnObstacles();
    }
     
     if(monkey.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
     }
     
     
  
    if(monkey.isTouching(obstacleGroup)){
      gameState = "end"
    }
   }
  
   else if(gameState === "end"){
      ground.velocityX = 0;
      monkey.rotation = 90;
      monkey.velocityY = 10;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      //obstacleGroup.setLifetimeEach(-1);
      //bananaGroup.setLifetimeEach(-1);
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
     monkey.destroy();
     //gameState = "play";
    }
    
    drawSprites();
  if(gameState === "end"){
    fill("black");
    stroke(50);
    text("You Lose",200,200);
    
  }

}

function spawnBanana(){
  var randomHeight = Math.round(random(120,200));
  banana = createSprite(500,randomHeight,20,20);
  banana.addImage(bananaImage);
  banana.velocityX = -7;
  banana.scale = 0.1;
  banana.lifetime = 100;
  bananaGroup.add(banana);
}


function spawnObstacles(){
  //var randomHeight = Math.round(random(120,200));
  var obstacle = createSprite(500,320,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -5;
  obstacle.scale = 0.1;
  obstacle.lifetime = 100;
  obstacleGroup.add(obstacle);
}
