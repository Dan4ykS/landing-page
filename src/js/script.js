window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.navigation'),
    openMenu = document.querySelector('.navigation__openMenu'),
    mobilMenu = document.querySelector('.mobailMenu'),
    mobailMenuItem = document.querySelectorAll('.mobailMenu__item'),
    caruselItems = document.querySelectorAll('.carusel__item'),
    caruselNav = document.querySelectorAll('.carusel__nav'),
    btn = document.querySelectorAll('.myButton'),
    overlay = document.querySelector('.overlay'),
    modalStart = document.getElementById('modalStart'),
    modalThanks = document.getElementById('modalThanks'),
    modalClose = document.querySelector('.modal__close'),
    modalCloseThanks = document.querySelector('.modal__close_Thanks'),
    navLink = document.querySelectorAll('.noLink'),
    callBtn = document.getElementById('callBtn'),
    buyPenBtn = document.getElementById('buyPenBtn'),
    buyPlasticBtn = document.getElementById('buyPlasticBtn'),
    modalForm = document.querySelector('form'),
    inputs = document.querySelectorAll('input'),
    data = {};

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
    elem.addEventListener('touchstart', () => {
      showSlid(i);
    });
  });

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
        scrollTo('#plastic');
      });
    } else {
      elem.addEventListener('click', () => {
        overlay.style.display = 'block';
        data['type'] = 'обратный звонок';
        if (i === 0) {
          callBtn.style.display = 'block';
        } else if (i === 3) {
          buyPenBtn.style.display = 'block';
          data['type'] = '3D ручку';
        } else {
          buyPlasticBtn.style.display = 'block';
          data['type'] = 'пластик';
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
    buyPlasticBtn.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
    clearInput(inputs);
    inputs.forEach((elem) => removeInputError(elem));
  });

  modalCloseThanks.addEventListener('click', () => {
    overlay.style.display = 'none';
    modalThanks.style.display = 'none';
    callBtn.style.display = 'none';
    buyPenBtn.style.display = 'none';
    buyPlasticBtn.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
    modalStart.style.display = 'block';
  });

  navLink.forEach((elm) => {
    elm.addEventListener('click', (event) => {
      event.preventDefault();
      const id = elm.getAttribute('href');
      console.log(id)
      scrollTo(id);
    });
  });

  function validate(elem) {
    const regExpDic = {
      name: /^[a-zA-Zа-яА-Я]+$/,
      email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
      phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    };
    const regExpName = elem.dataset.required;
    if (!regExpDic[regExpName]) return true;
    return regExpDic[regExpName].test(elem.value);
  }
  function inputErrorTemplate(msg) {
    return `
      <div class = "formControl_err">${msg}</div>
    `;
  }

  function showInputError(elem) {
    const parent = elem.parentElement;
    const msg = elem.dataset.invalidMessage;
    const template = inputErrorTemplate(msg);
    elem.classList.add('isInvalid');
    parent.insertAdjacentHTML('beforeend', template);
  }

  function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.formControl_err');
    if (!err) return;
    el.classList.remove('isInvalid');
    parent.removeChild(err);
  }

  function isValidForm() {
    const isValidForm = [];
    inputs.forEach((elem) => {
      isValidForm.push(validate(elem));
      if (!validate(elem)) {
        if (!elem.parentElement.querySelector('.formControl_err')) {
          showInputError(elem);
        }
      }
    });
    return isValidForm.every((elem) => elem === true);
  }

  function clearInput(inputs) {
    inputs.forEach((elem) => {
      elem.value = '';
    });
  }

  modalForm.addEventListener('submit', (elem) => {
    elem.preventDefault();
    if (isValidForm()) {
      inputs.forEach((elem) => {
        data[elem.name] = elem.value;
      });
      fetch('mailer/smart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      clearInput(inputs);
      modalStart.style.display = 'none';
      modalThanks.style.display = 'block';
    } else {
      clearInput(inputs);
    }
  });

  inputs.forEach((elem) => {
    elem.addEventListener('focus', () => {
      inputs.forEach((elem) => removeInputError(elem));
    });
  });
});