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

  // Маска для телефона
  const inputPhone = document.querySelectorAll('[data-input="phone"]');

  if (inputPhone) {
    [].forEach.call(inputPhone, function (input) {
      let keyCode;
      function mask(event) {
        let pos = input.selectionStart;
        if (pos < 3) {
          event.preventDefault();
        }
        let matrix = '+7(___)___-__-__';
        let i = 0;
        let def = matrix.replace(/\D/g, '');
        let val = input.value.replace(/\D/g, '');
        let newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
        i = newValue.indexOf('_');
        if (i !== -1) {
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, input.value.length).replace(/_+/g,
            function (a) {
              return '\\d{1,' + a.length + '}';
            }).replace(/[+()]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
          input.value = newValue;
        }
        if (event.type === 'blur' && input.value.length < 5) {
          input.value = '';
        }
      }
      input.addEventListener('input', mask, false);
      input.addEventListener('focus', mask, false);
      input.addEventListener('blur', mask, false);
      input.addEventListener('keydown', mask, false);
    });
  }

  // Сохранение формы в localstorage

  const lessonForm = document.querySelector('[data-form="free-lesson"]');

  if (lessonForm) {
    const feedbackName = document.querySelector('[data-input="name"]');
    const feedbackPhone = document.querySelector('[data-input="phone"]');
    const feedbackInputs = [feedbackName, feedbackPhone];
    const feedbackSubmit = document.querySelector('[data-input="submit"]');

    const changeHandler = (element) => () => {
      localStorage.setItem(element.name, element.value);
    };

    const attachEvents = () => {
      for (let i = 0; i < feedbackInputs.length; i++) {
        feedbackInputs[i].addEventListener('change', changeHandler(feedbackInputs[i]));
      }
    };

    const checkStorage = () => {
      for (let i = 0; i < feedbackInputs.length; i++) {
        feedbackInputs[i].value = localStorage.getItem(feedbackInputs[i].name);
      }

      attachEvents();
    };

    checkStorage();

    const clearStorage = () => {
      localStorage.clear();
    };

    for (let i = 0; i < feedbackSubmit.length; i++) {
      feedbackSubmit[i].addEventListener('click', clearStorage);
    }
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
