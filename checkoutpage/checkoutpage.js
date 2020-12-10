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

//Function to calculate total price of everything in each individual product object in cart
function calculateProductSum(product) {
  let productSum = product.price * product.quantity;
  return productSum;
}

function renderSum() {
  totalSum = calculateTotalPrice();
  $("#sum").html(totalSum);
}

function addQuantity(event) {
  let totalQuantity = event.data.product.quantity + 1;
  event.data.product.quantity = totalQuantity;
  event.data.input[0].value = totalQuantity;

  let productSum = calculateProductSum(event.data.product);

  event.data.price[0].textContent = productSum;
  renderSum();
}

function subtractQuantity(event) {
  let totalQuantity = event.data.product.quantity - 1;

  if (totalQuantity > 0) {
    event.data.product.quantity = totalQuantity;
    event.data.input[0].value = totalQuantity;

    let productSum = calculateProductSum(event.data.product);

    event.data.price[0].textContent = productSum;
    renderSum();
  }
}

//Window onload function with all productinformation
$(function () {
  let productContainer = $("<div>").attr("id", "productSummaryContainer");
  $.each(productsInCart, (i, product) => {
    console.log(product);

    $("<h2>").html(product.productName).appendTo(productContainer);

    let priceElementContainer = $("<p>")
      .html("Price: ")
      .appendTo(productContainer);
    let priceElement = $("<span>")
      .html(calculateProductSum(product))
      .addClass("price")
      .appendTo(priceElementContainer);
    $("<p>")
      .html(" SEK. " + product.price + " pp")
      .appendTo(productContainer);
    $("<p>").html(product.ID).appendTo(productContainer);
    $("<p>")
      .html("Quantity: " + product.quantity)
      .appendTo(productContainer);

    let inputElement = $("<input>")
      .attr("type", "number")
      .val(product.quantity)

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

  let sum = renderSum();

  $("#sum").html(sum).appendTo(productContainer);

  productContainer.appendTo($("body"));
});
