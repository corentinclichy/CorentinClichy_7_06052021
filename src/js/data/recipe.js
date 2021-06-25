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
  }

  listOfFilter(filterName, filterItemName) {
    let filteredArray = new Set();

    console.log(this.recipes);

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
    return filteredArray;
  }

  listOfRecipes(input) {
    let filteredRecipes = [];
    if (input === "") {
      filteredRecipes = [...this.recipes];
    }

    return filteredRecipes;
  }
}

export default Recipe;
