//Scrol to sections
const categoryNavigation = document.querySelectorAll(
  '.categories__navigation-link'
);

const scrollTo = container => {
  document.querySelector(container).addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.closest('a').hasAttribute('href')) {
      const id = e.target.closest('a').getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
};
//chengeActive btn in categories navigation
categoryNavigation.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    categoryNavigation.forEach(item => {
      item.classList.remove('categories__navigation-link--active');
    });
    e.target.closest(
      item
        .closest('.categories__navigation-link')
        .classList.add('categories__navigation-link--active')
    );
  });
});
//mixitup init
if (document.querySelector('.categories__product-list')) {
  const mixer = mixitup('.categories__product-list');
}

//Slider
const slider = function () {
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;
  //Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activetaDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activetaDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activetaDot(0);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activetaDot(curSlide);
  };
  init();
  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.prevSlide();
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activetaDot(slide);
    }
  });
};
//Slider call
slider();
//////////////////////////////////////////////////
scrollTo('.nav');
scrollTo('.logo');
