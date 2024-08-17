import { axios } from './libs';

const form = document.getElementById('work-form');
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');
const modalOverlay = document.querySelector('.work-modal-overlay');
const modalMessage = document.querySelector('.work-modal-info');
const modalTitle = document.querySelector('.work-modal-title');
const closeModalBtn = document.querySelector('.modal-close-btn');

const emailRegex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

function openModal(message) {
  modalMessage.textContent = message;
  modalTitle.textContent = ' Thank you for your interest in cooperation!';
  modalOverlay.style.opacity = '1';
  modalOverlay.style.pointerEvents = 'auto';
  modalOverlay.style.visibility = 'visible';
}
//Функція щоб відкривати помилкове вікно
function openErrModal(message) {
  modalMessage.textContent = message;
  modalTitle.textContent = 'Something went wrong';
  modalOverlay.style.opacity = '1';
  modalOverlay.style.pointerEvents = 'auto';
  modalOverlay.style.visibility = 'visible';
}
function closeModal() {
  modalOverlay.style.opacity = '0';
  modalOverlay.style.pointerEvents = 'none';
  modalOverlay.style.visibility = 'hidden';
}

// валидация почты. Чтоб Динамично подсвечивать ввод
function validateEmail() {
  const emailValue = emailInput.value.trim();
  if (emailValue === '') {
    emailInput.classList.remove('invalid'); // Убираем красную подсветку
    emailInput.classList.remove('valid');   // Убираем зеленую подсветку
    emailError.style.display = 'none';
  }// Скрыть сообщение об ошибке
  else if (!emailValue.match(emailRegex)) {
    emailInput.classList.add('invalid'); // Красная подсветка
    emailInput.classList.remove('valid'); // Убираем зеленую подсветку если была
    emailError.style.display = 'block'; // Показать сообщение об ошибке
  } else {
    emailInput.classList.remove('invalid'); // Убираем красную подсветку если была
    emailInput.classList.add('valid'); // Зеленая подсветка
    emailError.style.display = 'none'; // Скрыть сообщение об ошибке
  }
}
//чтобы убрать динамичность - поменять тут. Тут стоит blur - по потере фокуса нам хватит думаю. Для проверки по букве, чтоб еще динамичнее - ставьте input.
emailInput.addEventListener('blur', validateEmail);

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const emailValue = formData.get('email').trim();

  if (!emailValue.match(emailRegex)) {
    emailInput.classList.add('invalid');
    emailError.style.display = 'block';
    return;
  } else {
    emailInput.classList.remove('invalid');
    emailError.style.display = 'none';
  }
  const comment = formData.get('comments').trim();

  try {
    //!!!ТУТ САМЕ МІНЯТИ ПОСИЛАННЯ СЕРВЕРА(якщо щось неправильно вказано)
    const response = await axios.post('https://portfolio-js.b.goit.study/api-docs/#/Requests/post_requests', {
      email: emailValue,
      comments: comment,
    });

    const result = response.data;

    if (response.ok || response.status === 200) { // если ответ успешный
      openModal('The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.');
      validateEmail();
    } else {
      openErrModal(`Error: ${result.message}`);
    }

  } catch (error) {
    console.log(error);
    openErrModal('An unexpected error occurred. Please write another information or try later.');
  }
});

closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function(event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

//закрытие по клавише Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
