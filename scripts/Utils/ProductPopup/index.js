class ProductPopup {
  constructor(product) {
    this.product = product;
    this.popup = null;
  }

  open() {
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    const popup = document.createElement('div');
    popup.classList.add('popup');

    popup.innerHTML = `
      <button class="popup-close">×</button>

      <div class="popup-content">
        <img src="${this.product.image}" alt="${this.product.title}">
        <div class="popup-info">
          <h2>${this.product.title}</h2>
            ${this.product.description}
          <div class="text_block">
            <span class="price"> ${this.product.price} $</span>
            <span class="weight">${this.product.weight}</span>
          <div class="text_block">
          </p>
          <button class="add-to-cart">В корзину</button>
        </div>
      </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    this.popup = overlay;

    popup.querySelector('.popup-close').addEventListener('click', () => this.close());
    overlay.addEventListener('click', e => {
      if (e.target === overlay) this.close();
    });

    popup.querySelector('.add-to-cart').addEventListener('click', () => {
      let cart = JSON.parse(getCookie('cart') || "[]");
      cart.push(this.product);
      setCookie('cart', JSON.stringify(cart));
    });
  }

  close() {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
  }
}

export default ProductPopup;
