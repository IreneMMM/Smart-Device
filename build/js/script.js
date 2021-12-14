'use strict';

(function () {
  var accordionButton = document.querySelector('.page-footer__navigation-header');
  var contactsButton = document.querySelector('.page-footer__contacts-header');
  var navigation = document.querySelector('.page-footer__navigation');
  var contacts = document.querySelector('.page-footer__contacts');

  navigation.classList.add('page-footer__navigation--closed');
  contacts.classList.add('page-footer__contacts--closed');


  if (accordionButton) {
    accordionButton.addEventListener('click', function () {
      if (navigation.classList.contains('page-footer__navigation--closed')) {
        navigation.classList.remove('page-footer__navigation--closed');
        if (!contacts.classList.contains('page-footer__contacts--closed')) {
          contacts.classList.add('page-footer__contacts--closed');
        }
      } else {
        navigation.classList.add('page-footer__navigation--closed');
      }
    });
  }

  if (contactsButton) {
    contactsButton.addEventListener('click', function () {
      if (contacts.classList.contains('page-footer__contacts--closed')) {
        contacts.classList.remove('page-footer__contacts--closed');
        if (!navigation.classList.contains('page-footer__navigation--closed')) {
          navigation.classList.add('page-footer__navigation--closed');
        }
      } else {
        contacts.classList.add('page-footer__contacts--closed');
      }
    });
  }
})();

'use strict';


var phoneInputs = document.querySelectorAll('input[name="phone"]');

window.addEventListener('DOMContentLoaded', () => {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(event) {
    const matrix = '+7 (___) ___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    let val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    this.value = matrix.replace(/./g, (a) => {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      } else {
        return a;
      }
    });
    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  phoneInputs.forEach(input => {
    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
  });
});

'use strict';

(function () {
  var KEYCODE = {
    esc: 27
  };
  var page = document.querySelector('html');
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

'use strict';

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function smoothScroll() {
  var links = document.querySelectorAll('a[href^="#"]:not(a[href="#"]');
  links.forEach(function (link) {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      var id = link.getAttribute('href');
      scrollToElement(document.querySelector(id));
    });
  });
}

smoothScroll();
