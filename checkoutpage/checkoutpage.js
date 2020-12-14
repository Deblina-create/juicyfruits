//Temporary array with products. Awaiting Local storage setup i cart

let productsInCart = [
  { productName: "banana", price: 33, ID: "456", quantity: 3 },
  { productName: "orange", price: 15, ID: "123", quantity: 2 },
];

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
  let productSum = product.price * product.quantity;
  return productSum;
}
//Function to render a new total sum on load or when the quantities are changed. This is connected to the sum tag in the HTML
function renderSum() {
  totalSum = calculateTotalPrice();
  $("#sum").html("Sum: " + totalSum);
}
//Event is triggered when + button is clicked. Adds 1 to the quantity from the input field and to the array.
//Also triggers events that update the sums
function addQuantity(event) {
  let totalQuantity = event.data.product.quantity + 1;
  event.data.product.quantity = totalQuantity;
  event.data.input[0].value = totalQuantity;

  let productSum = calculateProductSum(event.data.product);

  event.data.price[0].textContent = productSum;
  renderSum();
}

function alertBox(product) {
  if (confirm("Do you want to remove the product from your cart?")) {
    removeProduct(product);
  } else {
  }
}

function removeProduct(product) {
  let productID = product.ID;
  console.log(productID);

  let pos = productsInCart
    .map(function (e) {
      return e.ID;
    })
    .indexOf(productID);

  console.log(pos);
  productsInCart.splice(pos, 1);

  renderProducts();
  renderSum();
}

//Same as above, but is triggered when - button is clicked and subtracts instead
function subtractQuantity(event) {
  let totalQuantity = event.data.product.quantity - 1;

  if (totalQuantity >= 1) {
    event.data.product.quantity = totalQuantity;
    event.data.input[0].value = totalQuantity;

    let productSum = calculateProductSum(event.data.product);

    event.data.price[0].textContent = productSum;
    renderSum();
  } else {
    alertBox(event.data.product);
  }
}

//A function which renders the products that are currently in the array
function renderProducts() {
  let productContainer = $("#productcontainer");
  $(productcontainer).empty();
  $.each(productsInCart, (i, product) => {
    console.log(product);

    $("<h2>").html(product.productName).appendTo(productContainer);

    let priceElementContainer = $("<span>")
      .html("Price: ")
      .appendTo(productContainer);
    let priceElement = $("<span>")
      .html(calculateProductSum(product))
      .addClass("price")
      .appendTo(priceElementContainer);
    $("span")
      .html(" SEK. " + product.price + " pp")
      .appendTo(productContainer);
    $("<p>").html(product.ID).appendTo(productContainer);

    let inputElement = $("<input>")
      .attr("type", "number")
      .val(product.quantity)
      .on("keydown", false)
      .appendTo(productContainer);

    $("<button>")
      .attr({ type: "button", id: "sub" })
      .text("-")
      .appendTo(productContainer)
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
      .appendTo(productContainer)
      .on(
        "click",
        {
          product: product,
          input: inputElement,
          price: priceElement,
        },
        addQuantity
      );
  });
}

//Window onload function
$(function () {
  renderProducts();
  renderSum();
});
