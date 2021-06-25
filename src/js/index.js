import HomeController from "./controller/home.js";

// Selectors

const filterBtn = document.querySelectorAll(".btn-category");
const filterchevron = document.querySelectorAll(".fa-chevron-down");
const filterInputs = document.querySelectorAll(".filter-input");
const filterItems = document.querySelectorAll(".dropdown-item");
const badgesContainer = document.querySelector(".badges");
const badges = document.querySelectorAll(".badge");
const badgesCloseBtn = document.querySelectorAll(".fa-times-circle");

// inputs
const inputs = document.querySelectorAll("input");
const mainSearchInput = document.querySelector(".search__input");
const ingredientsInput = document.querySelector(".filter-input--ingredients");
const appliancesInput = document.querySelector(".filter-input--appliances");
const ustensilsInput = document.querySelector(".filter-input--ustensils");
const btnElements = [...filterBtn, ...filterchevron, ...filterItems];

const ingredientsFilterList = document.querySelector("#ingredient-list");
const appareilsFilterList = document.querySelector("#appareils-list");
const ustensilesFilterList = document.querySelector("#ustensiles-list");
const recipesContainer = document.querySelector(".recipes");

//initialization
const homeController = new HomeController();
homeController.showRecipes(recipesContainer, "");

//Click on filter buttons
filterInputs.forEach((filterInput) => {
  filterInput.addEventListener("click", (e) => {
    homeController.showfilter(e.target);

    filterInputs.forEach((filterInput) => {
      homeController.resetFilter(filterInput);
    });

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
  filterItems.forEach((ing) => {
    ing.addEventListener("click", (e) => {
      homeController.addBadge(e, badgesContainer);
    });
  });
});

document.addEventListener("click", (e) => {
  console.log(e.target);

  if (!e.target.matches(".filter-input")) {
    filterInputs.forEach((filterInput) => {
      homeController.resetFilter(filterInput);
    });
  }
});
// btnElements.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     //reset input
//     filterInputs.forEach((input) => {
//       homeController.resetFilter(input);
//     });
//     //show dropdown filter
//     homeController.showfilter(e.target);
//     console.log(e.target);

//     let filterName;
//     let filterItemName;

//     switch (e.target.name) {
//       case "ingredient":
//         filterName = "ingredients";
//         filterItemName = "ingredient";
//         homeController.showFilterItems(
//           ingredientsFilterList,
//           filterName,
//           filterItemName
//         );

//         break;
//       case "appliance":
//         filterName = "appliance";
//         filterItemName = "appliance";
//         homeController.showFilterItems(
//           appareilsFilterList,
//           filterName,
//           filterItemName
//         );
//         break;
//       case "ustensile":
//         filterName = "ustensils";
//         filterItemName = "ustensile";
//         homeController.showFilterItems(
//           ustensilesFilterList,
//           filterName,
//           filterItemName
//         );
//         break;
//       default:
//         break;
//     }
//   });

//   filterItems.forEach((filterItem) => {
//     filterItem.addEventListener("click", (e) => {
//       homeController.addBadge(e, badgesContainer);
//     });
//   });
// });

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const input = e.target.value;
    const inputName = e.target.getAttribute("name");

    let filterName;
    let filterItemName;

    switch (inputName) {
      case "ingredient":
        filterName = "ingredients";
        filterItemName = "ingredient";
        homeController.showFilterItems(
          ingredientsFilterList,
          filterName,
          filterItemName,
          input
        );

        break;
      case "appliance":
        filterName = "appliance";
        filterItemName = "appliance";
        homeController.showFilterItems(
          appareilsFilterList,
          filterName,
          filterItemName,
          input
        );
        break;
      case "ustensile":
        filterName = "ustensils";
        filterItemName = "ustensile";
        homeController.showFilterItems(
          ustensilesFilterList,
          filterName,
          filterItemName,
          input
        );
        break;

      default:
        break;
    }
  });
});
