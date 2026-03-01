import { createSlider } from "../../Utils/Slider/index.js";

export default function renderHome(products, createProductCard) {
  const container = document.createElement('div');
  container.classList.add('content-page');

  const slider = createSlider ([
  {
    mobile: "image/slider1-mobile.jpg",
    tablet: "image/slider1-tablet.jpg",
    desktop: "image/slider1.jpg"
  },
  {
    mobile: "image/slider3-mobile.jpg",
    tablet: "image/slider3-tablet.jpg",
    desktop: "image/slider3.jpg"
  }
]);

  container.appendChild(slider);

  const productsBlock = document.createElement('div');
  productsBlock.classList.add('products');

  const groups = groupByCategory(products);

  for (const category in groups) {
    const block = document.createElement('div');
    block.classList.add('category-block');
    block.id = category;


    const title = document.createElement('h2');
    title.textContent = category;
    block.appendChild(title);

    const list = document.createElement('div');
    list.classList.add('category-products');

    groups[category].forEach(p => list.appendChild(createProductCard(p)));

    block.appendChild(list);
    productsBlock.appendChild(block);
  }

  container.appendChild(productsBlock);
  return container;
}

function groupByCategory(products) {
  const groups = {};
  products.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  return groups;
}