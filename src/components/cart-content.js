import { getProductById } from "../data/product";
import Spinner from "../assets/icon/loader.svg";
import { removeFromCart } from "../data/cart";
import "../style/cart.css";

class CartContent extends HTMLElement {
  set cart(cart) {
    this._cart = cart;
    if (cart.total > 0) {
      this.render();
    } else {
      this.renderCartEmpty();
    }
  }

  renderCartEmpty() {
    this.innerHTML = "Your cart is empty";
  }

  connectedCallback() {
    this.renderSkeleton();
  }

  renderSkeleton() {
    const panel = document.createElement("div");
    panel.classList.add("cart-list");
    [...Array(3)].map(() => {
      const box = document.createElement("div");
      box.classList.add("cart-item");

      box.innerHTML = `
        <div class="my-2 columns px-3">
          <img src="${Spinner}" alt="spinner" class="mr-2 spinner" />
          <p>Loading...</p>
        </div>
      `;

      panel.append(box);
    });
    this.appendChild(panel);
  }

  render() {
    this.innerHTML = "";
    const panel = document.createElement("div");
    panel.classList.add("cart-list");
    this._cart.products.map((element) => {
      const item = getProductById(element.productId);
      const box = document.createElement("div");
      box.classList.add("cart-item");

      box.innerHTML = `     
        <div>
          <img src="${item.image}" style="width:50px;height:50px;object-fit:contain;" />
        </div>
        <div style="width:100%;">
          <p>
            ${item.title} <strong>(${element.quantity})</strong>
          </p>
          <div class="cart-item-detail">
            <div>
              <small>
                <strong>${item.price} $</strong>
              </small>
              </div>
          </div>
          </div>
          <button class="delete removeFromCart"></button>
      `;

      box.querySelector(".removeFromCart").addEventListener("click", () => {
        removeFromCart(element.productId);
      });

      panel.append(box);
    });
    const footerContent = document.createElement("div");
    footerContent.innerHTML = `
      <div class="cart-foot">
        <div>Total item : ${this._cart.total}</div>
        <button class="button is-primary">Checkout</button>
      </div>
    `;
    this.appendChild(panel);
    this.appendChild(footerContent);
  }
}

customElements.define("cart-content", CartContent);
export default CartContent;
