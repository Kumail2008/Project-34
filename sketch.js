//Create variables here
var dog, dogImg,dogHappy;
var database;
var foodStock,foodS;
var feed,addFood,lastFed,fedTime;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");

	//load images here
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,375,40,40);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  
  textSize(20);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(0,153,51);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  
  
  //add styles here

}
function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
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


function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}