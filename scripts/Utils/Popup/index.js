import { setCookie } from "../../cookies/index.js";
import { renderCartWidget } from "../Widget/index.js";


export function openCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
        <div class="modal">
            <h2>Оформление заказа</h2>

            <span>Ваше имя</span>
            <input type="text" id="order-name" placeholder="Введите имя">

            <span>Телефон</span>
            <input type="text" id="order-phone" placeholder="+375 (__) ___-__-__">

            <span>Адрес доставки</span>
            <input type="text" id="order-address" placeholder="Город, улица, дом">

            <button id="submit-order">Подтвердить</button>
            <button id="close-modal">Закрыть</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-modal').onclick = () => modal.remove();
    document.getElementById('submit-order').onclick = () => submitOrder(modal);

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

        const cartPage = document.querySelector('.content-page');
        if (cartPage) {
            cartPage.innerHTML = `
                <div class="cart-items">
                    <h2>Корзина пуста</h2>
                </div>
            `;
        }

        renderCartWidget();
    }

}
