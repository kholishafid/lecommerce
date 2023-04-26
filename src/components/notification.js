const displayNotif = () => {
  if (document.querySelector("notif-component")) {
    removeNotif();
  }
  const notification = document.createElement("notif-component");
  document.body.appendChild(notification);
};

const removeNotif = () => {
  const notif = document.querySelector("notif-component");
  notif.remove();
};

class Notification extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute("class", "notification container");
    this.innerHTML = `
      <button class="delete delete-notif"></button>
      Sucessfully add to cart.
    `;
    this.querySelector(".delete-notif").addEventListener("click", removeNotif);
  }
}

customElements.define("notif-component", Notification);
export { displayNotif, removeNotif, Notification };
