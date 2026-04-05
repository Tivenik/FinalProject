export function initFeedbackLogic() {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  const nameInput = document.getElementById("fb-name");
  const emailInput = document.getElementById("fb-email");
  const messageInput = document.getElementById("fb-message");

  function showError(input, message) {
    const container = input.closest(".input-group") || input.parentElement;
    let error = container.querySelector(".error-text");

    if (!error) {
      error = document.createElement("div");
      error.className = "error-text";
      container.appendChild(error);
    }

    error.textContent = message;
    input.classList.add("input-error");
  }

  function clearError(input) {
    const container = input.closest(".input-group") || input.parentElement;
    const error = container.querySelector(".error-text");
    if (error) error.remove();
    input.classList.remove("input-error");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    [nameInput, emailInput, messageInput].forEach(clearError);

    if (!nameInput.value.trim()) {
      showError(nameInput, "Введите имя");
      isValid = false;
    }


    if (!emailInput.value.trim()) {
      showError(emailInput, "Введите email");
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, "Некорректный email");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "Введите сообщение");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Сообщение должно быть не короче 10 символов");
      isValid = false;
    }

    if (!isValid) return;

    alert("Сообщение отправлено! Спасибо за обратную связь.");
    form.reset();
  });
}
