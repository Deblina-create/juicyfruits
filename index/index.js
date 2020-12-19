let localStorage = window.localStorage;
let pageSize = 3;






// defining the classes for both the objects

class Fruit{
    constructor(image, name, price, description, index, id,){
        this.image = image;
        this.name = name;
        this.price = price;
        this.description = description;
        this.index = index;
        this.id = id;
    }

}

class CartItem {
  constructor(fruit, quantity) {
    this.quantity = quantity;
    this.fruit = fruit;
  }
}

// make all objects in local storage
//make an array of the objects for the local storage to access

let fruitList = [
  {
    image: { url: "images/orange.jpg", text: "imgtext" },
    name: "Orange",
    price: 29,
    description: "rich in vitamin C",
    id: 101,
  },
  {
    image: { url: "images/strawberries.jpg", text: "imgtext" },
    name: "Strawberry",
    price: 49,
    description: "rich in vitamin C",
    id: 102,
  },
  {
    image: { url: "images/banana2.jpg", text: "imgtext" },
    name: "Banana",
    price: 29,
    description: "rich in vitamins and iron",
    id: 103,
  },
  {
    image: { url: "images/cherry.jpg", text: "imgtext" },
    name: "Cherry",
    price: 49,
    description: "rich in vitamin and minerals",
    id: 201,
  },
  {
    image: { url: "images/apple.jpg", text: "imgtext" },
    name: "Apple",
    price: 29,
    description: "rich in vitamin C",
    id: 202,
  },
  {
    image: { url: "images/pears.jpg", text: "imgtext" },
    name: "Pear",
    price: 29,
    description: "rich in vitamin and energy",
    id: 203,
  },
  {
    image: { url: "images/dragonfruit.jpg", text: "imgtext" },
    name: "Strawberry",
    price: 49,
    description: "rich in vitamin C",
    id: 301,
  },
  {
    image: { url: "images/kiwi.jpg", text: "imgtext" },
    name: "Strawberry",
    price: 49,
    description: "rich in vitamin C",
    id: 302,
  },
  {
    image: { url: "images/pomegranate.jpg", text: "imgtext" },
    name: "Strawberry",
    price: 49,
    description: "rich in vitamin C",
    id: 303,
  },
  {
    image: { url: "images/pomegranate.jpg", text: "imgtext" },
    name: "Strawberry1",
    price: 49,
    description: "rich in vitamin C",
    id: 304,
  },
];








$(document).ready(function(){
  console.log(fruitList);


 //this calls the loadAllFruits function that loads all the fruit objects 

    loadAllFruits(fruitList);

     //logic for pagination 

    $("#showMore").on("click", function(e){
      showMoreFruits(fruitList);
      
    });
   // this shows the fruit quantity in the cart badge when the page is refreshed or loaded else the badge disappears

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
    const fruitNames = fruitList.map(x => x.name);
    const fruitDescriptions = fruitList.map(x => x.description);
    const tags = [...fruitNames, ...fruitDescriptions];
    $( "#inputSearch" ).autocomplete({
        source: tags
    });

    $("#btnSearch").on("click", function(){
        let searchText = $("#inputSearch").val();
        let searchResult = fruitList.filter(eachFruit => eachFruit.name === searchText || eachFruit.description === searchText);
        loadSearchedFruits(searchResult);
        localStorage.setItem("currentPageIndex", "0");
    });
});

// this resets the fruit objects in loalstorage to the first page index when the page is closed

window.onbeforeunload = function(e) {
  let currentPageIndex = Number.parseInt(localStorage.getItem("currentPageIndex"));
  if(currentPageIndex){

    localStorage.removeItem("currentPageIndex");
  }
};




//.......from here starts all the funtion(definations).......
  
// create card for the given fruit

