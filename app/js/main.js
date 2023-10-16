//Scrol to sections
const scrollTo = (container) => {
  document.querySelector(container).addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.closest("a").hasAttribute("href")) {
      const id = e.target.closest("a").getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};
scrollTo(".nav");
scrollTo(".logo");
