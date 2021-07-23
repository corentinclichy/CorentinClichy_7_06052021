import HomeController from "./controller/home.js";

// Selectors
const filterInputs = document.querySelectorAll(".filter-input");
const filterItems = document.querySelectorAll(".dropdown-item");
const badgesContainer = document.querySelector(".badges");
const inputs = document.querySelectorAll("input");
const mainSearchInput = document.querySelector(".search__input");
const ingredientsFilterList = document.querySelector("#ingredient-list");
const appareilsFilterList = document.querySelector("#appareils-list");
const ustensilesFilterList = document.querySelector("#ustensiles-list");
const recipesContainer = document.querySelector(".recipes");

//initialization
const homeController = new HomeController(
  recipesContainer,
  badgesContainer,
  mainSearchInput
);
homeController.showRecipes(recipesContainer, "");

//Click on filter buttons
filterInputs.forEach((filterInput) => {
  filterInput.addEventListener("click", (e) => {
    // Reset all filters Container
    filterInputs.forEach((filterInput) => {
      homeController.resetFilter(filterInput);
    });
    // Display the list of items inside the dropdown
    homeController.showfilter(e.target);

    //Show associated filter items list
    switch (e.target.name) {
      case "ingredient":
        homeController.showFilterItems(
          ingredientsFilterList,
          "ingredients",
          "ingredient"
        );

        break;
      case "appareil":
        homeController.showFilterItems(
          appareilsFilterList,
          "appliance",
          "appliance"
        );
        break;
      case "ustensile":
        homeController.showFilterItems(
          ustensilesFilterList,
          "ustensils",
          "ustensile"
        );
        break;
      default:
        console.log("error displaying the correct item filters");
        break;
    }
  });
  // Add specific click event to each item in the dropdown
  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      homeController.addBadge(e, badgesContainer);
    });
  });
});

// Reset filter if click outisde filter container
document.addEventListener("click", (e) => {
  if (!e.target.matches(".filter-input")) {
    filterInputs.forEach((filterInput) => {
      homeController.resetFilter(filterInput);
    });
  }
});

inputs.forEach((input) => {
  // display the list of items inside the dropdown if the user type in the input
  input.addEventListener("input", (e) => {
    switch (e.target.getAttribute("name")) {
      case "ingredient":
        homeController.showFilterItems(
          ingredientsFilterList,
          "ingredients",
          "ingredient",
          e.target.value
        );

        break;
      case "appareil":
        homeController.showFilterItems(
          appareilsFilterList,
          "appliance",
          "appliance",
          e.target.value
        );
        break;
      case "ustensile":
        homeController.showFilterItems(
          ustensilesFilterList,
          "ustensils",
          "ustensile",
          e.target.value
        );
        break;
      // If the user in the main search input, display the list of recipes
      case "mainSearchInput":
        homeController.showRecipes(recipesContainer, e.target.value);
        break;
      default:
        console.log("error displaying the filtered recipes");
        break;
    }
  });
});
