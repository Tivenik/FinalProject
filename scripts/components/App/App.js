export class App {
    constructor() {
        this.element = null;
    }
    async fetchProducts() {
        const saved = localStorage.getItem('products');
        if (saved) {
            return JSON.parse(saved);
        }
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        localStorage.setItem('products', JSON.stringify(data));

        return data;
    }
}

export default App;

