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
