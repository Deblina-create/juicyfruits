//Temporary array with products. Awaiting Local storage setup i cart

let productsInCart = [
  { productName: "banana", price: 33, ID: "456", quantity: 3 },
  { productName: "orange", price: 15, ID: "123", quantity: 2 },
];

//Function to calculate total price of everything in cart.
function calculateTotalPrice() {
  let totalSum = 0;
  $.each(productsInCart, (i, product) => {
    let productsSum = calculateProductSum(product);
    totalSum = totalSum + productsSum;
  });
  return totalSum;
}
//Function to calculate total price of everything in each individual product object in cart
function calculateProductSum(product) {
  let productSum = product.price * product.quantity;
  return productSum;
}

//Window onload function with all productinformation
$(function () {
  let productContainer = $("<div>").attr("id", "productSummaryContainer");
  $.each(productsInCart, (i, product) => {
    console.log(product);

    $("<h2>").html(product.productName).appendTo(productContainer);

    $("<p>")
      .html(
        "Price: " +
          calculateProductSum(product) +
          " SEK. " +
          product.price +
          " pp"
      )
      .appendTo(productContainer);
    $("<p>")
      .html("ID: " + product.ID)
      .appendTo(productContainer);
    $("<p>")
      .html("Quantity: " + product.quantity)
      .appendTo(productContainer);
    $("<p>")
      .html("Sum: " + calculateProductSum(product))
      .appendTo(productContainer);
  });

  let sum = calculateTotalPrice();

  $("<h3>")
    .html("Sum: " + sum)
    .appendTo(productContainer);

  productContainer.appendTo($("body"));
});
