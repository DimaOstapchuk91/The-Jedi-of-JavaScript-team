import { Swiper, Navigation, Keyboard, axios, iziToast } from './libs';

const refs = {
  swiper: document.querySelector('.reviews-container'),
  swiperNext: document.querySelector('.review-button-next'),
  swiperPrev: document.querySelector('.review-button-prev'),
  reviewsList: document.querySelector('.reviews-list'),
};

document.addEventListener('DOMContentLoaded', renderReviews);

const swiperForReviews = new Swiper(refs.swiper, {
  grabCursor: true,
  direction: 'horizontal',

  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  slidesPerView: 1,
  spaceBetween: 16,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 4,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    },
  },

  modules: [Navigation, Keyboard],

  navigation: {
    nextEl: refs.swiperNext,
    prevEl: refs.swiperPrev,
  },

  keyboard: {
    enabled: true,
  },
});

async function getReviews() {
  const response = (
    await axios.get('https://portfolio-js.b.goit.study/api/reviews')
  ).data;
  return response;
}

async function renderReviews() {
  try {
    const reviewsData = await getReviews();
    const markup = reviewsData
      .map(
        ({
          author,
          avatar_url,
          review,
        }) => `          <li class="reviews-list-item swiper-slide">
              <img class="reviewers-avatar"  loading="lazy" src="${avatar_url}" alt="reviewer avatar" name="reviewers-avatar"/>
              <p class="reviewers-name">${author}</p>
              <p class="reviws-text">${review}</p>
          </li>`
      )
      .join('');
    refs.reviewsList.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    refs.reviewsList.insertAdjacentHTML(
      'beforeend',
      '<li class="error-mock"><p>SORRY, NOTHING TO SHOW HERE</p></li>'
    );
    iziToast.info({
      message: 'We`re sorry, but reviews list is currently unavailable',
      position: 'bottomRight',
      timeout: 2000,
      icon: '',
    });
  }
}
