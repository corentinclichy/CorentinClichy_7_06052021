import HomeController from "./controller/home.js";

// Selectors

const filterBtn = document.querySelectorAll(".btn-category");
const filterchevron = document.querySelectorAll(".fa-chevron-down");
const filterInputs = document.querySelectorAll(".filter-input");
const ingredients = document.querySelectorAll(".dropdown-item");
const badgesContainer = document.querySelector(".badges");
const badges = document.querySelectorAll(".badge");
const badgesCloseBtn = document.querySelectorAll(".fa-times-circle");

const btnElements = [...filterBtn, ...filterchevron, ...ingredients];

//initiate class
const homeController = new HomeController();

//Event handlers
btnElements.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterInputs.forEach((input) => {
      homeController.resetFilter(input);
    });
    homeController.showfilter(e.target);
  });
  //   btn.addEventListener("focusout", (e) => {
  //     console.log("loose focus");
  //     filterInputs.forEach((input) => {
  //       homeController.resetFilter(input);
  //     });
  //   });
});

ingredients.forEach((ing) => {
  ing.addEventListener("click", (e) => {
    homeController.addBadge(e, badgesContainer);
  });
});
