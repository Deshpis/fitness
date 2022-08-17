// Swiper 7.4.1
import './vendor/swiper';

const mobileWidth = window.matchMedia('(max-width:767px)');
const tabletWidth = window.matchMedia('(max-width:1199px)');
let numberCoaches = 4;
let marginRight = 40;

const breakpointChecker = () => {
  if (tabletWidth.matches) {
    numberCoaches = 2;
    marginRight = 30;
  }

  if (mobileWidth.matches) {
    numberCoaches = 1;
  }
};
tabletWidth.addListener(breakpointChecker);
breakpointChecker();

const swiperCoaches = new Swiper('.coaches__swiper', {
  simulateTouch: false,
  slidesPerView: numberCoaches,
  spaceBetween: marginRight,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
