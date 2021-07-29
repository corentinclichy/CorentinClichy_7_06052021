import Helpers from "../utils/helpers.js";
import { recipes } from "../../ressources/data.js";
import Search from "./search.js";

class Recipe {
  constructor(ingredients, appareils, ustensils) {
    this.recipes = recipes;
    this.ingredients = [];
    this.ustensils = [];
    this.appareils = [];
    this.helpers = new Helpers();
    this.updatedRecipes = [];
  }

  listOfFilter(filterName, filterItemName, input) {
    let filteredArray = new Set();

    /// Input empty or input is not empty
    if (this.updatedRecipes.length === 0) {
      this.recipes.map((recipe) => {
        if (Array.isArray(recipe[filterName])) {
          recipe[filterName].map((filterItem) => {
            if (filterItem[filterItemName] === undefined) {
              filteredArray.add(filterItem);
            } else {
              filteredArray.add(filterItem[filterItemName]);
            }
          });
        } else {
          filteredArray.add(recipe[filterItemName]);
        }
      });
    } else {
      this.updatedRecipes.map((recipe) => {
        if (Array.isArray(recipe[filterName])) {
          recipe[filterName].map((filterItem) => {
            if (filterItem[filterItemName] === undefined) {
              filteredArray.add(filterItem);
            } else {
              filteredArray.add(filterItem[filterItemName]);
            }
          });
        } else {
          filteredArray.add(recipe[filterItemName]);
        }
      });
    }

    if (input === undefined) {
      return filteredArray;
    } else {
      filteredArray = [...filteredArray];

      const search = new Search(input, filteredArray);
      const searchFilterItems = search.filterSearch();
      return searchFilterItems;
    }
  }

  filteredRecipes(input, badges) {
    const search = new Search(input, this.recipes, badges);
    this.updatedRecipes = search.recipesSearchWithFilter();

    return this.updatedRecipes;
  }

  showErrorMessage(container, badgeContainer, input) {
    // Select all li element of container
    let listOfSuggestions = container.querySelectorAll("li");
    console.log(listOfSuggestions);

    listOfSuggestions.forEach((item) => {
      // Add a listener to the li element
      item.addEventListener("click", (e) => {
        console.log("click");
        // Delete the badges inside the badge container
        badgeContainer.innerHTML = "";
        // Reset the array of badges
        let badges = [...badgeContainer.children];
        // Change the value of the input to the value of the li element
        input.value = e.target.innerText;
        input = input.value;
        // Reset the container
        container.innerHTML = "";
        // Show the recipes associated to the new value
        this.filteredRecipes(input, badges);
      });
    });
  }

  allrecipes() {
    let allRecipes = [...this.recipes];

    return allRecipes;
  }
}

export default Recipe;
