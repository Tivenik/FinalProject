import createFeedbackForm from "../../Utils/Feedback/index.js";
import { initFeedbackLogic } from "../../Utils/Feedback/logic.js";

export default function renderContactPage() {
  const widget = document.querySelector(".floating-cart-widget")
  if (widget) widget.remove();

  window.floatingWidgetInstance = null;

  const page = document.createElement('div');
  page.classList.add('content-page');

  page.innerHTML = `
    <div class = "block contact-block">
      <h2>Контакты</h2>
      <ul class="contact">
        <li><strong>Адрес:</strong> г. Минск, пр-т Мира, д. Кефира</li>
        <li><strong>Телефон:</strong> 8877</li>
        <li><strong>Время работы:</strong> Ежедневно, 8:00 — 23:00</li>
      </ul>
    </div>
  `;
  
  const form = createFeedbackForm();
  page.appendChild(form);

  const map = document.createElement('div');
  map.classList.add('map-block');

  map.innerHTML = `
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d150505.3137594113!2d27.42856089823989!3d53.88472951341654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfd35b1e6ad3%3A0xb61b853ddb570d9!2sMinsk%2C%20Minsk%20Region!5e0!3m2!1sen!2sby!4v1772205896139!5m2!1sen!2sby"
      width="auto" 
      height="450" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade"
      class="map">
    </iframe>
  `;

  page.appendChild(map);

  setTimeout(initFeedbackLogic, 0);

  return page;
}
