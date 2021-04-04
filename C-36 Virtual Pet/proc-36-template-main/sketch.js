var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed
var hour

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
  
  lastFed=database.ref('FeedTime');

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  feed=createButton("Feed the Dog");
  feed.position(700,95)
  feed.mousePressed(feedDog)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

  console.log(lastFed)

  drawSprites();
  fill("yellow")
  text("Time last fed: "+lastFed,200,95)
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


async function feedDog(){
  dog.addImage(happyDog);
  foodObj.getFedTime(lastFed)
  foodS -= 1;
  foodObj.deductFood()
  database.ref('/').update({
    Food:foodS
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
