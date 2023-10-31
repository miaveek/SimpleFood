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
  //vars
  const btnLeft = document.querySelector('.testimonials__prev');
  const btnRight = document.querySelector('.testimonials__next');
  const slides = document.querySelectorAll('.testimonials__slide');
  const slider = document.querySelector('.testimonials');
  const dotContainer = document.querySelector('.testimonials__dots');
  let curSlide = 0;
  const maxSlide = slides.length;
  //Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<li class="testimonials__dot" data-slide="${i}"></li>`
      );
    });
  };

  const activetaDot = function (slide) {
    document
      .querySelectorAll('.testimonials__dot')
      .forEach(dot => dot.classList.remove('testimonials__dot--active'));
    document
      .querySelector(`.testimonials__dot[data-slide="${slide}"]`)
      .classList.add('testimonials__dot--active');
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
      prevSlide();
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('testimonials__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activetaDot(slide);
    }
  });
};

//swiper js
var swiper = new Swiper('.mySwiper', {
  pagination: {
    el: '.swiper-pagination',
  },
});

//////////////////////////////////////////////////
if (document.querySelector('.testimonials__slider')) {
  slider();
}
if (document.querySelector('.nav')) {
  scrollTo('.nav');
}
if (document.querySelector('.log')) {
  scrollTo('.logo');
}
//////////////////////////////////////////////////
