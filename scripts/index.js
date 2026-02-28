import './components/App/App.js';
import Header from "./components/Header/index.js";
import Main from "./Main/index.js";
import Footer from "./components/Footer/index.js";
import Cart from './components/Cart/index.js';
import { setCookie, getCookie } from "./cookies/index.js";
import ProductPage from "./Utils/Product/index.js";
import { renderCartWidget } from "./Utils/Widget/index.js";

const root = document.getElementById('root');

const header = new Header().render();
const footer = new Footer().render();

root.append(header, footer);
renderCartWidget();

const meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1";
document.head.appendChild(meta);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'css/style.css';
document.head.appendChild(link);

function addToCart(product) {
  let cart = getCookie('cart');
  cart = cart ? JSON.parse(cart) : [];

  cart.push(product);

  setCookie('cart', JSON.stringify(cart));
  renderCartWidget();
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const index = [...document.querySelectorAll('.add-to-cart')].indexOf(e.target);
    addToCart(products[index]);
  }
});

function renderPage() {
  const oldMain = document.querySelector('main');
  if (oldMain) oldMain.remove();

  let page;
  const hash = window.location.hash;

  if (hash.startsWith('#product/')) {
    const id = parseInt(hash.split('/')[1]);
    page = new ProductPage(id).render();
  } else {
    switch (hash) {
      case '#catalog':
        page = new Main().render();
        break;
      case '#cart':
        page = new Cart().render();
        break;
      default:
        page = new Main().render();
    }
  }

  root.insertBefore(page, footer);
}

window.addEventListener('hashchange', renderPage);

import App from "./components/App/App.js";

const app = new App();

async function start() {
  await app.fetchProducts();
  renderPage();
}

start();
