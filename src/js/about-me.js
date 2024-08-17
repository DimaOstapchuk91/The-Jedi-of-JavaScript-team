import { Swiper, Navigation, Pagination, Accordion } from './libs';
new Accordion('.accordion-container', {
  ariaEnabled: true,
  duration: 400,
  collapse: true,
  elementClass: 'acc',
  triggerClass: 'ac-trigger',
  panelClass: 'ac-panel',
  activeClass: 'is-active',
  openOnInit: [0],
  beforeOpen: currElement => {
    console.log('Before opening:', currElement);
  },
  onOpen: currElement => {
    console.log('Opened:', currElement);
  },
  beforeClose: currElement => {
    console.log('Before closing:', currElement);
  },
  onClose: currElement => {
    console.log('Closed:', currElement);
  },
});
