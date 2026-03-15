import { getCookie, setCookie } from "../../../Cookies/index.js";
import { openCheckoutModal } from "../../../Utils/Popup/index.js";
import { calcPrice, calcWeight } from "../../../Utils/ProductHelpers/index.js";

class Cart {
    constructor() {
        this.content = document.createElement('div');
        this.content.classList.add('content-page');

        this.products = [];

        this.loadProducts().then(() => {
            this.render();
        });
    }

    async loadProducts() {
        // Загружаем товары с JSON-сервера
        const res = await fetch("http://localhost:3000/products");
        this.products = await res.json(); // JSON-сервер отдаёт массив
    }

    getCartItems() {
        const raw = getCookie('cart');
        return raw ? JSON.parse(raw) : [];
    }

    saveCart(items) {
        setCookie('cart', JSON.stringify(items));
    }

    removeItem(index) {
        let items = this.getCartItems();
        items.splice(index, 1);
        this.saveCart(items);

        this.render();
        document.dispatchEvent(new Event('cart-updated'));
    }

    renderEmptyCart() {
        this.content.innerHTML = `
            <div class="cart-items">
                <h2>Корзина пуста</h2>
            </div>
        `;
    }

    render() {
        this.content.innerHTML = "";

        const cartItems = this.getCartItems();

        // Превращаем {id, size} → полноценный товар
        const cartProducts = cartItems
            .map(item => {
                const product = this.products.find(p => p.id === item.id);
                if (!product) return null;

                const finalPrice = item.size
                    ? calcPrice(product.price, item.size)
                    : product.price;

                const finalWeight = item.size
                    ? calcWeight(product.weight, item.size)
                    : product.weight;

                return {
                    ...product,
                    price: finalPrice,
                    weight: finalWeight,
                    size: item.size
                };
            })
            .filter(Boolean);

        if (cartProducts.length === 0) {
            this.renderEmptyCart();
            return this.content;
        }

        const container = document.createElement('div');
        container.classList.add('cart-items');

        cartProducts.forEach((product, index) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');

            div.innerHTML = `
                <div class="item-content">
                    <h3>${product.title}</h3>
                    <p>${product.price} $</p>
                    ${product.size ? `<p>Размер: ${product.size.toUpperCase()}</p>` : ""}
                </div>
                <button class="remove-btn">✕</button>
            `;

            div.querySelector('.remove-btn').addEventListener('click', () => {
                this.removeItem(index);
            });

            container.appendChild(div);
        });

        const bottomBlock = document.createElement('div');
        bottomBlock.classList.add('cart-bottom');

        const totalPrice = cartProducts
        .reduce((sum, item) => sum + item.price, 0)
        .toFixed(2);


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
        return this.content;
    }
}

export default Cart;
