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
