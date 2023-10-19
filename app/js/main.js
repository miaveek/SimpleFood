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

scrollTo('.nav');
scrollTo('.logo');
