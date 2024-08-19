document.addEventListener('DOMContentLoaded', function () {
  // Вибираємо елемент секції
  const coversSection = document.querySelector('.covers-section');

  // Запуск анімації
   const startAnimation = () => {
    const marqueeLines = document.querySelectorAll('.marquee__line');
    marqueeLines.forEach(line => {
      line.style.animationPlayState = 'running';
    });
  };

  // Визначаємо зупинку анімації
  const stopAnimation = () => {
    const marqueeLines = document.querySelectorAll('.marquee__line');
    marqueeLines.forEach(line => {
      line.style.animationPlayState = 'paused';
    });
  };

  // Використовуємо Intersection Observer для моніторингу секції
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation();  // Запускаємо анімацію, коли секція у в'юпорті
      } else {
        stopAnimation();  // Зупиняємо анімацію, коли секція виходить з в'юпорту
      }
    });
  }, { threshold: 0.1 }); // Запускати, коли секція на 10% у в'юпорті

  // Стежимо за секцією
  observer.observe(coversSection);
});
