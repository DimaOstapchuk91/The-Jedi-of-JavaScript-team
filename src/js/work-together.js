import { axios } from './libs';

const form = document.getElementById('work-form');
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');
const emailSuccess = document.getElementById('email-success');
const commentInput = document.getElementById('comments-input');
const commentWarning = document.getElementById('comments-warning');
const modalOverlay = document.querySelector('.work-modal-overlay');
const modalMessage = document.querySelector('.work-modal-info');
const modalTitle = document.querySelector('.work-modal-title');
const closeModalBtn = document.querySelector('.modal-close-btn');

const emailRegex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

document.addEventListener('DOMContentLoaded', function () {
  const savedEmail = localStorage.getItem('email');
  const savedComment = localStorage.getItem('comment');
  
  if (savedEmail) {
    emailInput.value = savedEmail;
    validateEmail();
  }
  
  if (savedComment) {
    commentInput.value = savedComment;
    validateComment(); 
  }
});

function openModal(message) {
  modalMessage.textContent = message;
  modalTitle.textContent = 'Thank you for your interest in cooperation!';
  modalOverlay.style.opacity = '1';
  modalOverlay.style.pointerEvents = 'auto';
  modalOverlay.style.visibility = 'visible';
  document.body.classList.add('no-scroll-work');
}

function openErrModal(message) {
  modalMessage.textContent = message;
  modalTitle.textContent = 'Something went wrong';
  modalOverlay.style.opacity = '1';
  modalOverlay.style.pointerEvents = 'auto';
  modalOverlay.style.visibility = 'visible';
  document.body.classList.add('no-scroll-work');
}

function closeModal() {
  modalOverlay.style.opacity = '0';
  modalOverlay.style.pointerEvents = 'none';
  modalOverlay.style.visibility = 'hidden';
  document.body.classList.remove('no-scroll-work');
}

function validateEmail() {
  const emailValue = emailInput.value.trim();
  if (emailValue === '') {
    emailInput.classList.remove('invalid');
    emailInput.classList.remove('valid');
    emailError.style.display = 'none';
    emailSuccess.style.display = 'none'; 
  } else if (!emailValue.match(emailRegex)) {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.style.display = 'block';
    emailSuccess.style.display = 'none'; 
  } else {
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    emailError.style.display = 'none';
    emailSuccess.style.display = 'block'; 

    localStorage.setItem('email', emailValue);
  }
}

function validateComment() {
  const commentValue = commentInput.value.trim();

  if (commentValue === '') {
    commentInput.classList.remove('valid');
    commentInput.classList.remove('invalid');
    commentWarning.style.display = 'none';
  } else if (commentValue.length >= 4) {
    commentInput.classList.add('valid');
    commentInput.classList.remove('invalid');
    commentWarning.style.display = 'none';

    localStorage.setItem('comment', commentValue);
  } else {
    commentInput.classList.add('invalid');
    commentInput.classList.remove('valid');
    commentWarning.style.display = 'block';
  }
}

emailInput.addEventListener('input', function () {
  validateEmail();
  localStorage.setItem('email', emailInput.value.trim());
});

commentInput.addEventListener('input', function () {
  validateComment();
  localStorage.setItem('comment', commentInput.value.trim());
});

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const emailValue = formData.get('email') ? formData.get('email').trim() : '';
  const commentValue = formData.get('comments') ? formData.get('comments').trim() : '';

  if (!emailValue || !commentValue || commentValue.length < 4) {
    if (!emailValue.match(emailRegex)) {
      emailInput.classList.add('invalid');
      emailError.style.display = 'block';
      emailSuccess.style.display = 'none'; 
    } else {
      emailInput.classList.remove('invalid');
      emailError.style.display = 'none';
      emailSuccess.style.display = 'block';
    }

    if (commentValue.length < 4) {
      commentInput.classList.add('invalid');
      commentWarning.style.display = 'block';
    } else {
      commentInput.classList.remove('invalid');
      commentWarning.style.display = 'none';
    }

    openErrModal('Please fill in both fields correctly.');
    return;
  }

  if (emailValue.match(emailRegex)) {
    emailInput.classList.remove('invalid');
    emailError.style.display = 'none';
    emailSuccess.style.display = 'block'; 
  }

  try {
    const response = await axios.post('https://portfolio-js.b.goit.study/api/requests', {
      email: emailValue,
      comment: commentValue,
    });

    if (response.status === 201) {
      openModal('The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.');
      
      form.reset();
      
      localStorage.removeItem('email');
      localStorage.removeItem('comment');
      
      validateEmail(); 
      validateComment();
    } else {
      openErrModal(`Error: ${response.data.message || 'Unknown error occurred.'}`);
    }
  } catch (error) {
    if (error.response) {
      openErrModal(`Error: ${error.response.data.message || 'An unexpected error occurred.'}`);
    } else if (error.request) {
      openErrModal('No response received from server. Please try again later.');
    } else {
      openErrModal('An error occurred while setting up the request. Please try again.');
    }
  }
});

closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function(event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});