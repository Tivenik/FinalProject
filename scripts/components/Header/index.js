import { renderCartWidget } from "../../Utils/Widget/index.js";

class Header {
  constructor() {
    this.item = document.createElement('header');
    this.item.classList.add('header');
    this.createHeader();
  }

  createHeader() {

    // ----------ВЕРХНИЙ НАВИГАТОР----------

    const topNav = document.createElement('div');
    topNav.classList.add('nav-top');

    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    const liHome = document.createElement('li');
    const aHome = document.createElement('a');
    aHome.href = '#contact';
    aHome.textContent = 'Контакты';
    liHome.append(aHome);

    const liAbout = document.createElement('li');
    const aAbout = document.createElement('a');
    aAbout.href = '#about';
    aAbout.textContent = 'О нас';
    liAbout.append(aAbout);

    const liCart = document.createElement('li');
    const aCart = document.createElement('a');
    aCart.href = '#vacancies';
    aCart.textContent = 'Вакансии';
    liCart.append(aCart);

    ul.append(liHome, liAbout, liCart);
    nav.append(ul);
    topNav.append(nav);
    this.item.append(topNav);

    // ----------НИЖНИЙ НАВИГАТОР (ЯКОРЬ)----------

    const bottomNav = document.createElement('div');
    bottomNav.classList.add('nav-bottom');

    const wrapper = document.createElement('div');
    wrapper.classList.add('nav-wrapper');

    const logo = document.createElement('div');
    logo.classList.add('logo');

    const logoLink = document.createElement('a');
    logoLink.href = '#';

    const logoImg = document.createElement('img');
    logoImg.src = '../image/logo-low.svg';

    logoLink.append(logoImg);
    logo.append(logoLink);

    const navB = document.createElement('nav');
    const ulB = document.createElement('ul');

    const liDrink = document.createElement('li');
    const aDrink = document.createElement('a');
    aDrink.href = '#Напитки';
    aDrink.textContent = 'Напитки';
    liDrink.append(aDrink);

    const liCombo = document.createElement('li');
    const aCombo = document.createElement('a');
    aCombo.href = '#Комбо';
    aCombo.textContent = 'Комбо';
    liCombo.append(aCombo);

    const liPizza = document.createElement('li');
    const aPizza = document.createElement('a');
    aPizza.href = '#Пицца';
    aPizza.textContent = 'Пицца';
    liPizza.append(aPizza);

    ulB.append(liPizza, liDrink, liCombo);
    navB.append(ulB);

    // ---------- БУРГЕРН ----------

    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50"
      style="fill:#FFFFFF;">
      <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
      </svg>
    `;

    wrapper.append(logo, navB, burger);

    const cartWidget = document.createElement('div');
    cartWidget.classList.add('cart-widget');

    bottomNav.append(wrapper, cartWidget);
    this.item.append(bottomNav);

    // ---------- МОБИЛЬНОЕ МЕНЮ ----------
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = `
      <a href="#contact">Контакты</a>
      <a href="#about">О нас</a>
      <a href="#vacancies">Вакансии</a>
      <a href="#Пицца">Пицца</a>
      <a href="#Напитки">Напитки</a>
      <a href="#Комбо">Комбо</a>
    `;
    this.item.append(mobileMenu);

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }



  render() {
    return this.item;
  }
}

export default Header;
