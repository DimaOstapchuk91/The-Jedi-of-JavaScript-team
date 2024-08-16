import { axios } from './libs';

document.getElementById('work-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const emailInput = document.querySelector('.work-input');
  const emailValue = emailInput.value.trim();

  try {
    const response = await fetch('https://your-server-endpoint.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailValue })
    });

    const result = await response.json();

    if (response.ok) {
      // Успішна відповідь
      showModal('Your request has been successfully submitted!');
      document.getElementById('contact-form').reset(); // Очищає форму
    } else {
      // Обробка помилок
      showModal(`Error: ${result.message}`);
    }
  } catch (error) {
    showModal('An unexpected error occurred. Please try again.');
  }
});

function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
}

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('modal').classList.add('hidden');
});
