class ProductPage {
  constructor(productId) {
    this.item = document.createElement('main');
    this.item.classList.add('product-page');
    this.productId = productId;
  }

  getProduct() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(p => p.id === Number(this.productId));
  }

  render() {
    this.item.innerHTML = "";

    const product = this.getProduct();

    if (!product) {
      this.item.textContent = "Товар не найден";
      return this.item;
    }

    const container = document.createElement('div');
    container.classList.add('product-detail');

    container.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class ="product-content">
      <h2>${product.title}</h2>
      <p><strong>Цена:</strong> ${product.price} $</p>
      <p><strong>Описание:</strong> ${product.description}</p>
      <button class="add-to-cart">В корзину</button>
      </div>
    `;

    container.querySelector('.add-to-cart').addEventListener('click', () => {
      let cart = JSON.parse(getCookie('cart') || "[]");
      cart.push(product);
      setCookie('cart', JSON.stringify(cart));
    });

    this.item.appendChild(container);
    return this.item;
  }
}

export default ProductPage;
