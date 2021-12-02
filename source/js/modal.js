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