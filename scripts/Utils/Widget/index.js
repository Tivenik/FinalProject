import { getCookie } from "../../Cookies/index.js";
import { calcPrice } from "../../Utils/ProductHelpers/index.js";

export async function renderCartWidget() {
  const widget = document.querySelector('.cart-widget');
  if (!widget) return;

  widget.innerHTML = `
    <a href="#cart">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-basket3" viewBox="0 0 16 16">
          <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z"/>
        </svg>
        ... $
      </span>
    </a>
  `;

  const totalPrice = await getTotalPriceFast();
  widget.querySelector("span").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-basket3" viewBox="0 0 16 16">
      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z"/>
    </svg>
    ${totalPrice} $
  `;
}

async function getTotalPriceFast() {
  const cart = getCookie('cart');
  const items = cart ? JSON.parse(cart) : [];

  let products = [];

  try {
    const res = await Promise.race([
      fetch("http://localhost:3000/products"),
      new Promise((_, reject) => setTimeout(() => reject("timeout"), 500))
    ]);

    products = await res.json();
  } catch {
    console.warn("Сервер недоступен — оффлайн режим");
  }

  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) {
      return { price: item.price || 0 };
    }

    const finalPrice = item.size
      ? calcPrice(product.price, item.size)
      : product.price;

    return { price: finalPrice };
  });

  return cartProducts.reduce((sum, item) => sum + item.price, 0).toFixed(2);
}
