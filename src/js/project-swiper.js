import { Swiper, Navigation, Keyboard } from './libs';

const swiper = new Swiper('.project-swiper-container', {
    grabCursor: true,
    direction: 'horizontal',

    speed: 300,

    slidesPerView: 1,
    spaceBetween: 10,

    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        1440: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
    },
    modules: [Navigation, Keyboard],

    navigation: {
        nextEl: '.carousel-button.next',
        prevEl: '.carousel-button.prev',
    },
});











