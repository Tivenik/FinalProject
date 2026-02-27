import ProductPage from "../../Utils/Product/index.js";

export default function renderProductPage(id) {
  return new ProductPage(id).render();
}
