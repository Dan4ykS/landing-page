window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.navigation'),
    openMenu = document.querySelector('.navigation__openMenu'),
    mobilMenu = document.querySelector('.mobailMenu'),
    mobailMenuItem = document.querySelectorAll('.mobailMenu__item'),
    caruselItems = document.querySelectorAll('.carusel__item'),
    caruselNav = document.querySelectorAll('.carusel__nav'),
    btn = document.querySelectorAll('.myButton'),
    overlay = document.querySelector('.overlay'),
    modalClose = document.querySelector('.modal__close'),
    navLink = document.querySelectorAll('.mobailMenu__item a'),
    callBtn = document.getElementById('callBtn'),
    buyPenBtn = document.getElementById('buyPenBtn'),
    buyPlasticBtn = document.getElementById('buyPlasticBtn');

  window.addEventListener('scroll', () => {
    if (pageYOffset >= 70) {
      menu.classList.add('navigation_active');
    } else {
      menu.classList.remove('navigation_active');
    }
  });

  openMenu.addEventListener('click', () => {
    mobilMenu.classList.toggle('mobailMenu_active');
    openMenu.classList.toggle('navigation__openMenu_active');
  });

  mobailMenuItem.forEach((elem) => {
    elem.addEventListener('click', () => {
      mobilMenu.classList.toggle('mobailMenu_active');
      openMenu.classList.toggle('navigation__openMenu_active');
    });
  });

  showSlid(+Math.floor(Math.random() * (6 - 1) + 1));

  function showSlid(number) {
    caruselItems.forEach((item) => {
      item.style.display = 'none';
    });
    caruselItems[number].style.display = 'block';
  }

  caruselNav.forEach((elem, i) => {
    elem.addEventListener('mouseenter', () => {
      showSlid(i);
    });
  });

  function scrollTo(id) {
    return document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  btn.forEach((elem, i) => {
    if (i === 1) {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        scrollTo('#buy');
      });
    } else if (i === 2) {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        scrollTo('#buy');
      });
    } else {
      elem.addEventListener('click', () => {
        overlay.style.display = 'block';
        if (i === 0) {
          callBtn.style.display = 'block';
        } else if (i === 3) {
          buyPenBtn.style.display = 'block';
        }
        const scrollWidth = +window.innerWidth - +menu.clientWidth;
        if (scrollWidth > 0) {
          document.body.style.marginRight = `${scrollWidth}px`;
        }
        document.body.style.overflow = 'hidden';
      });
    }
  });

  modalClose.addEventListener('click', () => {
    overlay.style.display = 'none';
    callBtn.style.display = 'none';
    buyPenBtn.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
  });

  navLink.forEach((elm) => {
    elm.addEventListener('click', (event) => {
      event.preventDefault();
      const id = elm.getAttribute('href');
      document.querySelector('' + id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
});
