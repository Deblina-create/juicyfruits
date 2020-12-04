let productsInCart = [
  { productName: "banana", price: 33, ID: "456", quantity: 1 },
  { productName: "orange", price: 15, ID: "123", quantity: 1 },
];

$(function () {
  $.each(productsInCart, (i, products) => {
    console.log(products);
    let productContainer = $("<div>").attr("id", products.productName);
    $("<h2>").html(products.productName).appendTo(productContainer);
    $("<p>")
      .html("Price: " + products.price + " SEK")
      .appendTo(productContainer);
    $("<p>")
      .html("ID: " + products.ID)
      .appendTo(productContainer);
    $("<p>")
      .html("Quantity: " + products.quantity)
      .appendTo(productContainer);

    productContainer.appendTo($("body"));
  });
});
