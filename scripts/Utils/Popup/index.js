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
