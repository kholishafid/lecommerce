const displayModal = (title, element) => {
  const modal = document.createElement("modal-element");
  modal.active = { active: true, title, element };
  document.body.appendChild(modal);
};

const removeModal = () => {
  const modal = document.querySelector("modal-element");
  modal.remove();
  modal.active = false;
};

class ModalElement extends HTMLElement {
  constructor() {
    super();
  }

  set active({ active, title, element }) {
    if (active) {
      this._title = title;
      this.display();
      this.setContent(element);
    }
  }

  setContent(element) {
    const contentBody = this.querySelector(".modal-card-body");
    contentBody.appendChild(element);
  }

  display() {
    this.innerHTML = `
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">${this._title}</p>
            <button class="delete removeModal" aria-label="close"></button>
          </header>
          <section class="modal-card-body"></section>
        </div>
      </div>
    `;
    this.querySelectorAll(".removeModal").forEach((elem) => {
      elem.addEventListener("click", removeModal);
    });
  }
}

customElements.define("modal-element", ModalElement);
export { ModalElement, displayModal };
