import ProductItem from "./product-item.js";
import loaderImg from "../assets/icon/loader.svg";
import "../style/product-list.css";
import "../style/product-skeleton.css";

class ProductList extends HTMLElement {
  connectedCallback() {
    this.renderSkeleton();
  }

  set notFound(message) {
    this.renderSkeleton();
    this.removeAttribute("class");
    this.innerHTML = `
      <div class="hero is-warning py-4 ">
        <p class="has-text-centered is-size-2"><strong>?</strong></p>
        <p class="mt-1 has-text-centered">${message}</p>
      </div>
    `;
  }

  set products(products) {
    this._products = products;
    this.render();
  }

  renderSkeleton() {
    [...Array(12)].map(() => {
      const skeleton = document.createElement("div");
      skeleton.classList.add("product-skeleton");
      skeleton.innerHTML = `<div class="product-skeleton-load">
        <img src="${loaderImg}" class="spinner">
        <p>Loading...</p>
      </div>`;
      this.appendChild(skeleton);
    });
  }

  render() {
    this.innerHTML = "";
    this._products.map((elements) => {
      const product = document.createElement("product-item");
      product.classList.add("product-item");
      product.product = elements;
      this.appendChild(product);
    });
  }
}

customElements.define("product-list", ProductList);
export default ProductList;
