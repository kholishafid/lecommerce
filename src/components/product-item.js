import { addToCart } from "../data/cart.js";
import { displayModal } from "./modal.js";
import { displayNotif } from "./notification.js";
import ProductContent from "./product-content.js";
import "../style/product-item.css";

const displayDetail = (product) => {
  const content = document.createElement("product-content");
  content.item = product;
  displayModal("Product Details", content);
};

class ProductItem extends HTMLElement {
  set product(product) {
    this._product = product;
    this.render();
  }

  render() {
    const { title, image, id, price } = this._product;
    this.innerHTML = "";
    this.classList.add("card");
    this.innerHTML = `
  <div>
    <figure class="image is-4by3">
      <img src="${image}" alt="${title}" class="product-image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-size-6 product-title">${title}</p>
        <div class="subtitle pt-2 product-price">
          <p>$ ${price}</p>
        </div>
      </div>
    </div>
  </div>
  <footer class="card-footer">
      <a class="card-footer-item show-detail ">Details</a>
      <a class="card-footer-item addToCart ">+ Cart</a>
  </footer>
    `;
    this.querySelector(".show-detail").addEventListener("click", () =>
      displayDetail(this._product)
    );
    this.querySelector(".addToCart").addEventListener("click", () => {
      addToCart(id);
      displayNotif();
    });
  }
}

customElements.define("product-item", ProductItem);
export default ProductItem;
