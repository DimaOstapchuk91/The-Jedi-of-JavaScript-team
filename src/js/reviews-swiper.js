import { Swiper, Navigation, Pagination, axios } from './libs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// TODO
// 1. create layout for section and Swiper
// 2. get refs for Elements
// 3. on page load add event listner and fetch data https://portfolio-js.b.goit.study/api/reviews
// 4. if error returns
//     4.1 show with izitoast notification(left bottom side)
//     4.2  add mockup text(some default size for it should be)
// 5. create markup function
// 6. add swiper logic - need to think about buttons (if no items - disable next button)
// 7. add stiles mobile first

const refs = {
  swiper: document.querySelector('.swiper'),
  swiperNext: document.querySelector('.review-button-next'),
  swiperPrev: document.querySelector('.review-button-prev'),
  reviewsList: document.querySelector('.reviews-list'),
};

document.addEventListener('DOMContentLoaded', renderReviews);

const swiperForReviews = new Swiper(refs.swiper, {
  grabCursor: true,
  direction: 'horizontal',
  autoplay: {
    delay: 500,
    disableOnInteraction: false,
  },
  slidesPerView: 1,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1140: {
      slidesPerView: 4,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    },
  },

  modules: [Navigation],

  navigation: {
    nextEl: refs.swiperNext,
    prevEl: refs.swiperPrev,
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
              <img class="reviws-avatar"  loading="lazy" src="${avatar_url}" alt="reviewer avatar" />
              <p>${author}</p>
              <p>${review}</p>
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
