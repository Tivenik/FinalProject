export default function createFeedbackForm() {
  const wrapper = document.createElement("div");
  wrapper.className = "feedback-wrapper";

  wrapper.innerHTML = `
    <form id="feedback-form" class="feedback-form">
      <h2>Связаться с нами</h2>

      <label>Ваше имя</label>
      <input type="text" id="fb-name" placeholder="Введите имя" required>

      <label>Email</label>
      <input type="email" id="fb-email" placeholder="example@mail.com" required>

      <label>Сообщение</label>
      <textarea id="fb-message" placeholder="Ваше сообщение..." required></textarea>

      <button type="submit">Отправить</button>
    </form>
  `;

  return wrapper;
}
