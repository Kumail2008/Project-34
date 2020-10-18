//Create variables here
var dog, dogImg,dogHappy;
var database;
var foodStock,foodS;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");

	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,375,40,40);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(0,153,51);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  text("Note:Press Up Arrow Key To Feed Drago Milk!",130,10,300,20);
  
  //add styles here

}
function readStock(data){
foodS = data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
database.ref('/').update({
  Food:x
})
}


