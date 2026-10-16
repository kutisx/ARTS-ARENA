document.addEventListener('DOMContentLoaded', function () {
  var track = document.getElementById('slajdTrack');
  var slides = track.querySelectorAll('.slajd');
  var prevBtn = document.getElementById('strelkaVlevo');
  var nextBtn = document.getElementById('strelkaVpravo');

  var currentIndex = 0;
  var totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    else if (index >= totalSlides) index = 0;

    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
  }

  prevBtn.addEventListener('click', function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    goToSlide(currentIndex + 1);
  });

  // логика кнопок навигации на этой странице
  var perehody = document.querySelectorAll('[data-href]');
  for (var i = 0; i < perehody.length; i++) {
    perehody[i].addEventListener('click', function () {
      var adres = this.getAttribute('data-href');
      if (adres && adres.charAt(0) !== '#') window.location.href = adres;
    });
  }
});