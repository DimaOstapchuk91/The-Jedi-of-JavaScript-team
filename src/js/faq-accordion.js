import { Accordion } from './libs';

new Accordion(document.querySelector('.faq-accordion-container'), {
  duration: 400,
  showMultiple: true,
  elementClass: 'faq-accordion-item',
  panelClass: 'faq-panel',
  triggerClass: 'faq-trigger',
  activeClass: 'is-faq-active',
  onOpen: function (currentElement) {
    const arrow = currentElement.querySelector('.faq-arrow');
    if (arrow) {
      arrow.style.transform = 'rotate(180deg)';
    }
  },
  onClose: currentElement => {
    const arrow = currentElement.querySelector('.faq-arrow');
    if (arrow) {
      arrow.style.transform = 'rotate(0deg)';
    }
  },
});
