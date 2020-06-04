function saveInfo() {
  //Savaing info
  let fname = document.getElementById("fname").value
  localStorage.setItem("fname", fname);
  let email = document.getElementById("email").value
  localStorage.setItem("email", email);
  let products = document.getElementById("products").value
  localStorage.setItem("products", products);
  let order = document.getElementById("order").value
  localStorage.setItem("order", order);
  let price = document.getElementById("price").innerHTML
  localStorage.setItem("price", price);
}

function retriveInfo() {
  //Calculating and adding everything to the second page
  let productPrice= parseInt(localStorage.getItem("price").substring(1,3));
  let numOfOrder =localStorage.getItem("order");
  let totalSum = numOfOrder *productPrice;
  document.getElementById("fname").innerHTML = localStorage.getItem("fname");
  document.getElementById("email").innerHTML = localStorage.getItem("email");
  document.getElementById("products").innerHTML = localStorage.getItem("products");
  document.getElementById("price").innerHTML = "$" + productPrice;
  document.getElementById("order").innerHTML = localStorage.getItem("order");
  document.getElementById("totalSum").innerHTML = "$"+totalSum;
}
