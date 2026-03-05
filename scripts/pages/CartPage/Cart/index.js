import { getCookie, setCookie } from "../../../Cookies/index.js";
import { openCheckoutModal } from "../../../Utils/Popup/index.js";


class Cart {
    constructor() {
        this.item = document.createElement('main');
        this.item.classList.add('main');

        this.content = document.createElement('div');
        this.content.classList.add('content-page');

        this.item.appendChild(this.content);
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
        document.dispatchEvent(new Event('cart-updated'));
    }

    renderEmptyCart(target) {
        target.innerHTML = `
            <div class="cart-items">
                <h2>Корзина пуста</h2>
            </div>
        `;
    }

    render() {
        this.content.innerHTML = "";

        const items = this.getCartItems();
        const container = document.createElement('div');
        container.classList.add('cart-items');

        const validItems = items.filter(item => item && item.price != null);

        if (validItems.length === 0) {
            this.renderEmptyCart(this.content);
            return this.item;
        }

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

        this.content.appendChild(container);
        return this.item;
    }
}

export default Cart;
