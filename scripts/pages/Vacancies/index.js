import createFeedbackForm from "../../components/Feedback/index.js";
import { initFeedbackLogic } from "../../components/Feedback/logic.js";

export default function renderVacanciesPage() {
  const page = document.createElement('div');
  page.classList.add('vacancies-page');

  page.innerHTML = `
    <div class="block vacancies-block">
      <h2>Вакансии</h2>

      <div class="company-about">
        <h3>О компании</h3>
        <p>
          Мы — современная служба доставки, которая делает акцент на качестве, скорости и честности.
          Каждый день мы готовим еду, которую сами любим, и доставляем её так, как хотели бы получить сами.
        </p>
        <p>
          В нашей команде ценят ответственность, уважение, инициативу и желание развиваться.
          Мы создаём рабочую атмосферу, в которой комфортно и новичкам, и опытным сотрудникам.
        </p>
      </div>

      <div class="vacancy-item">
        <h3>Курьер</h3>
        <ul>
          <li><strong>График:</strong> гибкий, смены 4–12 часов</li>
          <li><strong>Оплата:</strong> 8–12 BYN/час + бонусы</li>
          <li><strong>Обязанности:</strong> доставка заказов, общение с клиентами</li>
          <li><strong>Требования:</strong> ответственность, аккуратность</li>
        </ul>
      </div>

      <div class="vacancy-item">
        <h3>Пиццамейкер</h3>
        <ul>
          <li><strong>График:</strong> 2/2 или 3/3</li>
          <li><strong>Оплата:</strong> от 1200 BYN</li>
          <li><strong>Обязанности:</strong> приготовление пиццы, контроль качества</li>
          <li><strong>Требования:</strong> аккуратность, умение работать в команде</li>
        </ul>
      </div>

      <div class="vacancy-item">
        <h3>Оператор call‑центра</h3>
        <ul>
          <li><strong>График:</strong> удалённо или офис, смены 6–12 часов</li>
          <li><strong>Оплата:</strong> ставка + премии</li>
          <li><strong>Обязанности:</strong> приём заказов, консультации клиентов</li>
          <li><strong>Требования:</strong> грамотная речь, стрессоустойчивость</li>
        </ul>
      </div>

      <p class="vacancies-footer">
        Хотите стать частью команды? Оставьте заявку — мы свяжемся с вами в ближайшее время.
      </p>
    </div>
  `;

  const form = createFeedbackForm();
  page.appendChild(form);

  setTimeout(initFeedbackLogic, 0);

  return page;
}
