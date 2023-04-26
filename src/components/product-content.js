import { addToCart } from "../data/cart";
import { displayNotif } from "./notification";
import "../style/product-content.css";

class ProductContent extends HTMLElement {
  set item(item) {
    this._item = item;
    this.render();
  }

  render() {
    const { title, price, description, category, image, rating, id } =
      this._item;
    this.innerHTML = `
      <div class="content">
        <div class="content-product-head">
          <img src="${image}" alt="${title}" class="content-product-image" >
          <div class="content-product-detail">
            <p class="is-size-5 content-product-title">${title}</p>
            <p>Price : ${price}</p>
            <p>Category : ${category}</p>
            <p>Rating : ${rating.rate} (${rating.count})</p>
          </div>
        </div>
        <div class="content-product-body">
          <p>Description : </p>
          <pre class="content-desc">${description}</pre>
        </div>
        <div class="content-product-foot">
          <button class="button is-success addToCart">Add to cart</button>
        </div>
      </div>
    `;
    this.querySelector(".addToCart").addEventListener("click", () => {
      addToCart(id);
      displayNotif();
    });
  }
}

customElements.define("product-content", ProductContent);
export default ProductContent;
