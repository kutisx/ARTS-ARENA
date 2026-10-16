document.addEventListener('DOMContentLoaded', function () {

  // Все элементы с data-href при клике переходят по адресу.
  // Работает и для кнопок, и для широких блоков с картинками.
  var ssylki = document.querySelectorAll('[data-href]');
  for (var i = 0; i < ssylki.length; i++) {
    ssylki[i].addEventListener('click', function () {
      var adres = this.getAttribute('data-href');
      if (!adres) return;
      if (adres.charAt(0) === '#') {
        var cel = document.querySelector(adres);
        if (cel) cel.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = adres;
      }
    });
  }

});