function createCard(fruit){

    let card = $("<div>").addClass("card col-12 col-md-6 col-lg-4 minicard").css("width", "18rem");
    let anchorLink = $("<a>").attr("href", "../productpage/productpage.html?fruitId=" + fruit.id.toString());
    $("<img>").attr("src", fruit.image.url).attr("alt", fruit.image.text).addClass("card-img-top").appendTo(anchorLink);
    anchorLink.appendTo(card);
    let cardBody = $("<div>").addClass("card-body");
    $("<h5>").html(fruit.name).addClass("card-title").appendTo(cardBody);
    $("<p>")
    .html(fruit.price + " sek/kg")
    .addClass("card-text")
    .appendTo(cardBody);
    let span = $("<span>");
    $("<input>").attr("type", "hidden").attr("value", fruit.id).appendTo(span);
    $("<input>").addClass("quantity").attr("type", "number").attr("placeholder","Quantity").attr("value", 1).attr("min", 1).appendTo(span);
    $("<input>").attr("type", "submit").attr("value", "add").addClass("addToCart").appendTo(span);
    span.appendTo(cardBody);
    cardBody.appendTo(card);
    card.appendTo($(".productList .container .row"));
}


//function for loading fruits from the fruitList array into index page after calculating how many fruits to be shown in the page at a certain moment

function loadAllFruits(fruits){
  $(".productList .container .row").empty();
  let currentPageIndex = Number.parseInt(localStorage.getItem("currentPageIndex"));
 
  if (!currentPageIndex){
    

    currentPageIndex = 0;
    localStorage.setItem("currentPageIndex", currentPageIndex.toString());
  }

  let fruitCount = pageSize * (currentPageIndex + 1); 
  if(fruitCount > fruits.length)
  {
    fruitCount = fruits.length;
  }
    for (i=0; i < fruitCount; i++ ){
         createCard(fruits[i]);
    }
    $(".addToCart").on("click", function(e){
      
      //this function will add the cliked fruit with mentioned quantity to cart
      let qty = parseInt($(this).siblings( ".quantity" ).val());
      let fruitId = $(this).siblings("[type=hidden]").val();
      let result = fruits.filter(fruit => fruit.id == fruitId);

      //
      if(result && result.length > 0)
      {
        let cartItem = new CartItem(result[0], qty);
        addToCart(cartItem);
        $(this).siblings( ".quantity" ).val(1);
      }
    });
}

function loadSearchedFruits(fruits){
  $(".productList .container .row").empty();

  
    for (i=0; i < fruits.length; i++ ){
         createCard(fruits[i]);
    }
    $(".addToCart").on("click", function(e){
      
      //this function will add the cliked fruit with mentioned quantity to cart
      let qty = Number.parseInt($(this).siblings( ".quantity" ).val());
      let fruitId = $(this).siblings("[type=hidden]").val();
      let result = fruits.filter(fruit => fruit.id == fruitId);

      //
      if(result && result.length > 0)
      {
        let cartItem = new CartItem(result[0], qty);
        addToCart(cartItem);
        $(this).siblings( ".quantity" ).val(1);
      }
    });
    $("#showMore").css("display", "none");
}

function showMoreFruits(fruits){
  let currentPageIndex = Number.parseInt(localStorage.getItem("currentPageIndex"));
      if((currentPageIndex + 1) * pageSize <= fruits.length){
        currentPageIndex++;
        localStorage.setItem("currentPageIndex", currentPageIndex.toString());
        loadAllFruits(fruits);

        //this is for show more button to disappear once it reaches the last page

        if((currentPageIndex + 1) * pageSize > fruits.length){
          $("#showMore").css("display", "none");
        }
      }
}


//add to cart function
function addToCart(cartItem) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = new Array();
  }
  let fruitIndex = cart.findIndex(function (cartIteInArray) {
    return cartIteInArray.fruit.id === cartItem.fruit.id;
  });


  
// this creates the object in the cart
  if (fruitIndex == -1){
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    
  }
  else {
    //this is to make sure not to add the same fruit object again. instead only change the quantity of the object
    cart[fruitIndex].quantity = parseInt(cart[fruitIndex].quantity) + parseInt(cartItem.quantity);

  
    localStorage.setItem("cart", JSON.stringify(cart));
  }


  //this only to display the number of fruits in the badge or to hide the badge if no fruits are in the cart

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



