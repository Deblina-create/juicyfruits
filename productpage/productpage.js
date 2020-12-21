
let localStorage = window.localStorage;

class CartItem{
    constructor(fruit,quantity){
        this.quantity = quantity;
        this.fruit = fruit;
        
    }
}

let fruitList = [
  {
    image: { url: "../images/orange.jpg", text: "imgtext" },
    name: "Orange",
    price: 29,
    description: "Oranges are a type of low calorie, highly nutritious citrus fruit. As part of a healthful and varied diet, oranges contribute to strong, clear skin and can help lower a person’s risk of many conditions.rich in vitamin C",
    id: 101,
  },
  {
    image: { url: "../images/strawberries.jpg", text: "imgtext" },
    name: "Strawberry",
    price: 49,
    description: "They’re an excellent source of vitamin C and manganese and also contain decent amounts of folate (vitamin B9) and potassium. Strawberries are very rich in antioxidants and plant compounds, which may have benefits for heart health and blood sugar control",
    id: 102,
  },
  {
    image: { url: "../images/banana2.jpg", text: "imgtext" },
    name: "Banana",
    price: 29,
    description: "A wide variety of health benefits are associated with the curvy yellow fruit. Bananas are high in potassium and pectin, a form of fiber. They can also be a good way to get magnesium and vitamins C and B6. ",
    id: 103,
  },
  {
    image: { url: "../images/cherry.jpg", text: "imgtext" },
    name: "Cherry",
    price: 49,
    description: "Cherries are small stone fruits that come in a variety of colors and flavors. They are highly nutritious and packed with fiber, vitamins C, and potassium.",
    id: 201,
  },
  {
    image: { url: "../images/apple.jpg", text: "imgtext" },
    name: "Apple",
    price: 29,
    description: "Apples are a good source of fiber and vitamin C. They also contain polyphenols, which may have numerous health benefits.",
    id: 202,
  },
  {
    image: { url: "../images/pears.jpg", text: "imgtext" },
    name: "Pear",
    price: 29,
    description: "Pears are especially rich in folate, vitamin C, copper, and potassium. They’re also a good source of polyphenol antioxidants.",
    id: 203,
  },
  {
    image: { url: "../images/dragonfruit.jpg", text: "imgtext" },
    name: "Dragonfruit",
    price: 49,
    description: "Dragon fruit is a tropical fruit that has become increasingly popular in recent years. They are rich source of iron and magnesium.",
    id: 301,
  },
  {
    image: { url: "../images/kiwi.jpg", text: "imgtext" },
    name: "Kiwi",
    price: 49,
    description: "Kiwis are small fruits that pack a lot of flavor and plenty of health benefits. Their green flesh is sweet and tangy. It’s also full of nutrients like vitamin C, vitamin K, vitamin E, folate, and potassium. They also have a lot of antioxidants and are a good source of fiber",
    id: 302,
  },
  {
    image: { url: "../images/pomegranate.jpg", text: "imgtext" },
    name: "Pomegranate",
    price: 49,
    description: "The pomegranate is a fruit that contains hundreds of edible seeds called arils. They are rich in fiber, vitamins, minerals and bioactive plant compounds,some of which have potent medicinal properties.",
    id: 303,
  },
  {
    image: { url: "../images/avocado.jpg", text: "imgtext" },
    name: "Avocado",
    price: 49,
    description: "Avocado is a green, pear-shaped fruit often called an “alligator pear.” It is loaded with healthy fats, fiber and various important nutrients.",
    id: 304,
  },
];


$(document).ready(function(){
    

    const urlParams = new URLSearchParams(window.location.search);
    const fruitId = urlParams.get('fruitId');
    console.log(fruitId);

    let result = fruitList.filter(fruit => fruit.id == fruitId);

    //
    if(result && result.length > 0)
    {
      //call loadfruit function here
      loadFruit(result[0])
    }

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


function loadFruit(fruit){
    

        let card = $("<div>").addClass("card").css("width", "32rem");
        
        $("<img>").attr("src", fruit.image.url).attr("alt", fruit.image.text).addClass("card-img-top").appendTo(card);
        
        let cardBody = $("<div>").addClass("card-body");
        $("<h5>").html(fruit.name).addClass("card-title").appendTo(cardBody);
        $("<p>").html(fruit.description).addClass("card-text").appendTo(cardBody);
        $("<p>").html(fruit.price).addClass("card-text").appendTo(cardBody);
        let span = $("<span>");
        //$("<input>").attr("type", "hidden").attr("value", JSON.stringify(fruit)).appendTo(span);
        $("<input>").addClass("quantity").attr("type", "number").attr("placeholder","Quantity").attr("value", 1).attr("min", 1).appendTo(span);
        $("<input>").attr("type", "submit").attr("value", "add").addClass("addToCart").appendTo(span);
        span.appendTo(cardBody);
        cardBody.appendTo(card);
        card.appendTo($(".body"));
        $(".addToCart").on("click", function(){
            let qty = $(".quantity").val();
            let cartItem = new CartItem(fruit, qty);
            addToCart(cartItem);
            $(".quantity").val(1);
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
  
    
  // this creates the object in the cart
    if (fruitIndex == -1){
      cart.push(cartItem);
      
      
    }
    else {
      //this is to make sure not to add the same fruit object again. instead only change the quantity of the object
      cart[fruitIndex].quantity = parseInt(cart[fruitIndex].quantity) + parseInt(cartItem.quantity);
  
    }
    localStorage.setItem("cart", JSON.stringify(cart));
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