import {Swiper} from 'swiper/swiper-bundle.esm.browser.min.js';

export const swiperCoaches = new Swiper('.coaches__swiper', {
  simulateTouch: false,
  loop: true,
  navigation: {
    nextEl: '.coaches__button--next',
    prevEl: '.coaches__button--prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    570: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1066: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

export const swiperReviews = new Swiper('.reviews__swiper', {
  simulateTouch: false,
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.reviews__button--next',
    prevEl: '.reviews__button--prev',
  },
});
