//Create variables here
var dog, dogImg,dogHappy;
var database;
var foodStock;

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
}


function draw() {  
  background(0,153,51);

  drawSprites();
  text("Note:Press Up Arrow Key To Feed Drago Milk!");
  textSize(30);
  fill(0);
  //add styles here

}
function readStock(data){
foodS = data.val();
}
function writeStock(x)
{
database.ref('/').update({
  Food:x
})
}

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
  }
