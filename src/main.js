import ProductList from "./components/product-list.js";
import { ModalElement, displayModal } from "./components/modal.js";
import { getProduct, product, filterProductByTitle } from "./data/product";
import "./style/index.css";
import "./style/bulma.css";
import { getCart } from "./data/cart.js";
import CartContent from "./components/cart-content.js";
import { Notification } from "./components/notification.js";

const productList = document.querySelector("product-list");
const cartButton = document.getElementById("checkCart");
document.addEventListener("DOMContentLoaded", async () => {
  await getProduct();
  productList.products = product;
});

document.querySelector(".search-bar").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  filterProductByTitle(query);
});

cartButton.addEventListener("click", () => {
  const content = document.createElement("cart-content");
  displayModal("Cart", content);
  content.cart = getCart();
});
