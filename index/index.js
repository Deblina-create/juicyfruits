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

    $('#checkoutModal').on('show.bs.modal', function (event) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart && cart.length > 0)
      {
        loadModalData(cart);
        $(".qtyModal").on("change", function(){
          
          let fruitId = $(this).siblings("[type=hidden]").val();

          let cartItemIndex = cart.findIndex(function (cartItemInArray) {
            return cartItemInArray.fruit.id == fruitId;
          });

          if (cartItemIndex != -1){
            let currentQty = Number.parseInt($(this).val());
            cart[cartItemIndex].quantity = currentQty;
            $(this).parent().siblings(".totalQtyContainer").find(".totalQtyModal").html(`${currentQty * cart[cartItemIndex].fruit.price} SEK`);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          console.log(fruitId);

         
          
        });
      }
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

//to load checkout modal data

function loadModalData(cart){
  $(".modal-body").empty();
    $.each(cart, (i, cartItem) => {
      createModalCartRow(cartItem);
    });
    
    $(".deleteModalCartItem").on("click", function(){
      deleteModalCartItem($(this));
    })

}

function deleteModalCartItem(deleteButton){
  
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart && cart.length > 0)
  {
    let fruitId = deleteButton.parent().parent().find(".hidQty").val();
    
    let currentItemIndex = cart.findIndex(function (cartItemInArray) {
      return cartItemInArray.fruit.id == fruitId;
    });

    if(currentItemIndex != -1){
      deleteButton.parent().parent().siblings(".dividerRow:first").remove();
      deleteButton.parent().parent().remove();
      cart.splice(currentItemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  
  
}

function createModalCartRow(cartItem){
  let row = $("<div>").addClass("row");
  let imageContainer = $("<div>").addClass("col-6 col-md-4 col-lg-2");
  $("<img>").attr("src", cartItem.fruit.image.url).attr("alt", cartItem.fruit.image.text).attr("width", "60px").attr("height","42px").addClass("img-thumbnail").appendTo(imageContainer);
  imageContainer.appendTo(row);
  let fruitNameContainer = $("<div>").addClass("col-6 col-md-4 col-lg-2");
  $("<span>").html(cartItem.fruit.name).css("font-weight", "bold").appendTo(fruitNameContainer);
  fruitNameContainer.appendTo(row);
  let priceContainer = $("<div>").addClass("col-6 col-md-4 col-lg-2");
  $("<span>").html(`${cartItem.fruit.price} SEK/Kg`).appendTo(priceContainer);
  priceContainer.appendTo(row);
  let qtyContainer = $("<div>").addClass("col-6 col-md-4 col-lg-2");
  $("<input>").addClass("hidQty").attr("type", "hidden").attr("value", cartItem.fruit.id).appendTo(qtyContainer);
  $("<input>").addClass("qtyModal").attr("type", "number").attr("value", cartItem.quantity).attr("min", 1).css("width", "100%").appendTo(qtyContainer);
  qtyContainer.appendTo(row);
  let totalContainer = $("<div>").addClass("col-6 col-md-4 col-lg-2 totalQtyContainer");
  $("<span>").addClass("totalQtyModal").html(`${cartItem.fruit.price * cartItem.quantity} SEK`).appendTo(totalContainer);
  totalContainer.appendTo(row);
  let deleteBtnContainer = $("<div>").addClass("col-6 col-md-4 col-lg-2");
  let deleteBtn = $("<a>").addClass("btn btn-dark my-2 my-sm-0 deleteModalCartItem");
  $("<i>").addClass("fas fa-trash-alt").appendTo(deleteBtn);
  deleteBtn.appendTo(deleteBtnContainer);
  deleteBtnContainer.appendTo(row);
  row.appendTo(".modal-body");

  let dividerRow = $("<div>").addClass("row dividerRow");
  let dividerContainer = $("<div>").addClass("col-12");
  $("<hr>").addClass("solid").appendTo(dividerContainer);
  dividerContainer.appendTo(dividerRow);
  dividerRow.appendTo(".modal-body");
}
  
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



