import { Swiper, Navigation } from './libs';

const swiper = new Swiper('.swiper-container', {
    lazyPreloadPrevNext: 0,
    grabCursor: true,
    direction: 'horizontal',

    speed: 300,

    slidesPerView: 1,
    spaceBetween: 600,
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
            loop: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        },
    },
    modules: [Navigation],

    navigation: {
        nextEl: '.carousel-button.next',
        prevEl: '.carousel-button.prev',
    },
});











