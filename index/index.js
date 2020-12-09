let localStorage = window.localStorage;



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
// make all objects in local storage 
//make an array of the objects for the local storage to access

let fruitlist = [
       {
         image: {url:"images/orange.jpg", text:"imgtext"},
         name: "Orange",
         price: "29 sek/kg",
         description: "rich in vitamin C",
         index:1,
         id:101
       },
       { 
         image: {url:"images/orange.jpg", text:"imgtext"},
         name: "Strawberry",
         price: "49 sek/kg",
         description: "rich in vitamin C",
         index:1,
         id:102
       },
       {
         image: {url:"images/orange.jpg", text:"imgtext"},
         name: "banana",
         price: "29 sek/kg",
         description: "rich in vitamins and iron",
         index:1,
         id:103
       },
       { 
         image: {url:"images/orange.jpg", text:"imgtext"},
         name: "Peaches",
         price: "49 sek/kg",
         description: "rich in vitamin and minerals",
         index:2,
         id:201
       },
       {
         image: {url:"images/orange.jpg", text:"imgtext"}, 
         name: "Apple",
         price: "29 sek/kg",
         description: "rich in vitamin C",
         index:2,
         id:202
       },
       { 
         image: {url:"images/orange.jpg", text:"imgtext"},
         name: "Pear",
         price: "29 sek/kg",
         description: "rich in vitamin and energy",
         index:2,
         id:203
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
    loadAllFruits();
});

// create card for each fruit

function createCard(fruit){

    let card = $("<div>").addClass("card col-12 col-md-6 col-lg-4 minicard").css("width", "18rem");
    $("<img>").attr("src", fruit.image.url).attr("alt", fruit.image.text).addClass("card-img-top").appendTo(card);
    let cardBody = $("<div>").addClass("card-body");
    $("<h5>").html(fruit.name).addClass("card-title").appendTo(cardBody);
    $("<p>").html(fruit.price).addClass("card-text").appendTo(cardBody);
    let span = $("<span>");
    $("<input>").attr("type", "number").attr("id", "quantity").attr("placeholder","Quantity").attr("value", 1).appendTo(span);
    $("<input>").attr("type", "submit").attr("value", "add").appendTo(span);
    span.appendTo(cardBody);
    cardBody.appendTo(card);
    card.appendTo($(".productList .container .row"));
}


//function for loading fruits from local storage into index page

function loadAllFruits(){
    for (i=0; i<fruitlist.length; i++ ){
        createCard(fruitlist[i]);
    }

}
// use a validation to stop taking negative value
//make a cart object
//add to cart function
//update cart quantity on add to cart
//activate search option with fulltext search
//pagination
//redirect to cart page
//make the page responsive
//update footer





