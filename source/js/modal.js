'use strict';

(function () {
  var KEYCODE = {
    esc: 27
  };
  var button = document.querySelector('.page-header__button');
  var modal = document.querySelector('.modal');
  var close = modal.querySelector('.modal__button-close');
  var form = modal.querySelector('.modal__form');
  var userName = modal.querySelector('#username');
  var userPhone = modal.querySelector('#userphone');
  var message = modal.querySelector('#userquestion');
  var isStorageSupport = true;
  var storage = {};

  var openmodal = function () {
    modal.classList.add('modal--opened');
  };

  var closemodal = function () {
    modal.classList.remove('modal--opened');
  };

  try {
    storage.name = localStorage.getItem('name');
    storage.phone = localStorage.getItem('phone');
    storage.message = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  if (button) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      openmodal();

      if (storage.name) {
        userName.value = storage.name;
        userPhone.value = storage.phone;
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
    form.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('name', userName.value);
        localStorage.setItem('phone', userPhone.value);
        localStorage.setItem('message', message.value);
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
