class ProductPopup {
  constructor(product) {
    this.product = product;
    this.popup = null;
  }

  open() {
    // затемнение фона
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    // само окно
    const popup = document.createElement('div');
    popup.classList.add('popup');

    popup.innerHTML = `
      <button class="popup-close">×</button>

      <div class="popup-content">
        <img src="${this.product.image}" alt="${this.product.title}">
        <div class="popup-info">
          <h2>${this.product.title}</h2>
          <span class="price"><strong>Цена:</strong> ${this.product.price} $</span>
          <p><strong>Описание:</strong> ${this.product.description}</p>
          <button class="add-to-cart">В корзину</button>
        </div>
      </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    this.popup = overlay;

    // закрытие
    popup.querySelector('.popup-close').addEventListener('click', () => this.close());
    overlay.addEventListener('click', e => {
      if (e.target === overlay) this.close();
    });

    // добавление в корзину
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
