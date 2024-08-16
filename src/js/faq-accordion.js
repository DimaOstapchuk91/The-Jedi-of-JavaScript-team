import { Accordion } from './libs';

new Accordion(document.querySelector('.faq-accordion-container'), {
  duration: 400,
  showMultiple: true,
  elementClass: 'faq-accordion-item',
  panelClass: 'faq-panel',
  triggerClass: 'faq-trigger',
  onOpen: function (currentElement) {
    console.log(currentElement);
  },
});
