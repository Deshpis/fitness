import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // Инициализация видео

  function findVideos() {
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let button = video.querySelector('.video__button');
    let href = link.href.slice(32);

    button.addEventListener('click', () => {
      let iframe = createIframe(href);

      link.remove();
      button.remove();
      video.appendChild(iframe);
      video.classList.add('video--enabled');
    });

    link.removeAttribute('href');
  }

  function createIframe(href) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(href));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(href) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + href + query;
  }

  findVideos();

  // Табы

  const tabs = document.querySelector('[data-tab="container"]');

  const removeTriggerActive = () => {
    document.querySelectorAll('[data-tab="trigger"]').forEach((child) => child.classList.remove('tabs__trigger--active'));
  };

  const removeContentActive = () => {
    document.querySelectorAll('[data-tab="content"]').forEach((child) => child.classList.remove('tabs__content--active'));
  };

  if (tabs) {
    const firstTab = tabs.querySelector('[data-tab="trigger"]');

    tabs.querySelectorAll('[data-tab="trigger"]').forEach((item) => {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        const id = evt.target.getAttribute('href').replace('#', '');
        removeTriggerActive();
        removeContentActive();
        item.classList.add('tabs__trigger--active');
        document.getElementById(id).classList.add('tabs__content--active');
      });
    });

    firstTab.click();
  }

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
