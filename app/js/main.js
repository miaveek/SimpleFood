//Scrol to sections
const categoryNavigation = document.querySelectorAll(".categories__navigation-link");

const scrollTo = (container) => {
  document.querySelector(container).addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.closest("a").hasAttribute("href")) {
      const id = e.target.closest("a").getAttribute("href");

      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
    body.classList.remove("mobile__bg");
    mobileNav.style.transform = "translateX(-100%)";
  });
};
scrollTo(".nav");

//chengeActive btn in categories navigation
categoryNavigation.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    categoryNavigation.forEach((item) => {
      item.classList.remove("categories__navigation-link--active");
    });
    e.target.closest(
      item
        .closest(".categories__navigation-link")
        .classList.add("categories__navigation-link--active")
    );
  });
});
//mixitup init
if (document.querySelector(".categories__product-list")) {
  const mixer = mixitup(".categories__product-list");
}

//Slider
const slider = function () {
  //vars
  const btnLeft = document.querySelector(".testimonials__prev");
  const btnRight = document.querySelector(".testimonials__next");
  const slides = document.querySelectorAll(".testimonials__slide");
  const slider = document.querySelector(".testimonials");
  const dotContainer = document.querySelector(".testimonials__dots");
  let curSlide = 0;
  const maxSlide = slides.length;
  //Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<li class="testimonials__dot" data-slide="${i}"></li>`
      );
    });
  };

  const activetaDot = function (slide) {
    document
      .querySelectorAll(".testimonials__dot")
      .forEach((dot) => dot.classList.remove("testimonials__dot--active"));
    document
      .querySelector(`.testimonials__dot[data-slide="${slide}"]`)
      .classList.add("testimonials__dot--active");
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
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
      // curSlide = maxSlide - 1;
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
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("testimonials__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activetaDot(slide);
    }
  });
};
//Swiper slider
let swiper;
const createSwipper = () => {
  swiper = new Swiper({
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      570: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });
  return swiper;
};
createSwipper();
const initeSwiper = (container) => {
  if (screen.width < 767) {
    swiper.init(container);
  }

  window.addEventListener("resize", () => {
    if (screen.width < 767) {
      swiper.init(container);
    } else {
      swiper.destroy(true, true);
      createSwipper();
    }
  });
};
initeSwiper(".my-swiper");
initeSwiper(".catalog-swiper");

if (document.querySelector(".product__img-swiper")) {
  swiper = new Swiper(".product__img-swiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  window.addEventListener("resize", () => {
    swiper = new Swiper(".product__img-swiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}
let sw;
if (document.querySelector(".recommendations__swiper")) {
  const swInit = () => {
    sw = new Swiper({
      slidesPerView: 2,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 15,
          pagination: false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
        900: {
          slidesPerView: 5,
          spaceBetween: 30,
          pagination: false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
      },
    });
    return sw;
  };
  swInit();
  sw.init(".recommendations__swiper");
  window.addEventListener("resize", () => {
    if (sw) {
      sw.destroy(true, true);
      swInit();
      sw.init(".recommendations__swiper");
    }
  });
}

//////////////////////////////////////////////////
if (document.querySelector(".testimonials__slider")) {
  slider();
}

const filtersBtn = document.querySelector(".catalog__filters-btn");
const filtersClose = document.querySelector(".catalog__close-btn");
const filters = document.querySelector(".catalog__filters");
let flag = false;

if (filtersBtn) {
  filtersBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    flag = !flag;
    filters.style.transform = "translateX(0)";
  });
}

if (filtersClose) {
  filtersClose.addEventListener("click", (e) => {
    e.preventDefault();
    filters.style.transform = "translateX(-100%)";
    flag = !flag;
  });
}

//////////////////////////////////////////////////

const mobileBtn = document.querySelector(".nav__btn-mmenu");
const body = document.querySelector("body");
const mobileNav = document.querySelector(".mobile");
const mobileClose = document.querySelector(".mobile__close");

mobileBtn.addEventListener("click", (e) => {
  body.classList.add("mobile__bg");
  mobileNav.style.transform = "translateX(0)";
});

mobileClose.addEventListener("click", (e) => {
  body.classList.remove("mobile__bg");
  mobileNav.style.transform = "translateX(-100%)";
});

body.addEventListener("click", (e) => {
  if (e.target.classList == "mobile__bg") {
    body.classList.remove("mobile__bg");
    mobileNav.style.transform = "translateX(-100%)";
  }
});
//Range slider
let $range = $(".catalog__price-slider"),
  $inputFrom = $(".catalog__price-from"),
  $inputTo = $(".catalog__price-to"),
  instance,
  min = 0,
  max = 1200,
  from = 0,
  to = 0;
$range.ionRangeSlider({
  skin: "round",
  type: "double",
  min: min,
  max: max,
  from: 100,
  to: 1000,
  grid: false,
  hide_min_max: true,
  hide_from_to: true,
  onStart: updateInputs,
  onChange: updateInputs,
});
instance = $range.data("ionRangeSlider");

function updateInputs(data) {
  from = data.from;
  to = data.to;

  $inputFrom.prop("value", from);
  $inputTo.prop("value", to);
}

$inputFrom.on("input", function () {
  var val = $(this).prop("value");

  // validate
  if (val < min) {
    val = min;
  } else if (val > to) {
    val = to;
  }

  instance.update({
    from: val,
  });
});

$inputTo.on("input", function () {
  var val = $(this).prop("value");

  // validate
  if (val < from) {
    val = from;
  } else if (val > max) {
    val = max;
  }

  instance.update({
    to: val,
  });
});

$(".catalog__options-list").styler();

const rateYoOptions = {
  starWidth: "16px",
  spacing: "6px",
  ratedFill: "#FFB800",
  normalFill: "#C1C1C1",
};

$(".product__rate").rateYo(rateYoOptions);
$(".review__rate").rateYo(rateYoOptions);
$(".review__form-ratepick").rateYo(rateYoOptions);

Fancybox.bind("[data-fancybox]");
//product plus minus btn events
const currValue = document.querySelector(".product__plus-minus-input");
document.querySelector(".product__plus").addEventListener("click", () => {
  currValue.value = parseInt(currValue.value) + 1;
});
document.querySelector(".product__minus").addEventListener("click", () => {
  if (currValue.value > 1) currValue.value = parseInt(currValue.value) - 1;
});
//product tabs events
const tabs = document.querySelectorAll(".product__tabs-tab");
const tabsBtns = document.querySelectorAll(".product__tabs-headbtn");
const tabsNav = document
  .querySelector(".product__tabs-head")
  .addEventListener("click", (e) => {
    const dataAttr = e.target.dataset.tab;
    console.log(e.target.dataset.tab);
    if (e.target.closest(".product__tabs-headbtn").classList == "product__tabs-headbtn") {
      tabsBtns.forEach((tab) => {
        tab.classList.remove("product__tabs-headbtn--active");
      });
      e.target.classList.add("product__tabs-headbtn--active");
      tabs.forEach((tab) => {
        tab.style.display = "none";
      });

      document.querySelector(`.${dataAttr}`).style.display = "block";
    }
  });
