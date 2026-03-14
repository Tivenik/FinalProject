import { hasSizes, calcPrice, calcWeight, getUnit, buildCartItem } from "../../Utils/ProductHelpers/index.js";
import { getCookie, setCookie } from "../../Cookies/index.js";
import { renderCartWidget } from "../Widget/index.js";
import ProductPopup from "../ProductPopup/index.js";
import { showToast } from "../Toast/index.js";

export default function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const basePrice = Number(product.price);
  const hasSizesFlag = hasSizes(product);
  const unit = getUnit(product);

  card.innerHTML = `
    <div class="product-link">
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
    </div>

    ${hasSizesFlag ? `
      <div class="pizza-size">
        <label><input type="radio" name="size-${product.id}" value="s" checked> S</label>
        <label><input type="radio" name="size-${product.id}" value="m"> M</label>
        <label><input type="radio" name="size-${product.id}" value="l"> L</label>
      </div>
    ` : ''}

    <div class="text-block">
      <span class="price">${basePrice} $</span>
      <span class="weight">${product.weight} ${unit}</span>
    </div>

    <button class="add-to-cart">В корзину</button>
  `;

  card.querySelector('.product-link').addEventListener('click', () => {
    const popup = new ProductPopup(product);
    popup.open();
  });

  const priceEl = card.querySelector('.price');
  let sizeInputs = [];

  if (hasSizesFlag) {
    sizeInputs = card.querySelectorAll(`input[name="size-${product.id}"]`);

    sizeInputs.forEach(input => {
      input.addEventListener('change', () => {
        const finalPrice = calcPrice(basePrice, input.value);
        priceEl.textContent = `${finalPrice} $`;
        const weightEl = card.querySelector('.weight');
        const finalWeight = calcWeight(product.weight, input.value);
        weightEl.textContent = `${finalWeight} ${unit}`;    
      });
    });
  }

  card.querySelector('.add-to-cart').addEventListener('click', () => {
    let size = null;

    if (hasSizesFlag) {
      size = [...sizeInputs].find(i => i.checked).value;
    }

    const cartItem = buildCartItem(product, size);

    let cart = JSON.parse(getCookie('cart') || "[]");
    cart.push(cartItem);
    setCookie('cart', JSON.stringify(cart));

    renderCartWidget();

    document.dispatchEvent(new Event("cart-updated"));

    showToast("Товар добавлен в корзину");
  });

  return card;
}
