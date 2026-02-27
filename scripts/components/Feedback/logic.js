export function initFeedbackLogic() {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fb-name").value.trim();
    const email = document.getElementById("fb-email").value.trim();
    const message = document.getElementById("fb-message").value.trim();

    if (!name || !email || !message) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    alert("Сообщение отправлено! Спасибо за обратную связь.");
    form.reset();
  });
}
