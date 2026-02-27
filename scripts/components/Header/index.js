import { renderCartWidget } from "../../Utils/Widget/index.js";

class Header {
  constructor() {
    this.item = document.createElement('header');
    this.item.classList.add('header');
    this.createHeader();
  }

  createHeader() {

    //------------------- ВЕРХНИЙ НАВИГАТОР ---------------------

    const topNav = document.createElement('div');
    topNav.classList.add('nav');

    //------------ 

    //------------ 

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

    //------------------- НИЖНИЙ НАВИГАТОР (ЯКОРЬ) ---------------------

    const bottomNav = document.createElement('div');
    bottomNav.classList.add('nov-bottom');

    const wrapper = document.createElement('div');

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

    wrapper.append(logo, navB);
    this.item.append(wrapper);


    const cartWidget = document.createElement('div');
    cartWidget.classList.add('cart-widget');
    this.item.append(cartWidget);

    bottomNav.append(wrapper,cartWidget);
    this.item.append(bottomNav);
  }

  render() {
    return this.item;
  }
}

export default Header;
