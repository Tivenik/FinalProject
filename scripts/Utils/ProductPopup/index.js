import { getCookie, setCookie } from "../../Cookies/index.js";
import { renderCartWidget } from "../Widget/index.js";
import { hasSizes, calcPrice, calcWeight, getUnit, buildCartItem } 
from "../../Utils/ProductHelpers/index.js";
import { showToast } from "../Toast/index.js";

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

    const hasSizesFlag = hasSizes(this.product);
    const basePrice = Number(this.product.price);
    const baseWeight = Number(this.product.weight);
    const unit = getUnit(this.product);

    popup.innerHTML = `
      <button class="popup-close">×</button>

      <div class="popup-content">
        <img src="${this.product.image}" alt="${this.product.title}">
        <div class="popup-info">
          <h3>${this.product.title}</h3>
          <p>${this.product.description}</p>

          ${hasSizesFlag ? `
            <div class="pizza-size">
              <label><input type="radio" name="popup-size" value="s" checked> S</label>
              <label><input type="radio" name="popup-size" value="m"> M</label>
              <label><input type="radio" name="popup-size" value="l"> L</label>
            </div>
          ` : ""}

          <div class="text_block">
            <span class="price">${basePrice} $</span>
            <span class="weight">${baseWeight} ${unit}</span>
          </div>

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

    const priceEl = popup.querySelector('.price');
    const weightEl = popup.querySelector('.weight');

    if (hasSizesFlag) {
      const sizeInputs = popup.querySelectorAll('input[name="popup-size"]');

      sizeInputs.forEach(input => {
        input.addEventListener('change', () => {
          const finalPrice = calcPrice(basePrice, input.value);
          const finalWeight = calcWeight(baseWeight, input.value);

          priceEl.textContent = `${finalPrice} $`;
          weightEl.textContent = `${finalWeight} ${unit}`;
        });
      });
    }

    popup.querySelector('.add-to-cart').addEventListener('click', () => {
      let size = null;

      if (hasSizesFlag) {
        size = popup.querySelector('input[name="popup-size"]:checked').value;
      }

      const cartItem = buildCartItem(this.product, size);

      let cart = JSON.parse(getCookie('cart') || "[]");
      cart.push(cartItem);
      setCookie('cart', JSON.stringify(cart));

      renderCartWidget();

      showToast("Товар добавлен в корзину");

      this.close();
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
