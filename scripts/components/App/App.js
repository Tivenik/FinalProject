export class App {
    constructor() {
        this.element = null;
    }

    async fetchProducts() {
        try {
            const saved = localStorage.getItem('products');
            if (saved) {
                return JSON.parse(saved);
            }

            const response = await fetch('http://localhost:3000/products');
            
            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }

            const data = await response.json();
            localStorage.setItem('products', JSON.stringify(data));
            return data;

        } catch (error) {
            console.error("Не удалось загрузить товары:", error.message);
            return []; 
        }
    }
}

export default App;

