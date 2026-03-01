import renderHome from "../pages/Home/index.js";
import renderAbout from "../pages/About/index.js";
import renderCartPage from "../pages/CartPage/index.js";
import renderContactPage from "../pages/Contact/index.js";
import renderVacanciesPage from "../pages/Vacancies/index.js";
import createProductCard from "../Utils/СreateProductCard/index.js";

class Main {
  constructor() {
    this.item = document.createElement('main');
    this.item.classList.add('main');
  }

  getProducts() {
    const data = localStorage.getItem('products');
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : parsed.products;
  }

  render() {
    this.updateContent();
    window.addEventListener('hashchange', () => this.updateContent());
    return this.item;
  }

  updateContent() {
    this.item.innerHTML = "";
    const hash = window.location.hash;

    const products = this.getProducts();

    let page;

    if (hash.startsWith('#product/')) {
      const id = Number(hash.split('/')[1]);
      page = renderProductPage(id);
    } else {
      switch (hash) {
        case '#about':
          page = renderAbout();
          break;
        case '#cart':
          page = renderCartPage();
          break;
        case '#contact':
          page = renderContactPage();
          break;
        case '#vacancies':
          page = renderVacanciesPage();
          break;
        default:
          page = renderHome(products, createProductCard);
      }
    }

    this.item.appendChild(page);
  }
}

export default Main;
