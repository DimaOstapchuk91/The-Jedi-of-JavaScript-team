const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.classList.add('up-btn-show');
  } else {
    scrollToTopBtn.classList.remove('up-btn-show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
