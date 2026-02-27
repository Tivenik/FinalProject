import { getCookie, setCookie } from "../../cookies/index.js";
import { renderCartWidget } from "../../Utils/Widget/index.js";

class Cart {
    constructor() {
        this.item = document.createElement('main');
        this.item.classList.add('cart-page');
    }

    getCartItems() {
        const cart = getCookie('cart');
        return cart ? JSON.parse(cart) : [];
    }

    removeItem(index) {
        let items = this.getCartItems();
        items.splice(index, 1);
        setCookie('cart', JSON.stringify(items));

        this.render();
        renderCartWidget();
    }

    renderEmptyCart(target) {
        target.innerHTML = `
            <div class="cart-items">
                <h2>Корзина пуста</h2>
            </div>
        `;
    }

    render() {
        this.item.innerHTML = "";

        const items = this.getCartItems();
        const container = document.createElement('div');
        container.classList.add('cart-items');

        const validItems = items.filter(item => item && item.price != null);

        // если корзина пустая → используем единый метод
        if (validItems.length === 0) {
            this.renderEmptyCart(this.item);
            return this.item;
        }

        // товары
        validItems.forEach((product, index) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');

            div.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.price} $</p>
                <button class="remove-btn">Удалить</button>
            `;

            div.querySelector('.remove-btn').addEventListener('click', () => {
                this.removeItem(index);
            });

            container.appendChild(div);
        });

        // нижняя часть корзины
        const bottomBlock = document.createElement('div');
        bottomBlock.classList.add('cart-bottom');

        const totalPrice = validItems.reduce((sum, item) => sum + item.price, 0);

        const summary = document.createElement('div');
        summary.classList.add('cart-summary');
        summary.innerHTML = `<strong>Итого: ${totalPrice} $</strong>`;

        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'checkout-btn';
        checkoutBtn.textContent = 'Оформить заказ';
        checkoutBtn.addEventListener('click', () => openCheckoutModal());

        bottomBlock.appendChild(summary);
        bottomBlock.appendChild(checkoutBtn);

        container.appendChild(bottomBlock);

        this.item.appendChild(container);
        return this.item;
    }
}

export default Cart;


// ---------------- ПОПАП ----------------

function openCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
        <div class="modal">
            <h2>Оформление заказа</h2>

            <label>Ваше имя</label>
            <input type="text" id="order-name" placeholder="Введите имя">

            <label>Телефон</label>
            <input type="text" id="order-phone" placeholder="+375 (__) ___-__-__">

            <label>Адрес доставки</label>
            <input type="text" id="order-address" placeholder="Город, улица, дом">

            <button id="submit-order">Подтвердить</button>
            <button id="close-modal">Закрыть</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-modal').onclick = () => modal.remove();
    document.getElementById('submit-order').onclick = () => submitOrder(modal);
}


// ---------------- ОФОРМЛЕНИЕ ЗАКАЗА ----------------

function submitOrder(modal) {
    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();

    if (!name || !phone || !address) {
        alert("Пожалуйста, заполните все поля");
        return;
    }

    setCookie('cart', JSON.stringify([]));

    alert("Заказ оформлен! Мы свяжемся с вами.");

    modal.remove();

    const cartPage = document.querySelector('.cart-page');
    if (cartPage) {
        cartPage.innerHTML = `
            <div class="cart-items">
                <h2>Корзина пуста</h2>
            </div>
        `;
    }

    renderCartWidget();
}
