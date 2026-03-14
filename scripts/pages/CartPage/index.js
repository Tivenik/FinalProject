  import Cart from "./Cart/index.js";

  export default function renderCartPage() {
    
    const widget = document.querySelector(".floating-cart-widget")
    if (widget) widget.remove();

    window.floatingWidgetInstance = null;
    return new Cart().render();
  }
