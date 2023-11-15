//Navigation
//Scrol to sections
const scrollTo = (container) => {
  document.querySelector(container).addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.closest("a").getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    body.classList.remove("mobile__bg");
    mobileNav.style.transform = "translateX(-100%)";
  });
};
if (document.querySelector(".hero")) {
  scrollTo(".more-details");
}
//mobile Navigation
const mobileBtn = document.querySelector(".nav__btn-mmenu");
const body = document.querySelector("body");
const mobileNav = document.querySelector(".mobile");
const mobileClose = document.querySelector(".mobile__close");

const closeNavigation = () => {
  body.classList.remove("mobile__bg");
  mobileNav.style.transform = "translateX(-100%)";
};

mobileBtn.addEventListener("click", (e) => {
  body.classList.add("mobile__bg");
  mobileNav.style.transform = "translateX(0)";
});

mobileClose.addEventListener("click", (e) => {
  closeNavigation();
});

body.addEventListener("click", (e) => {
  if (e.target.classList == "mobile__bg") {
    closeNavigation();
  }
});

//chengeActive btn in categories navigation
const categoryNavigation = document.querySelectorAll(".categories__navigation-link");
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

//Swiper slider
//testimonials Swiper slider init
const testimonialsSwiper = new Swiper({
  navigation: {
    nextEl: ".testimonials__next",
    prevEl: ".testimonials__prev",
  },
  pagination: {
    el: ".testimonials__dots",
    clickable: true,
  },
});

testimonialsSwiper.init(".testimonials__slider");

//mobile restaurants Swiper init
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
initeSwiper(".restaurants-swiper");

//catalog swiper inite
initeSwiper(".catalog-swiper");
//product image swiper init
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

//recomendations swiper slider
let sw;
if (document.querySelector(".recommendations__swiper")) {
  const swInit = () => {
    sw = new Swiper({
      slidesPerView: 2,
      spaceBetween: 10,
      breakpoints: {
        300: {
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        },
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

//catalog filters
const filtersBtn = document.querySelector(".catalog__filters-btn");
const filtersClose = document.querySelector(".catalog__close-btn");
const filters = document.querySelector(".catalog__filters");

if (filtersBtn) {
  filtersBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    filters.style.transform = "translateX(0)";
  });
}

if (filtersClose) {
  filtersClose.addEventListener("click", (e) => {
    e.preventDefault();
    filters.style.transform = "translateX(-100%)";
  });
}

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
  let val = $(this).prop("value");

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
//rateYo plugin init
$(".product__rate").rateYo(rateYoOptions);
$(".review__rate").rateYo(rateYoOptions);
$(".review__form-ratepick").rateYo(rateYoOptions);
//Fanybox init
Fancybox.bind("[data-fancybox]");
if (document.querySelector(".product")) {
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

      if (
        e.target.closest(".product__tabs-headbtn").classList == "product__tabs-headbtn"
      ) {
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
}
