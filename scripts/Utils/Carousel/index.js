import { getCookie, setCookie } from "../../cookies/index.js";

export function createProductCarousel(products) {
  const carousel = document.createElement('div');
  carousel.classList.add('product-carousel');

  const prev = document.createElement('button');
  prev.className = 'carousel-prev nav-btn';
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'carousel-next nav-btn';
  next.textContent = '›';

  const track = document.createElement('div');
  track.classList.add('carousel-track');

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('carusel-product-card');

    card.innerHTML = `
      <a href="#product/${product.id}" class="product-link">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
      </a>
      <span class="price">${product.price} $</span>
      <button class="add-to-cart">В корзину</button>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => {
      let cart = JSON.parse(getCookie('cart') || "[]");
      cart.push(product);
      setCookie('cart', JSON.stringify(cart));
    });

    track.appendChild(card);
  });

  prev.addEventListener('click', () => {
    track.scrollLeft -= 300;
  });

  next.addEventListener('click', () => {
    track.scrollLeft += 300;
  });

  carousel.appendChild(prev);
  carousel.appendChild(track);
  carousel.appendChild(next);

  return carousel;
}
