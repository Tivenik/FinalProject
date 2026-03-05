import App from "./components/App/App.js";
import Header from "./components/Header/index.js";
import Main from "./components/Main/index.js";
import Footer from "./components/Footer/index.js";
import Cart from './pages/CartPage/Cart/index.js';
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

const media = document.createElement('link');
media.rel = 'stylesheet';
media.href = 'css/media.css';
document.head.appendChild(media);

function renderPage() {
  const oldMain = document.querySelector('main');
  if (oldMain) oldMain.remove();

  let page;
  const hash = window.location.hash;

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

  root.insertBefore(page, footer);
}

window.addEventListener('hashchange', renderPage);

const app = new App();

async function start() {
  await app.fetchProducts();
  renderPage();
}

start();
