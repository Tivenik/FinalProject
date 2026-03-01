export class App {
    constructor() {
        this.element = null;
    }

    create() {
        this.element = document.createElement('div');
        this.element.classList.add('app');
    }

    render() {
        document.body.appendChild(this.element);
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

    initHead() {
        const meta = document.createElement('meta');
        meta.setAttribute('charset', 'UTF-8');
        document.head.append(meta);

        const title = document.createElement('title');
        title.textContent = 'My Shop';
        document.head.append(title);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/style.css';
        document.head.append(link);
    }

    init() {
        this.initHead();
        this.create();
        this.render();
        return this.element;
    }

}

export default App;

