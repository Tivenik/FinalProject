import { getCookie, setCookie } from "../../cookies/index.js";
import { renderCartWidget } from "../Widget/index.js";
import ProductPopup from "../ProductPopup/index.js";

export default function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const basePrice = Number(product.price);
  const hasSizes = product.category === 'Пицца';

  card.innerHTML = `
    <div class="product-link">
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
    </div>

    ${hasSizes ? `
      <div class="pizza-size">
        <label><input type="radio" name="size-${product.id}" value="s" checked> S</label>
        <label><input type="radio" name="size-${product.id}" value="m"> M</label>
        <label><input type="radio" name="size-${product.id}" value="l"> L</label>
      </div>
    ` : ''}
    <div class="text-block">
    <span class="price">${basePrice} $</span>
    <span class="weight">${product.weight}</span>
    </div>
    <button class="add-to-cart">В корзину</button>
  `;

  card.querySelector('.product-link').addEventListener('click', () => {
    const popup = new ProductPopup(product);
    popup.open();
  });

  const priceEl = card.querySelector('.price');
  let sizeInputs = [];

  if (hasSizes) {
    sizeInputs = card.querySelectorAll(`input[name="size-${product.id}"]`);

    sizeInputs.forEach(input => {
      input.addEventListener('change', () => {
        let finalPrice = basePrice;

        if (input.value === "m") finalPrice = (basePrice * 1.5).toFixed(2);
        if (input.value === "l") finalPrice = (basePrice * 1.8).toFixed(2);

        priceEl.textContent = `${finalPrice} $`;
      });
    });
  }

  card.querySelector('.add-to-cart').addEventListener('click', () => {
    let finalPrice = basePrice;
    let size = null;

    if (hasSizes) {
      const selectedSize = [...sizeInputs].find(i => i.checked).value;
      size = selectedSize;

      if (selectedSize === "m") finalPrice = (basePrice * 1.5).toFixed(2);
      if (selectedSize === "l") finalPrice = (basePrice * 1.8).toFixed(2);
    }

    const cartItem = {
      ...product,
      ...(size ? { size } : {}),
      price: Number(finalPrice)
    };

    let cart = JSON.parse(getCookie('cart') || "[]");
    cart.push(cartItem);
    setCookie('cart', JSON.stringify(cart));
    renderCartWidget();
  });

  return card;
}
