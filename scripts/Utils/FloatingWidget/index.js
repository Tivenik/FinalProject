import { getCookie } from "../../Cookies/index.js";
import { calcPrice } from "../../Utils/ProductHelpers/index.js";

export default class FloatingCartWidget {
    constructor() {
        this.widget = document.createElement("div");
        this.widget.classList.add("floating-cart-widget");
        document.body.appendChild(this.widget);

        this.widget.addEventListener("click", () => {
            this.widget.classList.toggle("open");
        });

        document.addEventListener("cart-updated", () => this.render());
        this.render();
    }

    getCartItems() {
        return JSON.parse(getCookie("cart") || "[]");
    }

    async getTotal() {
        const products = await fetch("http://localhost:3000/products").then(r => r.json());
        const items = this.getCartItems();

        return items.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return sum;

            const finalPrice = item.size
                ? calcPrice(product.price, item.size)
                : product.price;

            return sum + finalPrice;
        }, 0);
    }

    async render() {
        const total = await this.getTotal();

        this.widget.innerHTML = `
            <div class="fw-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z"/>
                </svg>
            </div>

            <span class="fw-total">${total.toFixed(2)} $</span>
        `;
    }
}
