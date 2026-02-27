export default function renderAbout() {
  const div = document.createElement('div');
  div.classList.add('about-page');

    div.innerHTML = `
      <div class="about">
      <img src="../../image/bouncy-avatar.svg" alt="#">
        <div class="about-block">
          <h2>Кто мы</h2>
          <p>Мы — команда, которая искренне любит пиццу и делает всё, чтобы она попадала к вам горячей, ароматной и вкусной. Наша служба доставки пиццы родилась из желания объединить людей за одним столом, где каждый кусочек — это радость, уют и немного магии.<p>
        </div>
      </div>

      <div class= "block proposal">
        <div class= "proposal-text">
          <h2>Что мы предлагаем</h2>
          <ul>
            <li><strong>Свежие ингредиенты</strong> — мы используем только качественные продукты: сочные томаты, тянущийся сыр, ароматные специи и хрустящее тесто.</li>
            <li><strong>Разнообразие вкусов</strong> — от классической «Маргариты» до авторских рецептов с неожиданными сочетаниями.</li>
            <li><strong>Быстрая доставка</strong> — мы ценим ваше время и доставляем пиццу максимально быстро, сохраняя её тепло и вкус.</li>
            <li><strong>Удобный заказ</strong> — сайт, приложение или звонок — выбирайте, как вам удобно.</li>
          </ul>
        </div>
        <img src="../../image/bouncy-taco.svg" alt="#">
      </div>

      <div class="block advantages">
        <div class="advantages-block">
          <h2>Почему выбирают нас</h2>
          <div class="advantages-items">
            <div class="advantages-item">
              <p><strong>Честность и открытость</strong> — мы не скрываем состав, калорийность и происхождение продуктов.</p>
            </div>

            <div class="advantages-item">
              <p><strong>Любовь к деталям</strong> — от упаковки до общения с курьером — всё продумано.</p>
            </div>

            <div class="advantages-item">
              <p><strong>Поддержка местных производителей</strong> — мы сотрудничаем с локальными фермами и пекарнями.</p>
            </div>

            <div class="advantages-item">
              <p><strong>Поддержка местных производителей</strong> — мы сотрудничаем с локальными фермами и пекарнями.</p>
            </div>
          </div>
        </div>
        <img src="../../image/bouncy-yellow-cup.svg" alt="#"> 
      </div>

      <div class= "block about-contact">
        <img src="../../image/img1.svg" alt="#">
        <div class= "about-block">
          <h2>Связь с нами</h2>
          <p>Если у вас есть вопросы, предложения или просто хотите поделиться впечатлением — мы всегда на связи.</p>
        </div>
      </div>
    `;

  return div;
}
