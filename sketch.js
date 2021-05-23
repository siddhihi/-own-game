
var jethalal,daya,babita;
var jethalalImg;
var dayaGrp , babitaGrp;
var score=0 ;
var jetha1 , jetha2,jetha3;
var life=3;
//var gameOver="end",reset;
var reset;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
jethalalImg=loadImage("Images/jethalal.png");
dayaImg=loadImage("Images/daya.png");
babitaImg=loadImage("Images/babita.png");
dayaImg=loadImage("Images/daya.png");
jetha1=loadImage("Images/jethalal.png");
jetha2=loadImage("Images/jethalal.png");
jetha3=loadImage("Images/jethalal.png");
gameOverImg=loadImage("Images/gameover.png");
resetImg=loadImage("Images/reset.jpg");

dayaSound=loadSound("Images/daya.mp3");

}

function setup() {
  createCanvas(600,800);
 
  jethalal=createSprite(300,600,30,30);
  jethalal.addImage("jethalal",jethalalImg);
  jethalal.scale=0.8;
  jethalal.setCollider("circle",0,0,50);
  //jethalal.debug=true;

 dayaGrp=new Group();
  babitaGrp=new Group();
  gameOver=createSprite(300,200);
  gameOver.scale=1.3;
  gameOver.addImage("gameOver",gameOverImg);
  reset=createSprite(250,500);
  reset.addImage("restart",resetImg);
  reset.visible=false;
 gameOver.visible = false;
 createLife();
}

function draw() {


if(gameState===PLAY){
    background('gold'); 
    textSize(25); 
    fill("blue");
text("Score: "+ score,50,20);

if ( keyDown ("left_arrow") ) {
jethalal.x = jethalal.x-3;

}
if(keyDown("right_arrow")){
  jethalal.x = jethalal.x+3;
}
if(keyDown("up_arrow")){
  jethalal.y=jethalal.y-3;
}
if(keyDown("down_arrow")){
    jethalal.y=jethalal.y+3;
}
spawnBabita();
spawnDaya();


 if(life==2){
  life1.visible=false;
}

 else if (life==1){
  life2.visible=false;
}

else if(life==0){
  life3.visible=false;
  dayaGrp.visible=false;
  babitaGrp.visible=false;
  jethalal.visible=false;
  gameState=END;
  gameEnd();
}
for(var i=0;i< babitaGrp.length;i++){
  if(babitaGrp.get(i).isTouching(jethalal)){
    babitaGrp.get(i).destroy();
    score=score+1;
  }
}
  

for(var i=0;i< dayaGrp.length;i++){
  if(dayaGrp.get(i).isTouching(jethalal)){
    dayaGrp.get(i).destroy();
    dayaSound.play();
    life=life-1;
  }
}




  
}
 if(gameState===END){
gameOver.visible=true;

dayaGrp.setVelocityXEach(0);
babitaGrp.setVelocityXEach(0);

if(mousePressedOver(reset)){
  resetGame();
}

}
  drawSprites();
}
function resetGame(){
  gameState=PLAY;
  gameOver.visible=false;
  reset.visible=false;
jethalal.x=300;
jethalal.y=600;
jethalal.visible=true;
  score=0;
  createLife();
}


function spawnBabita(){
if(frameCount % 400 === 0){
  babita=createSprite(Math.round(random(50,550)),-50);
  babita.addImage("babita",babitaImg);
  babita.scale=0.6;
  babita.velocityY= 6;
  jethalal.depth = babita.depth;
babita.setCollider("circle",0,0,30);
  jethalal.depth+=1;
  babita.lifetime=800;
  babitaGrp.add(babita);

//babita.debug=true;
}
}

function spawnDaya(){
  if (frameCount % 180===0 ){
    daya=createSprite(Math.round(random(120,400)),-50);
    daya.addImage("daya",dayaImg);
    daya.scale=0.8;
    daya.velocityY= 4;
    jethalal.depth = daya.depth;
    jethalal.depth+=1;
    daya.setCollider("circle",0,0,40);
    daya.lifetime=800;
    dayaGrp.add(daya);
    
    //daya.debug=true;
  }
}
function createLife(){
  life=3;
  life1=createSprite(40,50,10,20);
  life2=createSprite(75,50,10,20);
  life3=createSprite(115,50,10,20); 

  life2.addImage("jethalal",jethalalImg);
  life2.scale=0.3;

  life3.addImage("jethalal",jethalalImg);
  life3.scale=0.3;

  life1.addImage("jethalal",jethalalImg);
  life1.scale=0.3;
}
function gameEnd(){
  background("black");
  gameOver.visible=true;
  reset.visible=true;
babitaGrp.destroyEach();
dayaGrp.destroyEach();
}