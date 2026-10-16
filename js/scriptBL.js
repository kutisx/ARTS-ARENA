document.addEventListener('DOMContentLoaded', function () {

  var ceny = { standart: 2000, premium: 3500, master: 5000 };
  var nazvaniyaUrovnej = { standart: 'СТАНДАРТ', premium: 'ПРЕМИУМ', master: 'МАСТЕР' };

  var vybrannyjUroven = 'master';
  var kolichestvo = 1;
  var vybrannyeDni = [];

  var knopkiUrovnya = document.querySelectorAll('.uroven-knopka');
  var kolChislo = document.querySelector('.kol-chislo');
  var kolMinus = document.querySelector('.kol-minus');
  var kolPlus = document.querySelector('.kol-plus');
  var pochtaPole = document.querySelector('.pochta-pole');
  var cenaTekst = document.getElementById('cenaTekst');
  var oplatitKnopka = document.querySelector('.oplatit-knopka');

  var kalendarMesyac = document.getElementById('kalendarMesyac');
  var kalendarDni = document.getElementById('kalendarDni');
  var kalendarNazad = document.getElementById('kalendarNazad');
  var kalendarVpered = document.getElementById('kalendarVpered');

  var modalOverlay = document.getElementById('modalOverlay');
  var modalPochta = document.getElementById('modalPochta');
  var modalUroven = document.getElementById('modalUroven');
  var modalKol = document.getElementById('modalKol');
  var modalDni = document.getElementById('modalDni');
  var modalCena = document.getElementById('modalCena');
  var modalZakryt = document.getElementById('modalZakryt');

  var mesyacy = ['Январь','Февраль','Март','Апрель','Май','Июнь',
                 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  var tekushijGod = 2025;
  var tekushijMesyac = 7;

  function pereschitat() {
    var baza = ceny[vybrannyjUroven];
    var nacek = 1 + vybrannyeDni.length * 0.1;
    var itog = Math.round(baza * nacek) * kolichestvo;
    cenaTekst.textContent = itog;
  }

  for (var i = 0; i < knopkiUrovnya.length; i++) {
    knopkiUrovnya[i].addEventListener('click', function () {
      for (var j = 0; j < knopkiUrovnya.length; j++) {
        knopkiUrovnya[j].classList.remove('vybran');
      }
      this.classList.add('vybran');
      vybrannyjUroven = this.getAttribute('data-uroven');
      pereschitat();
    });
  }

  kolMinus.addEventListener('click', function () {
    if (kolichestvo > 1) {
      kolichestvo = kolichestvo - 1;
      kolChislo.textContent = kolichestvo;
      pereschitat();
    }
  });

  kolPlus.addEventListener('click', function () {
    kolichestvo = kolichestvo + 1;
    kolChislo.textContent = kolichestvo;
    pereschitat();
  });

  function narisovatKalendar() {
    kalendarMesyac.textContent = mesyacy[tekushijMesyac] + ' ' + tekushijGod;
    kalendarDni.innerHTML = '';

    var vsegoDnej = new Date(tekushijGod, tekushijMesyac + 1, 0).getDate();
    var pervyjDen = new Date(tekushijGod, tekushijMesyac, 1).getDay();
    // в JS неделя начинается с воскресенья, а нам надо с понедельника
    var sdvig = (pervyjDen + 6) % 7;

    for (var p = 0; p < sdvig; p++) {
      var pusto = document.createElement('div');
      pusto.className = 'kalendar-den pustoj';
      kalendarDni.appendChild(pusto);
    }

    for (var d = 1; d <= vsegoDnej; d++) {
      var den = document.createElement('div');
      den.className = 'kalendar-den';
      den.textContent = d;

      var kluch = tekushijGod + '-' + (tekushijMesyac + 1) + '-' + d;
      den.setAttribute('data-den', kluch);

      if (vybrannyeDni.indexOf(kluch) !== -1) {
        den.classList.add('vybran');
      }

      den.addEventListener('click', function () {
        var k = this.getAttribute('data-den');
        var idx = vybrannyeDni.indexOf(k);
        if (idx === -1) {
          vybrannyeDni.push(k);
          this.classList.add('vybran');
        } else {
          vybrannyeDni.splice(idx, 1);
          this.classList.remove('vybran');
        }
        pereschitat();
      });

      kalendarDni.appendChild(den);
    }
  }

  kalendarNazad.addEventListener('click', function () {
    tekushijMesyac = tekushijMesyac - 1;
    if (tekushijMesyac < 0) { tekushijMesyac = 11; tekushijGod = tekushijGod - 1; }
    narisovatKalendar();
  });

  kalendarVpered.addEventListener('click', function () {
    tekushijMesyac = tekushijMesyac + 1;
    if (tekushijMesyac > 11) { tekushijMesyac = 0; tekushijGod = tekushijGod + 1; }
    narisovatKalendar();
  });

  function proveritPochtu(znachenie) {
    var shablon = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return shablon.test(znachenie);
  }

  oplatitKnopka.addEventListener('click', function () {
    var pochta = pochtaPole.value;

    if (!proveritPochtu(pochta)) {
      alert('Пожалуйста, введите правильный e-mail (например: name@mail.ru)');
      return;
    }

    if (vybrannyeDni.length === 0) {
      alert('Пожалуйста, выберите хотя бы одну дату в календаре.');
      return;
    }

    modalPochta.textContent = pochta;
    modalUroven.textContent = nazvaniyaUrovnej[vybrannyjUroven];
    modalKol.textContent = kolichestvo;
    modalDni.textContent = vybrannyeDni.join(', ');
    modalCena.textContent = cenaTekst.textContent;

    modalOverlay.classList.add('pokazat');
  });

  modalZakryt.addEventListener('click', function () {
    modalOverlay.classList.remove('pokazat');
  });

  narisovatKalendar();
  pereschitat();

});