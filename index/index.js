let localStorage = window.localStorage;
let pageSize = 3;



// defining the classes for both the objects

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
// make all fruit objects in local storage 
//make an array of the fruit objects for the local storage to access



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
         image: {url:"images/apple1.jpg", text:"imgtext"}, 
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
        name: "Dragon Fruit",
        price: "49 sek/kg",
        description: "rich in vitamin C",
        id:301
      },
      { 
        image: {url:"images/kiwi.jpg", text:"imgtext"},
        name: "kiwi",
        price: "49 sek/kg",
        description: "rich in vitamin C",
        id:302
      },
      { 
        image: {url:"images/pomegranate.jpg", text:"imgtext"},
        name: "Pomegranate",
        price: "55 sek/kg",
        description: "rich in vitamin C",
        id:303
      },
      { 
        image: {url:"images/avocado.jpg", text:"imgtext"},
        name: "Avocado",
        price: "79 sek/kg",
        description: "rich in vitamin C",
        id:304
      }
    ];



$(document).ready(function(){

 //this calls the loadAllFruits function that loads all the fruit objects 

    loadAllFruits();

     //logic for pagination 

    $("#showMore").on("click", function(){
      let currentPageIndex = parseInt(JSON.parse(localStorage.getItem("currentPageIndex")));
      if((currentPageIndex + 1) * pageSize <= fruitList.length){
        currentPageIndex++;
        localStorage.setItem("currentPageIndex", JSON.stringify(currentPageIndex));
        loadAllFruits();

        //this is for show more button to disappear once it reaches the last page

        if((currentPageIndex + 1) * pageSize > fruitList.length){
          $("#showMore").css("display", "none");
        }
      }
      
    });
   // this shows the fruit quantity in the cart when the page is refreshed

    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart && cart.length > 0){
      $("#cartBadge").html(cart.length);
      $("#cartBadge").css("display", "inline");
    }
    else
    {
      $("#cartBadge").html("");
      $("#cartBadge").css("display", "none");
    }

});

// this empties the fruit objects from loalstorage when the page is closed

window.onbeforeunload = function(e) {
  let currentPageIndex = JSON.parse(localStorage.getItem("currentPageIndex"));
  if(currentPageIndex){
    localStorage.removeItem("currentPageIndex");
  }
};

//from here starts all the funtion(definations)
  
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

  //this is to make sure not to add the same fruit object again. instead only change the quantity of the object

  if (fruitIndex == -1){
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    
  }
  else {
    cart[fruitIndex].quantity = parseInt(cart[fruitIndex].quantity) + parseInt(cartItem.quantity);
    localStorage.setItem("cart", JSON.stringify(cart));

  }

  //this only to display the number of objects in the badge

  if(cart.length > 0){
    $("#cartBadge").html(cart.length);
    $("#cartBadge").css("display", "inline");
  }
  else
  {
    $("#cartBadge").html("");
    $("#cartBadge").css("display", "none");
  }

}


//......yet to be done .......
//activate search option with fulltext search
//make the page responsive 
//redirect to cart page


