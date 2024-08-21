import { Swiper, Navigation, Keyboard, Pagination, Accordion } from './libs';

new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
  elementClass: 'acc-about-item',
  triggerClass: 'ac-about-trigger',
  panelClass: 'ac-about-panel',
  activeClass: 'is-about-active',
  openOnInit: [0],

  onOpen: currAboutElement => {
    const icon = currAboutElement.querySelector('.acc-about-icon');
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
  },

  onClose: currAboutElement => {
    const icon = currAboutElement.querySelector('.acc-about-icon');
    if (icon) {
      icon.style.transform = 'rotate(0deg)';
    }
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const firstElement = document.querySelector(
    '.accordion-container .acc-about-item'
  );
  if (firstElement && firstElement.classList.contains('is-about-active')) {
    const icon = firstElement.querySelector('.acc-about-icon');
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
  }
});

new Swiper('.about-container', {
  grabCursor: true,
  direction: 'horizontal',
  loop: true,
  speed: 400,

  slidesPerView: 2,
  spaceBetween: 0,
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 6,
    },
  },

  modules: [Navigation, Keyboard],
  navigation: {
    nextEl: '.about-skill-icon',
  },

  keyboard: {
    enabled: true,
  },
});
