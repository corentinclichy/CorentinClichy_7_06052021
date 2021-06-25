import HomeController from "./controller/home.js";

// Selectors

const filterBtn = document.querySelectorAll(".btn-category");
const filterchevron = document.querySelectorAll(".fa-chevron-down");
const filterInputs = document.querySelectorAll(".filter-input");
const inputs = document.querySelectorAll("input");
const ingredients = document.querySelectorAll(".dropdown-item");
const badgesContainer = document.querySelector(".badges");
const badges = document.querySelectorAll(".badge");
const badgesCloseBtn = document.querySelectorAll(".fa-times-circle");

const btnElements = [...filterBtn, ...filterchevron, ...ingredients];

const ingredientsFilterList = document.querySelector("#ingredient-list");
const appareilsFilterList = document.querySelector("#appareils-list");
const ustensilesFilterList = document.querySelector("#ustensiles-list");
const recipesContainer = document.querySelector(".recipes");

//initialization
const homeController = new HomeController();
homeController.showRecipes(recipesContainer, "");

//Event handlers
btnElements.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //reset input
    filterInputs.forEach((input) => {
      homeController.resetFilter(input);
    });
    //show dropdown filter
    homeController.showfilter(e.target);

    let filterName;
    let filterItemName;

    switch (e.target.name) {
      case "ingredient":
        filterName = "ingredients";
        filterItemName = "ingredient";
        homeController.showFilterItems(
          ingredientsFilterList,
          filterName,
          filterItemName
        );

        break;
      case "appliance":
        filterName = "appliance";
        filterItemName = "appliance";
        homeController.showFilterItems(
          appareilsFilterList,
          filterName,
          filterItemName
        );
        break;
      case "ustensile":
        filterName = "ustensils";
        filterItemName = "ustensile";
        homeController.showFilterItems(
          ustensilesFilterList,
          filterName,
          filterItemName
        );
        break;
      default:
        break;
    }
  });

  ingredients.forEach((ing) => {
    ing.addEventListener("click", (e) => {
      homeController.addBadge(e, badgesContainer);
    });
  });
});

console.log(inputs);

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const input = e.target.value;

    homeController._getInput(input);
  });
});
