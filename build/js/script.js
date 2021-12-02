'use strict';

(function () {
    [].forEach.call(document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

}) ();

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
        // document.body.classList.add('disable-scroll');
    };

    var closemodal = function () {
        modal.classList.remove('modal--opened');
        // document.body.classList.remove('disable-scroll');
    };

    try {
        storage.name = localStorage.getItem('name');
        storage.phone = localStorage.getItem('phone');
        storage.message = localStorage.getItem('message');
    } catch (err) {
        isStorageSupport = false;
    }

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

    close.addEventListener('click', function (evt) {
        evt.preventDefault();
        closemodal();
    });

    form.addEventListener('submit', function () {
        if (isStorageSupport) {
            localStorage.setItem('name', userName.value);
            localStorage.setItem('phone', userPhone.value);
            localStorage.setItem('message', message.value);
        }
    });

    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEYCODE.esc) {
            evt.preventDefault();
            if (modal.classList.contains('modal--opened')) {
                closemodal();
            }
        }
    });

    modal.addEventListener('click', function (evt) {
        if (evt.target === modal) {
            closemodal();
        }
    });

    // скролл

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // аккордеон 

    var accordionButton = document.querySelector('site-navigation__toggle');
    var contactsButton = document.querySelector('contacts__toggle');
    var navigation = document.querySelector('page-footer__navigation');
    var contacts = document.querySelector('page-footer__contacts');

    navigation.classList.add('page-footer__nav--closed');
    contacts.classList.add('page-footer__contacts--closed');

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

    contactsButton.addEventListener('click', function () {
        if (contacts.classList.contains('page-footer__contacts--closed')) {
            contacts.classList.remove('page-footer__contacts--closed');
            if (!navigation.classList.contains('page-footer__navigation-closed')) {
                navigation.classList.add('page-footer__navigation--closed');
            }
        } else {
            contacts.classList.add('page-footer__contacts--closed');
        }
    });



}) ();