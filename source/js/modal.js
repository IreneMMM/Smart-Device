'use strict';

(function () {
  var KEYCODE = {
    esc: 27
  };
  var page = document.querySelector('.page');
  var button = document.querySelector('.page-header__button');
  var modal = document.querySelector('.modal');
  var close = modal.querySelector('.modal__button-close');
  var form = modal.querySelector('.modal__form');
  var userName = document.querySelector('input[name=name]');
  var userPhone = document.querySelector('input[name=phone]');
  var message = document.querySelector('input[name=question]');
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  var openmodal = function () {
    modal.classList.add('modal--opened');
    page.classList.add('page--disabled');
  };

  var closemodal = function () {
    modal.classList.remove('modal--opened');
    page.classList.remove('page--disabled');
  };

  try {
    storageName = localStorage.getItem('user-name');
    storagePhone = localStorage.getItem('user-phone');
  } catch (err) {
    isStorageSupport = false;
  }

  if (button) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      openmodal();

      if (storageName) {
        userName.value = storageName;
        userPhone.value = storagePhone;
        message.value = storage.message;
        message.focus();
      } else {
        userName.focus();
      }
    });
  }

  if (close) {
    close.addEventListener('click', function (evt) {
      evt.preventDefault();
      closemodal();
    });
  }

  if (form) {
    form.addEventListener('submit', () => {
      if (isStorageSupport) {
        if (userPhone.value) {
          localStorage.setItem('user-phone', userPhone.value);
        }
        if (userName.value) {
          localStorage.setItem('user-name', userName.value);
        }
      }
    });
  }
  if (window) {
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEYCODE.esc) {
        evt.preventDefault();
        if (modal.classList.contains('modal--opened')) {
          closemodal();
        }
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', function (evt) {
      if (evt.target === modal) {
        closemodal();
      }
    });
  }
})();
