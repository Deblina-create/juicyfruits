//Get cart from Local storage

let productsInCart = JSON.parse(localStorage.getItem("cart"));
console.log(productsInCart);

//Function to calculate total price of everything in cart.
function calculateTotalPrice() {
  let totalSum = 0;

  $.each(productsInCart, (i, product) => {
    productsSum = calculateProductSum(product);

    totalSum = totalSum + productsSum;
  });

  return totalSum;
}

//Function to calculate total price of quantities of individual product object in cart
function calculateProductSum(product) {
  let productSum = product.fruit.price * product.quantity;
  return productSum;
}
//Function to render a new total sum on load or when the quantities are changed. This is connected to the sum tag in the HTML
function renderSum() {
  totalSum = calculateTotalPrice();
  $("#sum").html("Total sum: " + totalSum);
}
//Event is triggered when + button is clicked. Adds 1 to the quantity from the input field and to the array.
//Also triggers events that update the sums
function addQuantity(event) {
  let totalQuantity = event.data.product.quantity + 1;
  event.data.product.quantity = totalQuantity;
  event.data.input[0].value = totalQuantity;
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  let productSum = calculateProductSum(event.data.product);
  event.data.price[0].textContent = productSum + " sek";
  renderSum();
}

//Alertbox that is triggered when product is to be removed
function alertBox(product) {
  if (confirm("Do you want to remove the product from your cart?")) {
    removeProduct(product);
  } else {
  }
}
//Function for removing products
function removeProduct(product) {
  let productID = product.fruit.id;
  console.log(productID);

  let pos = productsInCart
    .map(function (e) {
      return e.fruit.id;
    })
    .indexOf(productID);

  console.log(pos);
  productsInCart.splice(pos, 1);
  localStorage.setItem("cart", JSON.stringify(productsInCart));

  renderProducts();
  renderSum();
}

//Function to render the ID of the product
function renderID(event) {
  alertBox(event.data.product);
}

//Same as above, but is triggered when - button is clicked and subtracts instead
function subtractQuantity(event) {
  let totalQuantity = event.data.product.quantity - 1;

  if (totalQuantity >= 1) {
    event.data.product.quantity = totalQuantity;
    event.data.input[0].value = totalQuantity;
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    let productSum = calculateProductSum(event.data.product);

    event.data.price[0].textContent = productSum + " sek";
    renderSum();
  } else {
    alertBox(event.data.product);
  }
}

//A function which renders the products that are currently in the array
function renderProducts() {
  //Productcontainer for all information about all products in Local storage
  let productContainer = $("#productcontainer");

  //Make sure that the productscontainer is empty before rendering products
  $(productcontainer).empty();

  $.each(productsInCart, (i, product) => {
    console.log(product);

    //Create a wrapper for each individual product. For styling.
    let productWrapper = $("<div>")
      .attr({ id: "productwrapper" })
      .addClass("row")
      .appendTo(productContainer);

    //Wrapper for productimage. For styling
    let imgWrapper = $("<div>")
      .attr({ id: "imgwrapper" })
      .addClass("col-4")
      .appendTo(productWrapper);

    $("<img>").attr("src", product.fruit.image.url).appendTo(imgWrapper);

    //Wrapper for productdetails. For styling
    let detailsWrapper = $("<div>")
      .attr({ id: "detailswrapper" })
      .addClass("col-7")
      .appendTo(productWrapper);

    $("<p>")
      .html(product.fruit.name)
      .attr("id", "productname")
      .appendTo(detailsWrapper);

    $("<p>")
      .html("Product ID: " + product.fruit.id)
      .appendTo(detailsWrapper);

    let priceElementContainer = $("<p>").appendTo(detailsWrapper);
    $("<p>")
      .html(product.fruit.price + " sek/kg")
      .appendTo(priceElementContainer);
    let priceElement = $("<p>")
      .html(calculateProductSum(product) + " sek")
      .addClass("price")
      .appendTo(priceElementContainer);

    //Wrapper for the quantityinput with buttons
    let inputWrapper = $("<div>")
      .attr({ id: "inputwrapper" })
      .appendTo(detailsWrapper);

    let inputElement = $("<input>")
      .attr({ type: "number", id: "quantityinput" })
      .val(product.quantity)
      .on("keydown", false)
      .appendTo(inputWrapper);

    $("<button>")
      .attr({ type: "button", id: "sub" })
      .text("-")
      .appendTo(inputWrapper)
      .insertBefore(inputElement)
      .on(
        "click",
        {
          product: product,
          input: inputElement,
          price: priceElement,
        },
        subtractQuantity
      );

    $("<button>")
      .attr({ type: "button", id: "add" })
      .text("+")
      .appendTo(inputWrapper)
      .on(
        "click",
        {
          product: product,
          input: inputElement,
          price: priceElement,
        },
        addQuantity
      );

    //Wrapper for the trashcan. For styling
    let trashWrapper = $("<div>")
      .attr({ id: "trashwrapper" })
      .addClass("col-1")
      .appendTo(productWrapper);

    $("<i>").attr("class", "fas fa-trash-alt").appendTo(trashWrapper).on(
      "click",
      {
        product: product,
      },
      renderID
    );
  });
}

//Function for clearing Local storage when order is made
function placeOrder() {
  if (localStorage.getItem("cart") === null) {
    alert("Your cart is empty");
  } else {
    window.location.href = "../thankyoupage/thankyoupage.html";
    localStorage.clear();
  }
}

//Window onload function
$(function () {
  renderProducts();
  renderSum();
  $("#orderbutton").on("click", placeOrder);
});
