let localStorage = window.localStorage;
let pageSize = 3;





class Fruit{
    constructor(image, name, price, description, index, id,){
        this.image = image;
        this.name = name;
        this.prie = price;
        this.description = description;
        this.index = index;
        this.id = id;
    }
}

class CartItem{
  constructor(fruit,quantity){
      this.quantity = quantity;
      this.fruit = fruit;
      
 }
}
// make all objects in local storage 
//make an array of the objects for the local storage to access



let fruitList = [
       {
         image: {url:"images/orange.jpg", text:"imgtext"},
         name: "Orange",
         price: "29 sek/kg",
         description: "rich in vitamin C",
         id:101
       },
       { 
         image: {url:"images/strawberries.jpg", text:"imgtext"},
         name: "Strawberry",
         price: "49 sek/kg",
         description: "rich in vitamin C",
         id:102
       },
       {
         image: {url:"images/banana2.jpg", text:"imgtext"},
         name: "Banana",
         price: "29 sek/kg",
         description: "rich in vitamins and iron",
         id:103
       },
       { 
         image: {url:"images/cherry.jpg", text:"imgtext"},
         name: "Cherry",
         price: "49 sek/kg",
         description: "rich in vitamin and minerals",
         id:201
       },
       {
         image: {url:"images/apple.jpg", text:"imgtext"}, 
         name: "Apple",
         price: "29 sek/kg",
         description: "rich in vitamin C",
         id:202
       },
       { 
         image: {url:"images/pears.jpg", text:"imgtext"},
         name: "Pear",
         price: "29 sek/kg",
         description: "rich in vitamin and energy",
         id:203
       },
       { 
        image: {url:"images/dragonfruit.jpg", text:"imgtext"},
        name: "Strawberry",
        price: "49 sek/kg",
        description: "rich in vitamin C",
        id:301
      },
      { 
        image: {url:"images/kiwi.jpg", text:"imgtext"},
        name: "Strawberry",
        price: "49 sek/kg",
        description: "rich in vitamin C",
        id:302
      },
      { 
        image: {url:"images/pomegranate.jpg", text:"imgtext"},
        name: "Strawberry",
        price: "49 sek/kg",
        description: "rich in vitamin C",
        id:303
      },
      { 
        image: {url:"images/pomegranate.jpg", text:"imgtext"},
        name: "Strawberry1",
        price: "49 sek/kg",
        description: "rich in vitamin C",
        id:304
      }
    ];


//(write a function with if else to make sure it loads only once )

//access the array in local storage using ...getItem




$(document).ready(function(){

    /*console.log(localStorage.getItem("firstLoadFlag"));
    if(!localStorage.getItem("firstLoadFlag")){
        //execute first time
        localStorage.setItem("fruitsInStore",fruits)
        localStorage.setItem("firstLoadFlag", true);
    } 
    else
    {
        console.log("Inside else");
    }*/

    $("#cartBadge").css("display", "none");
    loadAllFruits();
    
    $("#showMore").on("click", function(){
      let currentPageIndex = parseInt(JSON.parse(localStorage.getItem("currentPageIndex")));
      if((currentPageIndex + 1) * pageSize <= fruitList.length){
        currentPageIndex++;
        localStorage.setItem("currentPageIndex", JSON.stringify(currentPageIndex));
        loadAllFruits();
        if((currentPageIndex + 1) * pageSize > fruitList.length){
          $("#showMore").css("display", "none");
        }
      }
      else{
        
      }
      
    });

   

});

window.onbeforeunload = function(e) {
  let currentPageIndex = JSON.parse(localStorage.getItem("currentPageIndex"));
  if(currentPageIndex){
    localStorage.removeItem("currentPageIndex");
  }
};
  
// create card for each fruit

function createCard(fruit){

    let card = $("<div>").addClass("card col-12 col-md-6 col-lg-4 minicard").css("width", "18rem");
    $("<img>").attr("src", fruit.image.url).attr("alt", fruit.image.text).addClass("card-img-top").appendTo(card);
    let cardBody = $("<div>").addClass("card-body");
    $("<h5>").html(fruit.name).addClass("card-title").appendTo(cardBody);
    $("<p>").html(fruit.price).addClass("card-text").appendTo(cardBody);
    let span = $("<span>");
    $("<input>").attr("type", "hidden").attr("value", fruit.id).appendTo(span);
    $("<input>").addClass("quantity").attr("type", "number").attr("placeholder","Quantity").attr("value", 1).attr("min", 1).appendTo(span);
    $("<input>").attr("type", "submit").attr("value", "add").addClass("addToCart").appendTo(span);
    span.appendTo(cardBody);
    cardBody.appendTo(card);
    card.appendTo($(".productList .container .row"));
}


//function for loading fruits from local storage into index page

function loadAllFruits(){
  $(".productList .container .row").empty();
  let currentPageIndex = JSON.parse(localStorage.getItem("currentPageIndex"));
  console.log("Current Page Index");
  console.log(currentPageIndex);
    
  if (!currentPageIndex){
    
    currentPageIndex = 0;
    localStorage.setItem("currentPageIndex", JSON.stringify(currentPageIndex));
  }
  let fruitCount = pageSize * (parseInt(currentPageIndex) + 1); 
  if(fruitCount > fruitList.length)
  {
    fruitCount = fruitList.length;
  }
    for (i=0; i < fruitCount; i++ ){
         createCard(fruitList[i]);
    }
    $(".addToCart").on("click", function(e){
      console.log("Inside add to cart event");
      //this function will add the cliked fruit with mentioned quantity to cart
      let qty = parseInt($(this).siblings( ".quantity" ).val());
      let fruitId = $(this).siblings("[type=hidden]").val();
      let result = fruitList.filter(fruit => fruit.id == fruitId);

      //
      if(result && result.length > 0)
      {
        let cartItem = new CartItem(result[0], qty);
        addToCart(cartItem);
        $(this).siblings( ".quantity" ).val(1);
      }
    

      
    });
}

//add to cart function
function addToCart(cartItem){
  let cart = JSON.parse(localStorage.getItem("cart"));
 
  if (!cart){
    cart = new Array();
  }
  let fruitIndex = cart.findIndex(function(cartIteInArray){
    return cartIteInArray.fruit.id === cartItem.fruit.id;
  });
  if (fruitIndex == -1){
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    
  }
  else {
    cart[fruitIndex].quantity = parseInt(cart[fruitIndex].quantity) + parseInt(cartItem.quantity);
    localStorage.setItem("cart", JSON.stringify(cart));

  }
  if(cart.length > 0){
    console.log(cart.length);
    $("#cartBadge").html(cart.length);
    $("#cartBadge").css("display", "inline");
  }


}


//update cart quantity on add to cart
//activate search option with fulltext search
//pagination
//redirect to cart page


